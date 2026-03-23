'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            // --- รวม Logic API ไว้ที่นี่ ---
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // บันทึกข้อมูลลง LocalStorage เมื่อสำเร็จ
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            // ไปหน้า Dashboard
            router.push('/dashboard');
            
        } catch (err: any) {
            setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#020617] relative overflow-hidden text-slate-200">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />

            <div className="w-full max-w-md z-10">
                {/* BACK BUTTON */}
                <button 
                    onClick={() => router.push("/")}
                    className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="text-sm font-medium">Back to Home</span>
                </button>

                <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-800 rounded-3xl shadow-2xl p-8 md:p-10">
                    
                    {/* HEADER */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 mb-4 rotate-3">
                            <div className="w-8 h-8 border-4 border-white rounded-md rotate-12" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">FOSTEC</h1>
                        <p className="text-slate-400 mt-2 text-sm">
                            Enter your credentials to access your IoT nodes.
                        </p>
                    </div>

                    {/* ERROR MESSAGE */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs py-3 px-4 rounded-xl mb-6 flex items-center gap-2">
                            <span className="text-base">⚠️</span> {error}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2 text-left">
                            <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="e.g. admin_iot"
                                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
                                required
                            />
                        </div>

                        <div className="space-y-2 text-left">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                                <button type="button" className="text-[10px] text-blue-500 hover:underline">Forgot?</button>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
                                required
                            />
                        </div>

                        <button 
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-blue-600/20
                                ${isLoading ? 'bg-blue-800 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98]'}`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* REGISTER LINK */}
                    <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                        <p className="text-sm text-slate-400">
                            New to IoT Hub? 
                            <button
                                type="button"
                                onClick={() => router.push("/register")}
                                className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                            >
                                Create an account
                            </button>
                        </p>
                    </div>
                </div>

                {/* FOOTER INFO */}
                <p className="mt-8 text-center text-slate-600 text-[10px] uppercase tracking-[0.2em]">
                    Secured by IoT.Hub Enterprise © 2026
                </p>
            </div>
        </div>
    )
}