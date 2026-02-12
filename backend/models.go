package main

import "sync"

// --- DATA STRUCTURES ---

type Driver struct {
	ID      int     `json:"id"`
	Lat     float64 `json:"lat"`
	Lng     float64 `json:"lng"`
	Status  string  `json:"status"`  // "AVAILABLE", "BUSY"
	Vehicle string  `json:"vehicle"` // "Bike", "Van"
}

type Order struct {
	ID       string `json:"id"`
	FoodName string `json:"food_name"`
	Quantity string `json:"quantity"`
	Status   string `json:"status"`
}

type AILog struct {
	ID        int    `json:"id"`
	Timestamp string `json:"timestamp"`
	Agent     string `json:"agent"`
	Color     string `json:"color"`
	Message   string `json:"message"`
}

// --- SHARED MEMORY (Database Replacement) ---
var (
	drivers = make(map[int]*Driver)
	orders  = make([]Order, 0)
	logs    = make([]AILog, 0)
	mutex   = &sync.RWMutex{} // Protects map from crashes
)