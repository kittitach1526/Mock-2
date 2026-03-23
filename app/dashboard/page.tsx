'use client'

import React, { useState, useEffect } from 'react';

export default function OEEDashboard() {
  // 1. State สำหรับเวลาปัจจุบัน
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 2. State สำหรับข้อมูล Metrics (ในอนาคตดึงจาก MongoDB)
  const [metrics, setMetrics] = useState({
    oee: 82.4,
    availability: 91.2,
    performance: 88.5,
    quality: 99.1,
    status: 'Running'
  });

  // Effect สำหรับอัปเดตเวลาทุกวินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ฟังก์ชันจัดฟอร์แมตเวลา HH:mm:ss
  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  // ฟังก์ชันคำนวณกะการทำงาน (Shift)
  const getShift = () => {
    const hour = currentTime.getHours();
    if (hour >= 8 && hour < 16) return "Morning Shift (A)";
    if (hour >= 16 && hour < 24) return "Evening Shift (B)";
    return "Night Shift (C)";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 flex flex-col items-center py-8 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/50 z-50">
        <div className="mb-12">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] cursor-pointer">
            <span className="text-white font-black text-xs">SN</span>
          </div>
        </div>
        <nav className="flex flex-col gap-8">
          <NavIcon icon="dashboard" active />
          <NavIcon icon="analytics" />
          <NavIcon icon="history" />
          <NavIcon icon="settings" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="ml-20 p-8 relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <div className="text-blue-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">System Overview</div>
            <h1 className="text-3xl font-bold text-white tracking-tight">OEE Real-time Monitor</h1>
          </div>

          {/* Time & Shift Status Bar */}
          <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800/50 shadow-lg backdrop-blur-md">
            <div className="px-4 py-1 text-right">
              <div className="text-[10px] text-blue-400 uppercase font-black tracking-widest">Live Clock</div>
              <div className="text-xl font-mono font-bold text-white mt-1 leading-none">
                {timeString}
              </div>
            </div>
            
            <div className="h-10 w-[1px] bg-slate-800" />
            
            <div className="px-4 py-1">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Current Shift</div>
              <div className="text-sm font-medium text-slate-200 mt-1">{getShift()}</div>
            </div>
            
            <div className="h-10 w-[1px] bg-slate-800" />
            
            <div className="px-4 py-1 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-black text-green-500 uppercase tracking-widest hidden lg:block">Online</span>
            </div>
          </div>
        </header>

        {/* Top Stats - Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Overall OEE" value={metrics.oee} unit="%" color="blue" glow />
          <MetricCard title="Availability" value={metrics.availability} unit="%" color="indigo" />
          <MetricCard title="Performance" value={metrics.performance} unit="%" color="cyan" />
          <MetricCard title="Quality Rate" value={metrics.quality} unit="%" color="emerald" />
        </div>

        {/* Charts & Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Card */}
          <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Production Output 
                <span className="text-slate-500 font-normal text-sm">(Hourly)</span>
              </h3>
              <select className="bg-slate-800 border-none text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-2 outline-none text-blue-400 cursor-pointer hover:bg-slate-700 transition-colors">
                <option>Today</option>
                <option>Yesterday</option>
              </select>
            </div>
            
            {/* Simple Bar Chart Visualization */}
            <div className="h-64 flex items-end gap-3 px-2">
              {[45, 52, 48, 70, 65, 82, 75, 90, 85, 60, 72, 88].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500/60 rounded-t-lg transition-all duration-700 ease-out group-hover:to-blue-400 cursor-pointer" 
                    style={{ height: `${h}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] py-1.5 px-2 rounded-lg font-bold transition-all z-20 shadow-lg">
                      {h}u
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-6 text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] px-2">
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
            </div>
          </div>

          {/* Downtime Breakdown Card */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-8 tracking-tight">Downtime Reasons</h3>
            <div className="space-y-7">
              <DowntimeRow label="Mechanical Failure" time="42m" percent={60} color="bg-red-500" />
              <DowntimeRow label="Tooling Change" time="28m" percent={40} color="bg-blue-500" />
              <DowntimeRow label="Material Short" time="15m" percent={20} color="bg-amber-500" />
              <DowntimeRow label="Operator Break" time="10m" percent={15} color="bg-slate-600" />
            </div>
            <button className="w-full mt-12 py-4 rounded-2xl bg-blue-600/5 hover:bg-blue-600/10 border border-blue-500/20 text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-sm">
              View Detailed Log
            </button>
          </div>

        </div>
      </main>
      
      {/* Footer Branding */}
      <footer className="fixed bottom-6 right-8 text-slate-700 text-[10px] font-black uppercase tracking-[0.4em] z-0">
        © 2026 ZEWELL SOLUTION
      </footer>
    </div>
  );
}

// --- Sub-components (Clean Code) ---

function MetricCard({ title, value, unit, color, glow }: any) {
  const colorMap: any = {
    blue: "text-blue-500 bg-blue-500",
    indigo: "text-indigo-500 bg-indigo-500",
    cyan: "text-cyan-500 bg-cyan-500",
    emerald: "text-emerald-500 bg-emerald-500",
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-6 rounded-3xl relative overflow-hidden group transition-all duration-300 hover:border-blue-500/40 hover:translate-y-[-2px]">
      {glow && <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full group-hover:bg-blue-600/15 transition-all" />}
      
      <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{title}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-white tracking-tighter">{value}</span>
        <span className={`text-lg font-bold ${colorMap[color].split(' ')[0]}`}>{unit}</span>
      </div>
      
      <div className="mt-5 flex items-center gap-2">
        <div className="h-1 flex-1 bg-slate-800/50 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${colorMap[color].split(' ')[1]}`} 
            style={{ width: `${value}%` }} 
          />
        </div>
      </div>
    </div>
  );
}

function NavIcon({ icon, active }: any) {
  return (
    <button className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 group ${active ? 'bg-blue-600/10 text-blue-500 shadow-[inset_0_0_15px_rgba(37,99,235,0.1)]' : 'text-slate-600 hover:text-slate-300 hover:bg-slate-800/50'}`}>
      <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
        {icon}
      </span>
    </button>
  );
}

function DowntimeRow({ label, time, percent, color }: any) {
  return (
    <div className="group cursor-default">
      <div className="flex justify-between text-xs mb-3">
        <span className="text-slate-400 font-bold tracking-tight group-hover:text-slate-200 transition-colors">{label}</span>
        <span className="text-white font-black">{time}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_8px_rgba(0,0,0,0.5)]`} 
          style={{ width: `${percent}%` }} 
        />
      </div>
    </div>
  );
}