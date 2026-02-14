"use client";

import { useEffect, useState } from "react";
import { Cpu, Terminal } from "lucide-react";
import { AILog } from "@/types/plate";

export default function NGODashboard() {
  const [logs, setLogs] = useState<AILog[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // For MVE Demo: We generate fake logs if backend isn't sending them yet
      const newLog = generateFakeLog(); 
      setLogs((prev) => [newLog, ...prev].slice(0, 15)); 
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-center">
          <Cpu className="text-emerald-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Decision Engine</h1>
          <p className="text-zinc-500">Live stream of dispatch logic and reasoning.</p>
        </div>
      </div>

      <div className="bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-mono text-sm min-h-[500px]">
        <div className="bg-zinc-900/50 p-3 border-b border-zinc-800 flex items-center gap-2">
          <Terminal size={14} className="text-zinc-500" />
          <span className="ml-2 text-xs text-zinc-500">/var/log/ai_agent.log</span>
        </div>

        <div className="p-6 space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300 border-l border-zinc-800 pl-4 py-1 hover:bg-zinc-900/30 transition">
              <span className="text-zinc-600 shrink-0 text-xs mt-1">{log.timestamp}</span>
              <div>
                <span className={`${log.color} font-bold text-xs uppercase tracking-wider`}>[{log.agent}]</span>{" "}
                <span className="text-zinc-300 ml-2">{log.message}</span>
                {log.reasoning && (
                  <div className="mt-1 text-zinc-500 italic text-xs">
                    &quot;Thinking: {log.reasoning}&quot;
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper to simulate logs (Remove this once Python Agent is connected)
function generateFakeLog(): AILog {
  const types = [
    { agent: "INGEST", color: "text-blue-400", message: "Received GPS update from Agent #42" },
    { agent: "POSTGIS", color: "text-amber-400", message: "Querying K-Nearest Neighbors (Radius: 5km)" },
    { 
      agent: "AI_CORE", 
      color: "text-emerald-400", 
      message: "Dispatch Decision: Assigning Driver #42", 
      reasoning: "Driver #42 (Bike) selected. Traffic is Moderate. Payload is Perishable." 
    },
  ];
  const random = types[Math.floor(Math.random() * types.length)];
  return {
    id: Math.random(),
    timestamp: new Date().toLocaleTimeString(),
    agent: random.agent,
    color: random.color,
    message: random.message,
    reasoning: random.reasoning
  };
}