// 1. The Order Payload (Sent to Go)
export interface Plate {
  id?: string;
  foodName: string;
  quantity: string;
  status?: "PENDING" | "ASSIGNED" | "DELIVERED";
  donorId?: string;
}

// 2. The Ghost Driver (Received from Go)
export interface Driver {
  id: number;
  lat: number;
  lng: number;
  status: string;
  vehicle: string; // "Bike", "Scooter"
}

// 3. The AI Decision Log (Received from Python/Go)
export interface AILog {
  id: number;
  timestamp: string;
  agent: string;
  color: string;
  message: string;
  reasoning?: string;
}