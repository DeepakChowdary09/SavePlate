package main

import (
	"fmt"
	"math/rand"
	"time"
)

func initSimulation() {
	mutex.Lock()
	defer mutex.Unlock()

	// 5 DRIVERS (3 Bikes, 2 Vans)
	for i := 1; i <= 20; i++ {
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
	fmt.Println("✅ Simulation Engine Started: 5 Drivers Active.")
}

func startSimulationLoop() {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		mutex.Lock()
		for _, d := range drivers {
			// Simulate random driving movement
			d.Lat += (rand.Float64() - 0.5) * 0.001
			d.Lng += (rand.Float64() - 0.5) * 0.001
		}
		mutex.Unlock()
	}
}