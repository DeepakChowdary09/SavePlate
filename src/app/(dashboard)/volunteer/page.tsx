"use client"; // Tells Next.js this component runs in the browser

import { useState } from "react"; 
import { useUser } from "@clerk/nextjs"; // 1. Import Clerk hook
import { Plate } from "@/types/plate"; 
import { getPlates, acceptPlate } from "@/Services/plate.service"; 

export default function VolunteerDashboard() {
  // 2. Get the current user and loading status from Clerk
  const { user, isLoaded, isSignedIn } = useUser();
  
  // Initialize 'plates' state
  const [plates, setPlates] = useState<Plate[]>(getPlates());

  // 3. LOADING STATE: Wait for Clerk to load before checking roles
  if (!isLoaded) {
    return <div className="p-8">Loading user data...</div>;
  }

  // 4. ROLE CHECK: If not signed in OR not a volunteer, deny access
  if (!isSignedIn || user?.publicMetadata.role !== "volunteer") {
    return (
      <div className="p-8 text-red-500 font-bold">
        Access denied: This page is restricted to registered volunteers.
      </div>
    );
  }

  // Function triggered when the "Accept" button is clicked
  function handleAccept(plateId: string) {
    // Safety check to ensure user exists (TypeScript safety)
    if (!user) return;

    // 5. Use the REAL user ID from Clerk instead of the mock ID
    acceptPlate(plateId, user.id); 
    
    // Re-fetch and update UI
    setPlates([...getPlates()]);
  }

  const availablePlates = plates.filter(
    (p) => p.status === "POSTED"
  );

  return (
    <div className="p-8 max-w-3xl"> 
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Volunteer Dashboard
        </h1>
        {/* Optional: Show who is logged in */}
        <span className="text-sm text-zinc-500">
          Hello, {user.firstName || "Volunteer"}
        </span>
      </div>

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