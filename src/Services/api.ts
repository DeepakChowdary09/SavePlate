// src/services/api.ts

const API_URL = "http://localhost:8080/api";

// 1. WATCHER: Gets the live location of 50 Ghost Drivers
export async function fetchDrivers() {
  try {
    const res = await fetch(`${API_URL}/drivers`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Driver Fetch Error:", error);
    return []; 
  }
}

// 2. AUDITOR: Gets the reasoning logs (Renamed to match ControlPanel)
export async function fetchLogs() {
  try {
    const res = await fetch(`${API_URL}/logs`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Log Fetch Error:", error);
    return [];
  }
}

// 3. INJECTOR: Sends a simulated order
// I've updated this to handle both manual inputs AND the "Mock Button"
export async function createOrder(foodName: string = "Surplus Rice", quantity: string = "5kg") {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ food_name: foodName, quantity: quantity }),
    });
    return await res.json();
  } catch (error) {
    console.error("Order Error:", error);
  }
}