"use client";

import { useState } from "react";
import { Plate } from "@/types/plate";
import { getPlates, acceptPlate } from "@/Services/plate.service";


const VOLUNTEER_ID ="volunteer-001";

export default function Volunteerdashboard(){
  const[plates, setPlates] = useState<Plate[]>(getPlates());


  function handleAccept(plateId: string){
    acceptPlate(plateId, VOLUNTEER_ID);
    setPlates([...getPlates()]);
  }
  const availablePlates = plates.filter(
    (p)=>p.status ==="POSTED"
  );

 return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">
        Volunteer Dashboard
      </h1>

      {availablePlates.length === 0 && (
        <p className="text-zinc-400 text-sm">
          No available pickups right now.
        </p>
      )}

      <div className="space-y-4">
        {availablePlates.map((plate) => (
          <div
            key={plate.id}
            className="border border-zinc-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{plate.foodName}</div>
              <div className="text-sm text-zinc-400">
                {plate.quantity} • Pickup by {plate.pickupBy}
              </div>
            </div>

            <button
              onClick={() => handleAccept(plate.id)}
              className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-emerald-400 transition"
            >
              Accept
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}