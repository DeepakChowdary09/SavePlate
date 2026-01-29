"use client";

import { useState } from "react";
import { Plate } from "@/types/plate";
import { getPlates, confirmDelivered } from "@/Services/plate.service";

export default function NGODashboard() {
  const [plates, setPlates] = useState<Plate[]>(getPlates());

  const incomingPlates = plates.filter(
    (p) => p.status === "ASSIGNED"
  );

  function handleConfirm(id: string) {
    confirmDelivered(id);
    setPlates([...getPlates()]);
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">
        NGO Dashboard
      </h1>

      {incomingPlates.length === 0 && (
        <p className="text-zinc-400 text-sm">
          No incoming deliveries.
        </p>
      )}

      <div className="space-y-4">
        {incomingPlates.map((plate) => (
          <div
            key={plate.id}
            className="border border-zinc-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-bold">{plate.foodName}</div>
              <div className="text-sm text-zinc-400">
                {plate.quantity} • The Volunteer has been Assigned
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
