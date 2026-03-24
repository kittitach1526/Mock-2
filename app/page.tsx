'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden flex flex-col font-sans italic"> {/* ใส่ italic คุมทั้งหน้า */}
      
      {/* 🌌 Background Dynamic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />

      {/* 🧭 NAVIGATION BAR */}
      <nav className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer pr-6"> {/* เพิ่ม pr-6 กันชื่อแบรนด์ขาด */}
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="/Logo-FOSTEC.png" 
              alt="FOSTEC Logo" 
              className="h-10 w-auto relative z-10 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
            />
          </div>
          {/*}
          <span className="text-xl font-black tracking-tighter uppercase italic">
            FOS<span className="text-blue-500">TEC</span>
          </span>
          */}
        </div>

        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
          <button 
            onClick={() => router.push('/login_page')}
            className="px-6 py-2 border border-blue-500/30 rounded-full text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          >
            LOGIN
          </button>
        </div>
      </nav>

      {/* 🚀 MAIN CONTENT */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 max-w-[1200px] mx-auto pb-20 overflow-visible">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-xl italic">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          System Protocol Active v3.0
        </div>

        {/* 🔥 Hero Title: ใส่ Italic พร้อมแก้ Overflow 🔥 */}
        <div className="relative mb-10 px-10 overflow-visible"> {/* เพิ่ม px-10 เพื่อรองรับการเอียงของตัว R */}
          <h1 className="text-6xl md:text-8xl font-black mb-4 leading-[1.2] uppercase tracking-tight italic overflow-visible">
            <span className="block text-white">SMART NODE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 pb-4 pr-4"> 
              CONTROL CENTER
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 mt-2 pr-6">
             <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] italic">Industrial IoT Platform</span>
             <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm md:text-lg mb-14 max-w-2xl mx-auto leading-relaxed font-medium uppercase tracking-wide opacity-70 italic pr-4">
          Precision monitoring for Air Compressor networks. <br className="hidden md:block" />
          Seamless data integration with end-to-end encryption.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-10 italic">
          <button 
            onClick={() => router.push('/login_page')}
            className="group relative w-full sm:w-auto px-12 py-5 bg-blue-600 rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3">
              START <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </button>
          
          {/*}
          <button className="w-full sm:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm">
            Read Docs
          </button>
          */}
        </div>

        {/* Statistics Area */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-6 w-full italic">
          {[
            { val: "99.9%", lbl: "System Uptime", icon: "bolt" },
            { val: "< 100ms", lbl: "Low Latency", icon: "sensors" },
            { val: "24/7", lbl: "Active Nodes", icon: "shield" }
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-blue-500/40 transition-all group overflow-visible relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
              <span className="material-symbols-outlined text-blue-500/40 mb-4 group-hover:text-blue-500 transition-colors block italic-none">{stat.icon}</span>
              <div className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none pr-2">{stat.val}</div>
              <div className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mt-3 pr-2">{stat.lbl}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 flex flex-col items-center gap-4 italic">
        <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em]">
          Powered by FOSTEC Intelligence © 2026
        </p>
      </footer>
    </div>
  );
}