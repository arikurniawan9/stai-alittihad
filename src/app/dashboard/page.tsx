import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { 
  Users, 
  BookOpen, 
  Video, 
  Calendar, 
  ChevronRight, 
  Clock,
  Layout,
  Award,
  Bell
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return null;

  const role = session.user.role;
  const userName = session.user.name;

  // Fetch data berdasarkan role
  const sessions = await prisma.session.findMany({
    include: {
      course: {
        include: {
          teacher: true
        }
      }
    },
    orderBy: { startTime: 'asc' },
    take: 5
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden bg-blue-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-200">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Halo, {userName}! 👋</h2>
          <p className="text-blue-100 font-light text-lg">
            {role === 'STUDENT' ? 'Siap untuk kuliah hari ini? Cek jadwal Anda di bawah.' : 'Semangat mengajar! Mari cetak generasi madani.'}
          </p>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-900/40 rounded-full translate-y-1/2 translate-x-1/2 blur-2xl" />
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={<BookOpen className="text-blue-600" />} label="Mata Kuliah" value="12" subtext="Semester Ganjil" />
        <StatsCard icon={<Users className="text-green-600" />} label="Mahasiswa Online" value="45" subtext="Saat Ini" />
        <StatsCard icon={<Award className="text-purple-600" />} label="IPK Terakhir" value="3.85" subtext="Sangat Baik" />
        <StatsCard icon={<Clock className="text-orange-600" />} label="Total Kehadiran" value="95%" subtext="Bulan Ini" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LIVE SESSIONS (JADWAL) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Video className="text-blue-700" size={24} /> Jadwal Kelas Virtual
            </h3>
            <Link href="#" className="text-sm font-bold text-blue-700 hover:underline">Lihat Kalender</Link>
          </div>

          <div className="space-y-4">
            {sessions.map((sess) => (
              <Card key={sess.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group overflow-hidden border-l-8 border-l-blue-700">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 shrink-0 group-hover:scale-110 transition-transform">
                      <Layout size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-slate-900 group-hover:text-blue-700 transition-colors">{sess.course.title}</h4>
                      <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5 mt-0.5">
                        <Users size={14} /> {sess.course.teacher.name}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                          {new Date(sess.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} WIB
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" /> Live
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button asChild className="rounded-2xl bg-slate-900 hover:bg-blue-700 text-white px-8 h-14 text-sm font-bold group shadow-lg">
                    <Link href={`/class/${sess.jitsiRoomId}`}>
                      Masuk Kelas <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="space-y-8">
          {/* ANNOUNCEMENTS */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 relative overflow-hidden">
             <div className="flex items-center gap-2 mb-6">
               <Bell className="text-orange-500" size={20} />
               <h3 className="font-black text-slate-900">Pengumuman</h3>
             </div>
             <div className="space-y-6">
               <AnnouncementItem 
                title="Libur Semester Ganjil" 
                date="01 Maret 2024" 
                color="bg-orange-500"
               />
               <AnnouncementItem 
                title="Pembayaran SPK Online" 
                date="25 Februari 2024" 
                color="bg-blue-500"
               />
               <AnnouncementItem 
                title="Workshop IT Kampus" 
                date="20 Februari 2024" 
                color="bg-purple-500"
               />
             </div>
             <Button variant="ghost" className="w-full mt-8 rounded-2xl text-slate-400 font-bold hover:bg-slate-50">
               Lihat Semua Informasi
             </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatsCard({ icon, label, value, subtext }: { icon: any, label: string, value: string, subtext: string }) {
  return (
    <Card className="rounded-[2.5rem] border-none shadow-sm hover:shadow-blue-500/10 transition-all border-b-4 border-b-transparent hover:border-b-blue-600 group">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{label}</div>
        <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{subtext}</div>
      </CardContent>
    </Card>
  );
}

function AnnouncementItem({ title, date, color }: { title: string, date: string, color: string }) {
  return (
    <div className="flex gap-4 group cursor-pointer">
      <div className={`w-1.5 h-12 rounded-full ${color} shrink-0`} />
      <div>
        <h5 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors leading-tight">{title}</h5>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{date}</p>
      </div>
    </div>
  );
}
