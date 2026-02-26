"use client";

import { useEffect, useState } from "react";
import { fetchDrivers } from "@/Services/api";

// 1. DEFINE THE TYPE (Fixes the "Unexpected any" error)
interface Driver {
  id: number;
  lat: number;
  lng: number;
  status: string;
  vehicle: string;
}

export default function StatsPanel() {
  const [metrics, setMetrics] = useState({
    totalDrivers: 0,
    activeDrivers: 0,
    latency: 12, 
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const start = Date.now();
      
      // 2. CAST THE DATA (Tell TS this is a list of Drivers)
      const drivers: Driver[] = await fetchDrivers();
      
      const end = Date.now();

      setMetrics({
        totalDrivers: drivers.length,
        // 3. NO MORE ERROR (TS now knows 'd' is a Driver)
        activeDrivers: drivers.filter((d) => d.status === "BUSY").length,
        latency: end - start, 
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
<div className="absolute bottom-4 left-4 z-[1000] flex flex-col gap-3">
      {/* CARD 1: FLEET STATUS */}
      <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border-l-4 border-blue-500 shadow-2xl w-64">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Fleet Status</h3>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-3xl font-mono text-white font-bold">{metrics.totalDrivers}</span>
          <span className="text-sm text-gray-400 mb-1">Agents Online</span>
        </div>
      </div>

      {/* CARD 2: REAL-TIME LATENCY */}
      <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border-l-4 border-green-500 shadow-2xl w-64">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">System Latency</h3>
        <div className="flex items-end gap-2 mt-1">
          <span className={`text-3xl font-mono font-bold ${metrics.latency > 100 ? "text-red-500" : "text-green-400"}`}>
            {metrics.latency}ms
          </span>
          <span className="text-sm text-gray-400 mb-1">Response Time</span>
        </div>
      </div>
      
    </div>
  );
}