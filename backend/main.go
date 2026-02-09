package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("🚀 SavePlate Backend is Online on Port 8080")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "SavePlate Dispatch Engine: ONLINE")
	})
	http.ListenAndServe(":8080", nil)
}
