"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// --- Sub-Components ---

function HourlyTimelineFull({ data, machineName }: { data: number[], machineName: string }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-white">{machineName}</span>
        <span className="text-[10px] text-slate-500 font-mono italic">24-HOUR OPERATIONAL LOG</span>
      </div>
      
      <div className="flex gap-[2px] w-full h-12 bg-slate-950/80 p-[4px] rounded-xl border border-slate-800 shadow-2xl overflow-visible">
        {data.map((status, index) => {
          // กำหนดสีแบบ Hardcode ป้องกัน Tailwind ไม่โหลดสี
          const statusConfig = [
            { label: "Standby", color: "bg-[#f59e0b]" }, // 0
            { label: "Running", color: "bg-[#22c55e]" }, // 1
            { label: "Stopped", color: "bg-[#ef4444]" }  // 2
          ];
          const current = statusConfig[status] || { label: "Unknown", color: "bg-slate-700" };

          return (
            <div
              key={index}
              className={`flex-1 ${current.color} rounded-[2px] transition-all relative group/item cursor-pointer hover:scale-y-110 hover:z-30`}
            >
              {/* Tooltip Popup */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-slate-700">
                <div className="text-blue-400 font-mono mb-1">{index.toString().padStart(2, '0')}:00 - {(index + 1).toString().padStart(2, '0')}:00</div>
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${current.color}`}></div>
                   <span className="uppercase tracking-widest">{current.label}</span>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Time Markers */}
      <div className="flex justify-between px-1 text-[8px] font-black text-slate-600 font-mono">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [machineLogs] = useState([
    { id: "MC-01", name: "Air Compressor A", logs: [1,1,1,1,1,0,1,1,2,2,1,1,1,1,1,1,0,1,1,1,1,1,1,1] },
    { id: "MC-02", name: "Air Compressor B", logs: [0,0,0,1,1,1,2,2,2,2,2,2,1,1,1,1,0,0,0,1,1,1,1,1] },
    { id: "MC-03", name: "Cooling Tower", logs: Array(24).fill(1) },
    { id: "MC-04", name: "Dryer System", logs: [1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1] },
    { id: "MC-05", name: "Main Reservoir", logs: [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  ]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/dashboard" className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">
            SYSTEM <span className="text-blue-600">TIMELINE</span> ANALYTICS
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Hourly operational status tracking for all connected machines.</p>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mb-10 p-4 bg-slate-900/30 border border-slate-800 rounded-2xl w-fit">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <div className="w-3 h-3 bg-[#22c55e] rounded-sm shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div> 
            <span className="text-slate-300">Running</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <div className="w-3 h-3 bg-[#ef4444] rounded-sm shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div> 
            <span className="text-slate-300">Stopped</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <div className="w-3 h-3 bg-[#f59e0b] rounded-sm shadow-[0_0_10px_rgba(245,158,11,0.3)]"></div> 
            <span className="text-slate-300">Standby</span>
          </div>
        </div>

        {/* Timeline List */}
        <div className="grid gap-10">
          {machineLogs.map((machine) => (
            <div key={machine.id} className="group p-6 bg-slate-900/20 border border-slate-800/50 rounded-3xl hover:border-blue-500/30 transition-all shadow-xl">
              <HourlyTimelineFull data={machine.logs} machineName={machine.name} />
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">
          ZEWELL IOT INFRASTRUCTURE v2.0
        </footer>
      </div>
    </div>
  );
}