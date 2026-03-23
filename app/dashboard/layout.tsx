'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-hidden">
      {/* Background Glows (Global) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      {/* Sidebar Fixed */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 flex flex-col items-center py-8 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/50 z-50">
        <div className="mb-12">
          <Link href="/dashboard">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] cursor-pointer hover:scale-110 transition-transform">
              <span className="text-white font-black text-xs">SN</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex flex-col gap-8">
          <NavItem href="/dashboard" icon="dashboard" active={pathname === '/dashboard'} />
          <NavItem href="/dashboard/processes" icon="analytics" active={pathname === '/dashboard/processes'} />
          <NavItem href="/dashboard/history" icon="history" active={pathname === '/dashboard/history'} />
          <NavItem href="/dashboard/settings" icon="settings" active={pathname === '/dashboard/settings'} />
        </nav>

        <div className="mt-auto">
           <NavItem href="/logout" icon="logout" active={false} />
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="ml-20">
        {children}
      </div>
      
      {/* Footer Branding */}
      <footer className="fixed bottom-6 right-8 text-slate-800 text-[10px] font-black uppercase tracking-[0.4em] z-0 pointer-events-none">
        © 2026 ZEWELL SOLUTION
      </footer>
    </div>
  );
}

// Sub-component สำหรับเมนู
function NavItem({ href, icon, active }: { href: string, icon: string, active: boolean }) {
  return (
    <Link href={href}>
      <button className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 group ${active ? 'bg-blue-600/10 text-blue-500 shadow-[inset_0_0_15px_rgba(37,99,235,0.1)]' : 'text-slate-600 hover:text-slate-300 hover:bg-slate-800/50'}`}>
        <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </button>
    </Link>
  );
}