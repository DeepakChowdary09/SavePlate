// This points to your Go Backend running in Docker/Localhost
const API_URL = "http://localhost:8080/api";

// 1. INJECTOR: Sends a simulated order to the Go Engine
export async function createOrder(foodName: string, quantity: string) {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ food_name: foodName, quantity: quantity }),
    });
    return await res.json();
  } catch (error) {
    console.error("Backend Disconnected");
    throw error;
  }
}

// 2. WATCHER: Gets the live location of 50 Ghost Drivers
export async function fetchDrivers() {
  try {
    const res = await fetch(`${API_URL}/drivers`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    return []; // Return empty if backend is offline
  }
}

// 3. AUDITOR: Gets the reasoning logs from the AI Agent
export async function fetchAILogs() {
  try {
    // In a real scenario, this endpoint exists. 
    // For MVE, we might simulate this in the frontend if the Python service isn't ready.
    const res = await fetch(`${API_URL}/logs`, { cache: 'no-store' });
    return await res.json();
  } catch (error) {
    return [];
  }
}