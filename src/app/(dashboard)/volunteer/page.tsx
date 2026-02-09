"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { fetchDrivers } from "@/Services/api";
import { Activity, Globe } from "lucide-react";

// Lazy load map (Client side only)
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function VolunteerDashboard() {
  const [driverCount, setDriverCount] = useState(0);

  // Poll for stats every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchDrivers();
      setDriverCount(data.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-zinc-950">
      {/* HUD Header */}
      <div className="h-16 border-b border-zinc-800 bg-black/50 flex items-center px-8 justify-between backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <Globe className="text-emerald-500" />
          <h1 className="font-bold tracking-tight text-white">Global Fleet Monitor</h1>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-zinc-500 uppercase font-bold">Active Agents</span>
             <span className="font-mono text-emerald-400 font-bold text-xl">{driverCount}</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-zinc-500 uppercase font-bold">Latency</span>
             <span className="font-mono text-emerald-400 font-bold text-xl">12ms</span>
          </div>
        </div>
      </div>

      {/* The Map */}
      <div className="flex-1 relative z-0">
        <Map />
        
        {/* Overlay Card */}
        <div className="absolute bottom-8 left-8 bg-black/90 backdrop-blur border border-zinc-800 p-5 rounded-2xl z-[500] max-w-sm shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
             <Activity size={16} className="text-emerald-500" />
             <h4 className="text-xs font-bold text-zinc-400 uppercase">Simulation Status</h4>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Ghost Fleet operating autonomously. Agents are polling PostGIS for nearest orders.
          </p>
        </div>
      </div>
    </div>
  );
}