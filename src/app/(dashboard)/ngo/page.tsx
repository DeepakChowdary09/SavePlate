"use client"; // Directs Next.js to treat this as a client-side interactive component

import { useState } from "react"; // React hook to manage data that changes on the screen
import { Plate } from "@/types/plate"; // Importing the TypeScript interface for data structure
import { getPlates, confirmDelivered } from "@/Services/plate.service"; // Importing storage functions

export default function NGODashboard() {
  // Initialize state 'plates' with the current data from LocalStorage
  const [plates, setPlates] = useState<Plate[]>(getPlates());

  // Logic: Only show plates where a volunteer is currently en route (status: "ASSIGNED")
  const incomingPlates = plates.filter(
    (p) => p.status === "ASSIGNED"
  );

  // Function to move a plate from "ASSIGNED" to "DELIVERED"
  function handleConfirm(id: string) {
    confirmDelivered(id); // Updates the status in the LocalStorage "database"
    setPlates([...getPlates()]); // Refresh the state to hide the plate from the "Incoming" list
  }

  return (
    <div className="p-8 max-w-3xl"> {/* Outer wrapper with layout styling (Tailwind CSS) */}
      <h1 className="text-2xl font-bold mb-6">
        NGO Dashboard
      </h1>

      {/* Logic: Show this text only if there are zero plates with "ASSIGNED" status */}
      {incomingPlates.length === 0 && (
        <p className="text-zinc-400 text-sm">
          No incoming deliveries.
        </p>
      )}

      <div className="space-y-4"> {/* Creates a vertical stack with gaps between items */}
        {/* Loop through the filtered list to generate a card for each delivery */}
        {incomingPlates.map((plate) => (
          <div
            key={plate.id} // Essential for React to track which list item changed
            className="border border-zinc-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{plate.foodName}</div>
              <div className="text-sm text-zinc-400">
                {/* Displaying details about the donation */}
                {plate.quantity} • Assigned volunteer
              </div>
            </div>

            <button
              // Trigger handleConfirm specifically for this plate's ID
              onClick={() => handleConfirm(plate.id)}
              className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-emerald-400 transition"
            >
              Confirm Received
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}