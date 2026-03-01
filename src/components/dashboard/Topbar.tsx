"use client";

import React from "react";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";

export default function Topbar({ user }: { user: any }) {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 text-slate-500">
          <Menu size={20} />
        </button>
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari menu, mahasiswa, atau dosen..."
            className="w-full h-11 bg-slate-50 border-none rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
        </button>

        <div className="h-8 w-[1px] bg-slate-100 mx-2" />

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{user.name}</div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{user.role}</div>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-blue-700 font-bold border border-slate-200">
            {user.name?.[0] || "U"}
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
