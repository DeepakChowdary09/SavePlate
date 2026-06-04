"use client";

import { useState } from "react";
import { createOrder } from "@/Services/api";

export default function DonationForm() {
  const [food, setFood] = useState("");
  const [qty, setQty] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!food || !qty) return;

    setLoading(true);
    // Call  Go Backend
    await createOrder(food, qty);
    
    // Reset form
    setFood("");
    setQty("");
    setLoading(false);
  };

  return (
 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 bg-transparent backdrop-blur-none p-6 rounded-2xl border border-white/20 z-[1000] drop-shadow-lg transition-all hover:bg-black/40">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        🍛 <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Donate Food</span>
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="What food is it? (e.g. Rice)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Qty (e.g. 5kg)"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "SEND"}
          </button>
        </div>
      </form>
    </div>
  );
}