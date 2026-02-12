package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// GET /api/drivers
func getDrivers(c *gin.Context) {
	mutex.RLock()
	defer mutex.RUnlock()

	list := make([]*Driver, 0, len(drivers))
	for _, d := range drivers {
		list = append(list, d)
	}
	c.JSON(http.StatusOK, list)
}

// GET /api/logs
func getLogs(c *gin.Context) {
	mutex.RLock()
	defer mutex.RUnlock()

	if len(logs) > 20 {
		c.JSON(http.StatusOK, logs[:20])
	} else {
		c.JSON(http.StatusOK, logs)
	}
}

// POST /api/orders
func createOrder(c *gin.Context) {
	var newOrder Order
	if err := c.BindJSON(&newOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newOrder.ID = fmt.Sprintf("ORD-%d", rand.Intn(10000))
	newOrder.Status = "PENDING"

	mutex.Lock()
	defer mutex.Unlock()

	// 1. Find the first AVAILABLE driver
	var assignedDriver *Driver
	for _, driver := range drivers {
		if driver.Status == "AVAILABLE" {
			assignedDriver = driver
			break
		}
	}

	if assignedDriver != nil {
		assignedDriver.Status = "BUSY"

		// Success Log
		newLog := AILog{
			ID:        rand.Intn(100000),
			Timestamp: time.Now().Format("15:04:05"),
			Agent:     fmt.Sprintf("DISPATCH (Driver %d)", assignedDriver.ID),
			Color:     "green",
			Message:   fmt.Sprintf("Assigned to Order: %s (%s)", newOrder.FoodName, newOrder.Quantity),
		}
		logs = append([]AILog{newLog}, logs...)

		// Auto-complete after 10s
		go func(d *Driver) {
			time.Sleep(10 * time.Second)
			mutex.Lock()
			d.Status = "AVAILABLE"
			mutex.Unlock()
		}(assignedDriver)

	} else {
		// Fail Log
		newLog := AILog{
			ID:        rand.Intn(100000),
			Timestamp: time.Now().Format("15:04:05"),
			Agent:     "SYSTEM_ERROR",
			Color:     "red",
			Message:   "Fleet Saturation: No Drivers Available!",
		}
		logs = append([]AILog{newLog}, logs...)
	}

	orders = append(orders, newOrder)
	c.JSON(http.StatusOK, newOrder)
}