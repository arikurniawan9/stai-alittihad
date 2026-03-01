"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  LogOut,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  FileText
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const menuItems = {
  ADMIN: [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Users size={20} />, label: "Manajemen User", href: "/dashboard/users" },
    { icon: <ShieldCheck size={20} />, label: "Hak Akses", href: "/dashboard/roles" },
    { icon: <Settings size={20} />, label: "Pengaturan", href: "/dashboard/settings" },
  ],
  OPERATOR: [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <GraduationCap size={20} />, label: "Data Mahasiswa", href: "/dashboard/students" },
    { icon: <Briefcase size={20} />, label: "Data Dosen", href: "/dashboard/teachers" },
    { icon: <BookOpen size={20} />, label: "Kurikulum", href: "/dashboard/curriculum" },
  ],
  TEACHER: [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Calendar size={20} />, label: "Jadwal Mengajar", href: "/dashboard/schedule" },
    { icon: <Users size={20} />, label: "Presensi Mahasiswa", href: "/dashboard/attendance" },
    { icon: <FileText size={20} />, label: "Input Nilai", href: "/dashboard/grades" },
  ],
  STUDENT: [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Calendar size={20} />, label: "Jadwal Kuliah", href: "/dashboard/schedule" },
    { icon: <BookOpen size={20} />, label: "KRS Online", href: "/dashboard/krs" },
    { icon: <FileText size={20} />, label: "Hasil Studi", href: "/dashboard/khs" },
  ],
};

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const role = user.role as keyof typeof menuItems;
  const currentMenu = menuItems[role] || menuItems.STUDENT;

  return (
    <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col">
      <div className="p-8 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">STAI ITTIHAD</h1>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">SIAKAD v1.0</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {currentMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group",
              pathname === item.href 
                ? "bg-blue-50 text-blue-700 shadow-sm" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <span className={cn(
              "transition-colors",
              pathname === item.href ? "text-blue-700" : "text-slate-400 group-hover:text-slate-600"
            )}>
              {item.icon}
            </span>
            <span className="text-sm font-bold">{item.label}</span>
            {pathname === item.href && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
