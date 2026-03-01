"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Lock, 
  ArrowRight, 
  Loader2, 
  ShieldCheck,
  GraduationCap,
  Users,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username atau password salah!");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 md:p-0">
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
        
        {/* KIRI: VISUAL & INFO */}
        <div className="hidden md:flex relative bg-blue-700 p-12 flex-col justify-between text-white overflow-hidden">
          {/* Animated background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/40 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-700 font-bold text-xl">A</div>
              <h1 className="text-xl font-bold tracking-tight">STAI AL-ITTIHAD</h1>
            </div>
            
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Selamat Datang Kembali di SIAKAD</h2>
            <p className="text-blue-100 text-lg font-light leading-relaxed">
              Akses portal akademik terpadu untuk mengelola perkuliahan, nilai, dan administrasi kampus dalam satu platform.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <ShieldCheck className="w-6 h-6 mb-2 text-blue-300" />
              <div className="text-sm font-semibold">Aman & Terenkripsi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <Users className="w-6 h-6 mb-2 text-blue-300" />
              <div className="text-sm font-semibold">Real-time Online</div>
            </div>
          </div>
        </div>

        {/* KANAN: FORM LOGIN */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Portal Masuk</h3>
              <p className="text-slate-500">Silakan masukkan akun Anda untuk melanjutkan</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Username / NIM / NIDN</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    placeholder="Masukkan username Anda"
                    className="h-14 pl-12 rounded-2xl border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <Input 
                    type="password"
                    placeholder="Masukkan password"
                    className="h-14 pl-12 rounded-2xl border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end mb-2">
                <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">Lupa Password?</button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white text-lg font-bold shadow-xl shadow-blue-200 transition-all active:scale-95 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Masuk Sekarang <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-center text-slate-500 text-sm mb-6 uppercase tracking-widest font-bold">Pilih Akses Anda</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer group">
                  <GraduationCap className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-700">MAHASISWA</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer group">
                  <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-700">DOSEN</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
