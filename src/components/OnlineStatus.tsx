"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Circle } from "lucide-react";

interface OnlineUser {
  id: string;
  name: string | null;
  role: string;
  image: string | null;
}

export default function OnlineStatus() {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk update last seen (Heartbeat)
  useEffect(() => {
    const heartbeat = async () => {
      try {
        await fetch("/api/user/heartbeat", { method: "POST" });
      } catch (err) {
        console.error("Heartbeat failed");
      }
    };

    const fetchOnline = async () => {
      try {
        const res = await fetch("/api/user/online");
        const data = await res.json();
        setOnlineUsers(data);
      } catch (err) {
        console.error("Fetch online users failed");
      }
    };

    // Jalankan pertama kali
    heartbeat();
    fetchOnline();

    // Interval: Heartbeat setiap 30 detik, Refresh list setiap 1 menit
    const heartbeatInterval = setInterval(heartbeat, 30000);
    const onlineInterval = setInterval(fetchOnline, 60000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(onlineInterval);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="p-4 bg-blue-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-bold text-sm">Online Sekarang</span>
              </div>
              <span className="bg-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {onlineUsers.length} Aktif
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {onlineUsers.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Tidak ada user aktif
                </div>
              ) : (
                onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-2xl transition-colors">
                    <div className="relative">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-blue-700 font-bold">
                        {user.name?.[0] || "U"}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">{user.role}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="relative">
          <Users className="w-6 h-6" />
          {onlineUsers.length > 0 && (
            <span className="absolute -top-3 -right-3 w-5 h-5 bg-red-500 border-2 border-white text-[10px] font-bold flex items-center justify-center rounded-full">
              {onlineUsers.length}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
