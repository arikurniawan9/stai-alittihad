import React from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import JitsiRoom from "@/components/JitsiRoom";
import { 
  ArrowLeft, 
  Info, 
  Users, 
  Clock 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ClassPage({ 
  params 
}: { 
  params: Promise<{ meetingId: string }> 
}) {
  const session = await auth();
  const { meetingId } = await params;

  if (!session) {
    redirect(`/login?callbackUrl=/class/${meetingId}`);
  }

  // Cari sesi berdasarkan room ID Jitsi
  const classSession = await prisma.session.findUnique({
    where: { jitsiRoomId: meetingId },
    include: {
      course: {
        include: {
          teacher: true
        }
      }
    }
  });

  if (!classSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Info size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Kelas Tidak Ditemukan</h1>
          <p className="text-slate-500 mb-8">Maaf, sesi pertemuan ini tidak terdaftar di sistem SIAKAD.</p>
          <Button asChild className="rounded-full bg-slate-900 hover:bg-slate-800 px-8">
            <Link href="/dashboard">Kembali ke Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER KELAS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{classSession.course.title}</h1>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300 uppercase tracking-widest">
                  <Users size={14} /> {classSession.course.teacher.name}
                </div>
                <div className="w-1 h-1 bg-white/30 rounded-full" />
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300 uppercase tracking-widest">
                  <Clock size={14} /> Sesi Virtual
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Live Sekarang
            </div>
          </div>
        </div>

        {/* JITSI MEETING CONTAINER */}
        <JitsiRoom 
          roomName={meetingId} 
          userName={session.user.name || "User Siakad"} 
          userEmail={session.user.email || ""}
        />

        <div className="mt-8 text-center text-white/40 text-xs font-medium uppercase tracking-[0.2em]">
          Dikelola oleh STAI Al-Ittihad Virtual Classroom &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
