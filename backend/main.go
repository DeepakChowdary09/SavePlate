package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// --- 1. DATA STRUCTURES ---

// Driver represents a single agent in our simulation
type Driver struct {
	ID      int     `json:"id"`
	Lat     float64 `json:"lat"`
	Lng     float64 `json:"lng"`
	Status  string  `json:"status"`  // "AVAILABLE", "BUSY"
	Vehicle string  `json:"vehicle"` // "Bike", "Scooter", "Van"
}

// Order represents a job injected by the Donor Dashboard
type Order struct {
	ID       string `json:"id"`
	FoodName string `json:"food_name"`
	Quantity string `json:"quantity"`
	Status   string `json:"status"`
}

// AILog represents an AI decision event
type AILog struct {
	ID        int    `json:"id"`
	Timestamp string `json:"timestamp"`
	Agent     string `json:"agent"`
	Color     string `json:"color"`
	Message   string `json:"message"`
}

// --- 2. IN-MEMORY STATE ---
var (
	drivers = make(map[int]*Driver)
	orders  = make([]Order, 0)
	logs    = make([]AILog, 0)
	mutex   = &sync.RWMutex{} // Protects map from concurrent writes
)

func main() {
	// Initialize the "Ghost Fleet"
	initSimulation()

	// Start the background simulation loop
	go startSimulationLoop()

	// --- 3. API SERVER SETUP ---
	r := gin.Default()

	// Enable CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Group routes under /api
	api := r.Group("/api")
	{
		// Endpoint 1: Get all drivers
		api.GET("/drivers", func(c *gin.Context) {
			mutex.RLock()
			defer mutex.RUnlock()
			
			// Convert map to list for Frontend
			driverList := make([]*Driver, 0, len(drivers))
			for _, d := range drivers {
				driverList = append(driverList, d)
			}
			c.JSON(http.StatusOK, driverList)
		})

		// Endpoint 2: Receive an Order (SMART DISPATCH LOGIC HERE)
		api.POST("/orders", func(c *gin.Context) {
			var newOrder Order
			if err := c.BindJSON(&newOrder); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			
			newOrder.ID = fmt.Sprintf("ORD-%d", rand.Intn(10000))
			newOrder.Status = "PENDING"
			
			mutex.Lock() // LOCK STATE
			
			// --- THE "BRAIN" LOGIC STARTS HERE ---
			
			// 1. Find the first AVAILABLE driver
			var assignedDriver *Driver
			for _, driver := range drivers {
				if driver.Status == "AVAILABLE" {
					assignedDriver = driver
					break // Found one! Stop looking.
				}
			}

			if assignedDriver != nil {
				// 2. Assign the Order (Turn them RED)
				assignedDriver.Status = "BUSY"
				
				// 3. Create a Success Log
				newLog := AILog{
					ID:        rand.Intn(100000),
					Timestamp: time.Now().Format("15:04:05"),
					Agent:     fmt.Sprintf("DISPATCH (Driver %d)", assignedDriver.ID),
					Color:     "green",
					Message:   fmt.Sprintf("Assigned to Order: %s (%s)", newOrder.FoodName, newOrder.Quantity),
				}
				// Prepend log (add to top)
				logs = append([]AILog{newLog}, logs...)

				// 4. Auto-complete order after 10 seconds (Turn back to GREEN)
				go func(d *Driver) {
					time.Sleep(10 * time.Second)
					mutex.Lock()
					d.Status = "AVAILABLE"
					mutex.Unlock()
				}(assignedDriver)

			} else {
				// No drivers available!
				newLog := AILog{
					ID:        rand.Intn(100000),
					Timestamp: time.Now().Format("15:04:05"),
					Agent:     "SYSTEM_ERROR",
					Color:     "red",
					Message:   "Fleet Saturation: No Drivers Available!",
				}
				logs = append([]AILog{newLog}, logs...)
			}
			
			// --- THE "BRAIN" LOGIC ENDS HERE ---

			orders = append(orders, newOrder)
			mutex.Unlock() // UNLOCK STATE

			c.JSON(http.StatusOK, newOrder)
		})

		// Endpoint 3: Get AI Logs
		api.GET("/logs", func(c *gin.Context) {
			mutex.RLock()
			defer mutex.RUnlock()
			// Return last 20 logs
			if len(logs) > 20 {
				c.JSON(http.StatusOK, logs[:20])
			} else {
				c.JSON(http.StatusOK, logs)
			}
		})
	}

	fmt.Println("🚀 SavePlate Dispatch Engine: ONLINE on :8080")
	r.Run(":8080")
}

// --- 4. SIMULATION LOGIC ---

func initSimulation() {
	mutex.Lock()
	defer mutex.Unlock()

	// ✅ WE KEPT THIS AT 10 DRIVERS FOR TESTING
	for i := 1; i <= 5; i++ {
		vehicleType := "Bike"
		if i%2 == 0 {
			vehicleType = "Van"
		}

		drivers[i] = &Driver{
			ID:      i,
			Lat:     12.9716 + (rand.Float64()-0.5)*0.1,
			Lng:     77.5946 + (rand.Float64()-0.5)*0.1,
			Status:  "AVAILABLE",
			Vehicle: vehicleType, 
		}
	}
	fmt.Println("✅ 10 Ghost Drivers Initialized for Testing.")
}

func startSimulationLoop() {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		mutex.Lock()
		for _, d := range drivers {
			// Simulate driving
			d.Lat += (rand.Float64() - 0.5) * 0.001
			d.Lng += (rand.Float64() - 0.5) * 0.001
		}
		mutex.Unlock()
	}
}