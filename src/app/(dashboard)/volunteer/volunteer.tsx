"use client";

import dynamic from "next/dynamic";
import { MapPin, Navigation, Clock } from "lucide-react";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const STATUS = {
  ACTIVE: "ACTIVE",
  IDLE: "IDLE",
} as const;

export default function VolunteerDashboard() {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Panel */}
      <aside className="w-full md:w-96 bg-zinc-900/50 border-r border-zinc-800 p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Duty Roster</h1>
          <p className="text-zinc-500 text-sm">
            You are online and visible to donors.
          </p>
        </div>

        {/* Active Task */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded">
              {STATUS.ACTIVE}
            </span>
            <span className="text-emerald-400 text-xs font-mono">
              #ORD-2921
            </span>
          </div>

          <h3 className="font-bold text-lg">Pickup at Starbucks</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Indiranagar, 12th Main
          </p>

          <div className="flex gap-2">
            <button
              aria-label="Navigate to pickup"
              className="flex-1 bg-emerald-500 text-black font-bold py-2 rounded-lg text-sm hover:bg-emerald-400 transition"
            >
              Navigate
            </button>
            <button
              aria-label="Delay pickup"
              className="px-3 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white"
            >
              <Clock size={18} />
            </button>
          </div>
        </div>

        {/* Nearby Requests */}
        <div>
          <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4">
            Nearby Requests
          </h4>
          <div className="space-y-3">
            <RequestItem
              distance="2.1 km"
              location="Pizza Hut, MG Road"
              time="5 mins ago"
            />
            <RequestItem
              distance="4.5 km"
              location="Fresh Mart, Koramangala"
              time="12 mins ago"
            />
          </div>
        </div>
      </aside>

      {/* Map */}
      <section className="flex-1 relative">
        <Map />
        <div className="absolute top-6 right-6 z-[1000] bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-zinc-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold">GPS SIGNAL: STRONG</span>
        </div>
      </section>
    </div>
  );
}

function RequestItem({
  distance,
  location,
  time,
}: {
  distance: string;
  location: string;
  time: string;
}) {
  return (
    <div className="p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition cursor-pointer flex justify-between items-center group">
      <div>
        <div className="font-medium text-zinc-300 group-hover:text-white">
          {location}
        </div>
        <div className="text-xs text-zinc-500 flex items-center gap-1">
          <Navigation size={10} /> {distance} • {time}
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:bg-emerald-500 group-hover:text-black transition">
        <MapPin size={14} />
      </div>
    </div>
  );
}
