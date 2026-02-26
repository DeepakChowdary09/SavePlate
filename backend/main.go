package main

import (
	"fmt"
	"os"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Initialize Simulation
	initSimulation()
	go startSimulationLoop()

	// 2. Setup Server
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// 3. Define Routes
	api := r.Group("/api")
	{
		api.GET("/drivers", getDrivers)
		api.GET("/logs", getLogs)
		api.POST("/orders", createOrder)
	}
port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Fallback for local testing
	}
	fmt.Println("🚀 SavePlate Backend is Running cleanly on :" + port)
	r.Run(":" + port)
}