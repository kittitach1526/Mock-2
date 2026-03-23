"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ProcessDetails() {
  // ข้อมูลจำลองของแต่ละ Process/Machine (ในอนาคตดึงจาก MongoDB)
  const [processes] = useState([
    {
      id: "MC-01",
      name: "Air Compressor A",
      availability: 94.2,
      performance: 88.0,
      quality: 99.5,
      oee: 82.4,
      status: "Running",
    },
    {
      id: "MC-02",
      name: "Air Compressor B",
      availability: 88.5,
      performance: 75.2,
      quality: 98.2,
      oee: 65.3,
      status: "Maintenance",
    },
    {
      id: "MC-03",
      name: "Cooling Tower",
      availability: 99.1,
      performance: 92.4,
      quality: 100,
      oee: 91.5,
      status: "Running",
    },
    {
      id: "MC-04",
      name: "Dryer System",
      availability: 92.0,
      performance: 85.0,
      quality: 99.0,
      oee: 77.4,
      status: "Running",
    },
    {
      id: "MC-05",
      name: "Main Reservoir",
      availability: 100,
      performance: 100,
      quality: 100,
      oee: 100,
      status: "Standby",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb & Title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
            <span>Dashboard</span>
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
            <span className="text-blue-500">Process Analytics</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Machine Performance Logs
          </h1>
        </div>

        {/* Table Container */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/30 border-bottom border-slate-800/50">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Machine / Process
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
                  Availability
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
                  Performance
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">
                  Quality
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 text-center">
                  Overall OEE
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {processes.map((proc) => (
                <tr
                  key={proc.id}
                  className="hover:bg-blue-500/5 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-500 font-bold border border-slate-700 group-hover:border-blue-500/50 transition-all">
                        {proc.id.split("-")[1]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {proc.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                          {proc.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <ProgressBar value={proc.availability} color="blue" />
                  </td>

                  <td className="p-6 text-center">
                    <ProgressBar value={proc.performance} color="indigo" />
                  </td>

                  <td className="p-6 text-center">
                    <ProgressBar value={proc.quality} color="emerald" />
                  </td>

                  <td className="p-6 text-center">
                    <span
                      className={`text-lg font-black ${proc.oee > 80 ? "text-blue-400" : proc.oee > 60 ? "text-amber-400" : "text-red-400"}`}
                    >
                      {proc.oee}%
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <StatusBadge status={proc.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table Footer / Pagination Info */}
          <div className="p-6 border-t border-slate-800/50 flex justify-between items-center text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <div>Showing {processes.length} Active Processes</div>
            <div className="flex gap-4">
              <button className="hover:text-blue-500 transition-colors">
                Previous
              </button>
              <button className="hover:text-blue-500 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="mt-8 inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-all text-xs font-bold uppercase tracking-widest group"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Dashboard
        </Link>
      </main>

      <footer className="fixed bottom-6 right-8 text-slate-800 text-[10px] font-black uppercase tracking-[0.4em]">
        © 2026 ZEWELL ANALYTICS
      </footer>
    </div>
  );
}

// --- Helper Components ---

function ProgressBar({ value, color }: { value: number; color: string }) {
  const colors: any = {
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div className="inline-block w-32">
      <div className="flex justify-between items-center mb-1 text-[10px] font-bold">
        <span className="text-slate-400">{value}%</span>
      </div>
      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[color]} rounded-full transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Running: "bg-green-500/10 text-green-500 border-green-500/20",
    Maintenance: "bg-red-500/10 text-red-500 border-red-500/20",
    Standby: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}
    >
      {status}
    </span>
  );
}
