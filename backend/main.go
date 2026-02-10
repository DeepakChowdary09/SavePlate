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

// Log represents an AI decision event
type AILog struct {
	ID        int    `json:"id"`
	Timestamp string `json:"timestamp"`
	Agent     string `json:"agent"`
	Color     string `json:"color"`
	Message   string `json:"message"`
	Reasoning string `json:"reasoning,omitempty"`
}

// --- 2. IN-MEMORY STATE (Simulating a Database for Speed) ---
var (
	drivers  = make(map[int]*Driver)
	orders   = make([]Order, 0)
	logs     = make([]AILog, 0)
	mutex    = &sync.RWMutex{} // Protects map from concurrent writes
)

func main() {
	// Initialize the "Ghost Fleet"
	initSimulation()

	// Start the background simulation loop (The "Game Engine")
	go startSimulationLoop()

	// --- 3. API SERVER SETUP ---
	r := gin.Default()

	// Enable CORS (Allow Frontend to connect)
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Allow all for MVE demo
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Group routes under /api
	api := r.Group("/api")
	{
		// Endpoint 1: Get all drivers (For the Map)
		api.GET("/drivers", func(c *gin.Context) {
			mutex.RLock()
			defer mutex.RUnlock()
			
			// Convert map to list
			driverList := make([]*Driver, 0, len(drivers))
			for _, d := range drivers {
				driverList = append(driverList, d)
			}
			c.JSON(http.StatusOK, driverList)
		})

		// Endpoint 2: Receive an Order (From Donor Dashboard)
		api.POST("/orders", func(c *gin.Context) {
			var newOrder Order
			if err := c.BindJSON(&newOrder); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			
			// Simulate "Processing"
			newOrder.ID = fmt.Sprintf("ORD-%d", rand.Intn(10000))
			newOrder.Status = "PENDING"
			
			mutex.Lock()
			orders = append(orders, newOrder)
			// Add a fake log to show activity
			logs = append([]AILog{{
				ID:        rand.Intn(100000),
				Timestamp: time.Now().Format("15:04:05"),
				Agent:     "INGEST",
				Color:     "text-blue-400",
				Message:   fmt.Sprintf("New Order Recieved: %s (%s)", newOrder.FoodName, newOrder.Quantity),
			}}, logs...)
			mutex.Unlock()

			c.JSON(http.StatusOK, newOrder)
		})

		// Endpoint 3: Get AI Logs (For NGO Dashboard)
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
	// Bangalore Center Coordinates: 12.9716, 77.5946
	mutex.Lock()
	defer mutex.Unlock()

	for i := 1; i <= 50; i++ {
		// FORCE 50/50 SPLIT
		// If ID is Even -> Van (Truck)
		// If ID is Odd  -> Bike
		vehicleType := "Bike"
		if i%2 == 0 {
			vehicleType = "Van"
		}

		drivers[i] = &Driver{
			ID:      i,
			// Random scatter around Bangalore (+/- 0.05 degrees)
			Lat:     12.9716 + (rand.Float64()-0.5)*0.1,
			Lng:     77.5946 + (rand.Float64()-0.5)*0.1,
			Status:  "AVAILABLE",
			Vehicle: vehicleType, // Use our forced type
		}
	}
	fmt.Println("✅ 50 Ghost Drivers Initialized (25 Bikes / 25 Vans).")
}

func startSimulationLoop() {
	// Updates every 1 second (High Frequency)
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		mutex.Lock()
		for _, d := range drivers {
			// Simulate random driving movement
			// 0.001 degrees is roughly 100 meters per second (Fast!)
			d.Lat += (rand.Float64() - 0.5) * 0.001
			d.Lng += (rand.Float64() - 0.5) * 0.001
		}
		mutex.Unlock()
	}
}