"use client"; // Directs Next.js to treat this as a client-side interactive component

import { useState } from "react"; 
import { useUser } from "@clerk/nextjs"; // 1. Import Clerk hook
import { Plate } from "@/types/plate"; 
import { getPlates, confirmDelivered } from "@/Services/plate.service"; 

export default function NGODashboard() {
  // 2. Get current user context
  const { user, isLoaded, isSignedIn } = useUser();

  // Initialize state 'plates' with the current data
  const [plates, setPlates] = useState<Plate[]>(getPlates());

  // 3. LOADING STATE: Wait for Clerk to load
  if (!isLoaded) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  // 4. ROLE CHECK: Restrict access specifically to 'ngo' role
  if (!isSignedIn || user?.publicMetadata.role !== "ngo") {
    return (
      <div className="p-8 text-red-500 font-bold">
        Access denied: This page is restricted to registered NGO partners.
      </div>
    );
  }

  // Logic: Only show plates where a volunteer is currently en route (status: "ASSIGNED")
  const incomingPlates = plates.filter(
    (p) => p.status === "ASSIGNED"
  );

  // Function to move a plate from "ASSIGNED" to "DELIVERED"
  function handleConfirm(id: string) {
    confirmDelivered(id); 
    setPlates([...getPlates()]); // Refresh the state
  }

  return (
    <div className="p-8 max-w-3xl"> 
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          NGO Dashboard
        </h1>
        {/* Optional: Personalize the welcome message */}
        <span className="text-sm text-zinc-500">
          Organization: {user.firstName || "Partner"}
        </span>
      </div>

      {/* Logic: Show this text only if there are zero plates with "ASSIGNED" status */}
      {incomingPlates.length === 0 && (
        <p className="text-zinc-400 text-sm">
          No incoming deliveries.
        </p>
      )}

      <div className="space-y-4"> 
        {/* Loop through the filtered list */}
        {incomingPlates.map((plate) => (
          <div
            key={plate.id} 
            className="border border-zinc-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{plate.foodName}</div>
              <div className="text-sm text-zinc-400">
                {plate.quantity} • Assigned volunteer
              </div>
            </div>

            <button
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