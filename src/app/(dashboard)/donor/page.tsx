"use client";

import { useState } from "react";
import { Plate }from "@/types/plate";
import { createPlate , getPlates} from "@/Services/plate.service";
 
export default  function DonorDashboard() {
    const [plates,setPlates]= useState<Plate[]>(getPlates());

    function handleCreatePlate() {
        const newPlate:Plate ={
            id:crypto.randomUUID(),
            foodName:"Veg Biryani",
            quantity:"2 servings",
            pickupBy:new Date().toISOString(),
            status:"POSTED"

        };
        createPlate (newPlate);
        setPlates(prev => [...prev, newPlate]);

    }
    return(
        <div className ="p-8 max-w-3xl">
            <h1  className = "text-2xl font-bold mb-6"> Donor Dashboard</h1>
            <button  
            onClick ={handleCreatePlate}
            className ="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Plate </button>

        <div className ="mt-6 space-y-4">
            {plates.length ===0 && (
                <p className ="text-zinc-400 text-sm">No plates available.</p>

            )}


            {plates.map((plate) => (
                <div
            key={plate.id}
            className="border border-zinc-800 rounded-lg p-4"
          >
            <div className="font-bold">{plate.foodName}</div>
            <div className="text-sm text-zinc-400">
              {plate.quantity} • Pickup by {plate.pickupBy}
            </div>
            <div className="text-xs mt-1 text-emerald-400">
              {plate.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
