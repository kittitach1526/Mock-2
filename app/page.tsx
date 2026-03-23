// app/page.tsx
'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* Background Effect: แสงฟุ้งๆ ด้านหลัง */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[150px] pointer-events-none" />

      <main className="z-10 text-center px-4 max-w-4xl">
        {/* Badge เล็กๆ ด้านบน */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          IoT Monitoring System v3.0
        </div>

        {/* หัวข้อหลัก */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
          Smart Node <br />
          <span className="text-blue-500">Control Center</span>
        </h1>

        {/* คำบรรยาย */}
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          ระบบจัดการและติดตามข้อมูลจากเซนเซอร์ Air Compressor แบบ Real-time 
          เพิ่มประสิทธิภาพการทำงานและลดความเสี่ยงด้วยเทคโนโลยี IoT ล่าสุด
        </p>

        {/* กลุ่มปุ่มกด */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => router.push('/login_page')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
{/*           
          <button 
            className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white font-bold rounded-2xl transition-all"
          >
            Documentation
          </button> */}
        </div>

        {/* ส่วนโชว์สถิติเล็กๆ */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-slate-800/50 pt-10">
          <div>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-slate-500 text-sm">Uptime Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">&lt; 100ms</div>
            <div className="text-slate-500 text-sm">Data Latency</div>
          </div>
          <div className="hidden md:block">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-slate-500 text-sm">Real-time Alert</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-slate-600 text-[10px] uppercase tracking-[0.2em]">
        © 2026 Sphx IoT solution
      </footer>
    </div>
  );
}