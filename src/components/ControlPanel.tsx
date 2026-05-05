"use client";

import { useEffect, useState, useRef } from "react";
import { fetchLogs, createOrder } from "@/Services/api";

interface Log {
  id: number;
  timestamp: string;
  agent: string;
  message: string;
  color: string;
}

export default function ControlPanel() {
  const [logs, setLogs] = useState<Log[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Poll for logs every 1 second
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchLogs();
      setLogs(data);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleInjectOrder = async () => {
    await createOrder();
    // The backend will generate a log, which we will pick up in the next poll
  };

  return (
    <div className="absolute bottom-4 right-4 w-80 bg-transparent backdrop-blur-none text-green-400 p-4 rounded-lg border border-green-500/30 z-[1000] font-mono text-sm drop-shadow-lg transition-all hover:bg-black/40">
      <div className="flex justify-between items-center mb-4 border-b border-green-800 pb-2">
        <h2 className="font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          SYSTEM_LOGS
        </h2>
        <span className="text-xs text-green-600">LIVE</span>
      </div>

      {/* The Terminal Window*/}
      <div className="h-64 overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
        {logs.length === 0 && <div className="text-gray-500 italic">Waiting for system events...</div>}
        {logs.map((log) => (
          <div key={log.id} className="border-l-2 border-green-700 pl-2">
            <span className="text-xs text-gray-500">[{log.timestamp}]</span>{" "}
            <span className="font-bold text-blue-400">{log.agent}:</span>{" "}
            <span className="text-white">{log.message}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* The Chaos Button*/}
      <button
        onClick={handleInjectOrder}
        className="w-full bg-green-900/30 hover:bg-green-800/50 text-green-300 border border-green-600 py-2 rounded uppercase text-xs tracking-wider transition-all active:scale-95"
      >
        [+] INJECT MOCK ORDER 
      </button>
    </div>
  );
}