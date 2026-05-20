"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { fetchDrivers } from "@/Services/api";

// --- 1. LOCAL ASSETS (The "Pro" Way) ---
// Note: We use paths starting with "/" which points to the 'public' fo

const bikeIcon = L.icon({
  iconUrl: " /icons/bike.jpg  ", // <--- LOOKS IN YOUR PUBLIC FOLDER
  iconSize: [45, 45],          // Bigger size for realistic detail
  iconAnchor: [22, 45],        // Center bottom of the image
  popupAnchor: [0, -45],
  className: "drop-shadow-lg"  // Adds a 3D shadow effect via Tailwind
});

const vanIcon = L.icon({
  iconUrl: " /icons/van.jpg ",
  iconSize: [55, 55],          // Trucks are slightly larger
  iconAnchor: [27, 55],
  popupAnchor: [0, -55],
  className: "drop-shadow-lg"
});

// 🔴 Using a clean UI dot for "Busy" status to avoid clutter
const busyIcon = L.divIcon({
  className: "bg-transparent",
  html: `<div class="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`
});

interface Driver {
  id: number;
  lat: number;
  lng: number;
  status: string;
  vehicle: string;
}

export default function Map() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchDrivers();
        setDrivers(data);
      } catch (err) {
        console.error("Backend offline?");
      }
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  const getIcon = (driver: Driver) => {
    if (driver.status === "BUSY") return busyIcon;
    if (driver.vehicle === "Van") return vanIcon;
    return bikeIcon; 
  };

  return (
    <MapContainer
      center={[12.9716, 77.5946]} 
      zoom={14} // Zoomed in slightly to show off the icons
      className="w-full h-full z-0"
      style={{ background: "#1a1a1a" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {drivers.map((driver) => (
        <Marker 
          key={driver.id} 
          position={[driver.lat, driver.lng]} 
          icon={getIcon(driver)}
        >
          <Popup className="font-sans text-sm font-semibold">
            Driver #{driver.id} <br/>
            <span className="text-gray-500 text-xs">{driver.vehicle}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}