"use client"; // Tells Next.js this component runs in the browser (needed for useState and clicks)

import { useState } from "react"; // Hook to store and update data on the screen
import { Plate } from "@/types/plate"; // Importing the "blueprint" we created for data safety
import { getPlates, acceptPlate } from "@/Services/plate.service"; // Importing our storage logic functions

// Mock ID: In a real app, this would come from an Auth system (like Login)
const VOLUNTEER_ID ="volunteer-001"; 

export default function Volunteerdashboard(){
  // Initialize 'plates' state with data currently in LocalStorage
  const[plates, setPlates] = useState<Plate[]>(getPlates());

  // Function triggered when the "Accept" button is clicked
  function handleAccept(plateId: string){
    // 1. Update the data in LocalStorage
    acceptPlate(plateId, VOLUNTEER_ID); 
    
    // 2. Re-fetch from storage and update the UI (triggers a re-render)
    // [...getPlates()] creates a new array reference so React notices the change
    setPlates([...getPlates()]);
  }

  // Filter the list so volunteers only see food that hasn't been claimed yet
  const availablePlates = plates.filter(
    (p)=>p.status ==="POSTED"
  );

 return (
    <div className="p-8 max-w-3xl"> {/* Container with padding and max width */}
      <h1 className="text-2xl font-bold mb-6">
        Volunteer Dashboard
      </h1>

      {/* Conditional Rendering: Show message only if the list is empty */}
      {availablePlates.length === 0 && (
        <p className="text-zinc-400 text-sm">
          No available pickups right now.
        </p>
      )}

      <div className="space-y-4"> {/* Vertical spacing between cards */}
        {/* Map: Loop through each plate and transform it into HTML/JSX */}
        {availablePlates.map((plate) => (
          <div
            key={plate.id} // Unique key helps React stay fast when list changes
            className="border border-zinc-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{plate.foodName}</div>
              <div className="text-sm text-zinc-400">
                {/* String Interpolation: Combining data fields into one line */}
                {plate.quantity} • Pickup by {plate.pickupBy}
              </div>
            </div>

            <button
              // Event Listener: When clicked, run handleAccept for THIS specific plate
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