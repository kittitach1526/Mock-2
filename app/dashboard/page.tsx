"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function OEEDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-blue-500 font-black animate-pulse uppercase tracking-[0.5em]">System Loading...</div>
      </div>
    );
  }

  return (
    // ลบ Sidebar (aside) ออกจากที่นี่ เพราะมีอยู่ใน layout.tsx แล้ว
    // ปรับโครงสร้างหลักให้แสดงผลภายใน Content Area ของ Layout
    <div className="relative z-10 p-8 max-w-[1600px] mx-auto">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-slate-800/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            PRODUCTION ENGINE
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            ZEWELL <span className="text-blue-600">OEE MONITOR</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-900/40 px-5 py-2.5 rounded-2xl border border-slate-800 shadow-lg shadow-black/20">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">Live Stream</span>
          </div>
        </div>
      </header>

      {/* Metric Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard title="Overall OEE" value={82.4} unit="%" color="blue" glow />
        <MetricCard title="Availability" value={91.2} unit="%" color="indigo" />
        <MetricCard title="Performance" value={88.5} unit="%" color="cyan" />
        <MetricCard title="Quality Rate" value={99.1} unit="%" color="emerald" />
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Output Flowrate (Left Large Card) */}
        <div className="lg:col-span-2 bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
              <span className="material-symbols-outlined text-[160px]">insights</span>
          </div>
          
          <div className="flex justify-between items-center mb-12 relative z-10">
            <h3 className="text-lg font-black text-white italic tracking-widest flex items-center gap-3 uppercase">
              <span className="w-2 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></span>
              Output Flowrate
            </h3>
            <div className="flex gap-2">
               <button className="px-5 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">Daily View</button>
               <button className="px-5 py-2 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 active:scale-95">Log History</button>
            </div>
          </div>
          
          <div className="h-72 flex items-end gap-3 px-2 relative z-10">
            {[45, 52, 48, 70, 65, 82, 75, 90, 85, 60, 72, 88].map((h, i) => (
              <div key={i} className="flex-1 group/bar relative">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600/5 via-blue-500/30 to-blue-400/60 rounded-t-lg transition-all duration-500 ease-out group-hover/bar:from-blue-600/20 group-hover/bar:to-blue-300 group-hover/bar:shadow-[0_0_25px_rgba(59,130,246,0.4)] cursor-pointer" 
                  style={{ height: `${h}%` }}
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-700 font-mono tracking-tighter">
                  {i+8}H
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Failure Distribution (Right Card) */}
        <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] p-10 shadow-2xl flex flex-col h-full min-h-[550px]">
          <h3 className="text-lg font-black text-white italic tracking-widest uppercase mb-12 flex items-center gap-3">
            <span className="w-2 h-6 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
            Failure Distribution
          </h3>
          
          <div className="space-y-10 flex-grow px-2">
            <DowntimeRow label="Mechanical Failure" time="42m" percent={60} color="bg-red-500" />
            <DowntimeRow label="Tooling / Setup" time="28m" percent={40} color="bg-blue-500" />
            <DowntimeRow label="Material Supply" time="15m" percent={20} color="bg-amber-500" />
            <DowntimeRow label="Operator Idling" time="10m" percent={15} color="bg-slate-600" />
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/40">
            <Link 
              href="/dashboard/timeline" 
              className="group w-full py-4.5 rounded-[1.25rem] bg-slate-800/40 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 transition-all duration-300 text-white font-black text-[11px] uppercase tracking-[0.4em] shadow-xl flex items-center justify-center gap-3 active:scale-[0.97]"
            >
              <span>Timeline Analytics</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Internal Components (เหมือนเดิม) ---
function MetricCard({ title, value, unit, color, glow }: any) {
  const colors: any = {
    blue: "text-blue-500 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.2)]",
    indigo: "text-indigo-500 bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.2)]",
    cyan: "text-cyan-500 bg-cyan-600 shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    emerald: "text-emerald-500 bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 p-7 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500 hover:bg-slate-900/60">
      {glow && <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />}
      <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${colors[color].split(' ')[1]}`}></span>
        {title}
      </div>
      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-6xl font-black text-white tracking-tighter italic leading-none">{value}</span>
        <span className={`text-xs font-black uppercase ${colors[color].split(' ')[0]}`}>{unit}</span>
      </div>
      <div className="h-[3px] w-full bg-slate-800/80 rounded-full overflow-hidden shadow-inner p-[0.5px]">
        <div className={`h-full transition-all duration-1000 ease-out ${colors[color].split(' ')[1]}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function DowntimeRow({ label, time, percent, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-4">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-200 transition-colors">{label}</span>
        <span className="text-sm font-mono font-bold text-white italic tracking-widest">{time}</span>
      </div>
      <div className="h-2.5 w-full bg-slate-800/50 rounded-full overflow-hidden p-[1px] border border-slate-800/30 shadow-inner">
        <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(0,0,0,0.6)]`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}