"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createOrder } from "@/Services/api";
import { Zap, Loader2, Server } from "lucide-react";

export default function DonorDashboard() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [lastId, setLastId] = useState<string | null>(null);
  
  const [form, setForm] = useState({ foodName: "", quantity: "" });

  if (!isLoaded) return <div className="p-8">Initializing System...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await createOrder(form.foodName, form.quantity);
      setLastId(crypto.randomUUID().slice(0,8)); // Mock ID for UI feedback
      setForm({ foodName: "", quantity: "" });
    } catch (err) {
      alert("Error: Ensure  Backend is running on Port 8080");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto text-white">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Injector</h1>
          <p className="text-zinc-400"> Click Here to Inject load into the logistics simulator.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/>
            <span className="text-xs font-mono text-emerald-500">UPLINK ACTIVE</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl backdrop-blur-xl">
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Payload Type</label>
            <input
              value={form.foodName}
              onChange={(e) => setForm({ ...form, foodName: e.target.value })}
              placeholder="e.g. Ice Cream (Perishable)"
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 mt-2 focus:border-emerald-500 outline-none transition text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Payload Weight</label>
            <input
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="e.g. 50kg"
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 mt-2 focus:border-emerald-500 outline-none transition text-white"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Server size={20} />}
            {loading ? "Transmitting..." : "INITIATE DISPATCH SEQUENCE"}
          </button>
        </div>
      </form>

      {lastId && (
        <div className="mt-6 p-4 border border-emerald-500/20 bg-emerald-500/10 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
           <Zap className="text-emerald-500" size={18} />
           <span className="text-emerald-400 font-mono text-sm">
             Injection Successful. Trace ID: {lastId}
           </span>
        </div>
      )}
    </div>
  );
}
