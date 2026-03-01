import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Mail, 
  Shield, 
  Key, 
  MoreVertical,
  Circle,
  Clock,
  Briefcase,
  GraduationCap,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createUser, deleteUser } from "@/app/actions/user";

export default async function UsersPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER & TAMBAH USER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="text-blue-700" size={32} /> Manajemen User
          </h1>
          <p className="text-slate-500 font-medium mt-1">Kelola akun Operator, Dosen, dan Mahasiswa STAI Al-Ittihad.</p>
        </div>
        
        {/* FORM TAMBAH USER (SEDERHANA) */}
        <div className="flex gap-4">
          <Button className="rounded-2xl bg-blue-700 hover:bg-blue-800 text-white px-8 h-14 text-sm font-bold shadow-xl shadow-blue-200">
            <UserPlus className="mr-2 w-5 h-5" /> Tambah User Baru
          </Button>
        </div>
      </div>

      {/* QUICK STATS USER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatsCard icon={<Shield className="text-red-500" />} label="ADMIN" value={users.filter(u => u.role === 'ADMIN').length.toString()} />
        <StatsCard icon={<Briefcase className="text-orange-500" />} label="OPERATOR" value={users.filter(u => u.role === 'OPERATOR').length.toString()} />
        <StatsCard icon={<Key className="text-blue-500" />} label="DOSEN" value={users.filter(u => u.role === 'TEACHER').length.toString()} />
        <StatsCard icon={<GraduationCap className="text-green-500" />} label="MAHASISWA" value={users.filter(u => u.role === 'STUDENT').length.toString()} />
      </div>

      {/* TABEL DAFTAR USER */}
      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-slate-50 p-8">
          <CardTitle className="text-xl font-black text-slate-900">Daftar Akun Terdaftar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 font-bold text-[10px] uppercase tracking-widest border-b border-slate-50">
                  <th className="px-8 py-5">Informasi User</th>
                  <th className="px-8 py-5">Jabatan / Role</th>
                  <th className="px-8 py-5">Status Online</th>
                  <th className="px-8 py-5">Terakhir Aktif</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-blue-700 font-bold group-hover:scale-110 transition-transform">
                          {user.name?.[0] || "U"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm leading-none mb-1.5">{user.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                             <Mail size={10} /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <RoleBadge role={user.role} />
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                          <Circle size={8} className={user.isOnline ? "fill-green-500 text-green-500" : "fill-slate-300 text-slate-300"} />
                          <span className={user.isOnline ? "text-[10px] font-bold text-green-600" : "text-[10px] font-bold text-slate-400 uppercase tracking-widest"}>
                             {user.isOnline ? "ONLINE" : "OFFLINE"}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                          <Clock size={12} className="text-slate-300" />
                          {user.lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} WIB
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon-sm" className="rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                             <MoreVertical size={18} />
                          </Button>
                          <form action={async () => { "use server"; await deleteUser(user.id); }}>
                             <Button type="submit" variant="ghost" size="icon-sm" className="rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50">
                                <Trash2 size={18} />
                             </Button>
                          </form>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const styles: any = {
    ADMIN: "bg-red-100 text-red-700",
    OPERATOR: "bg-orange-100 text-orange-700",
    TEACHER: "bg-blue-100 text-blue-700",
    STUDENT: "bg-green-100 text-green-700",
  };

  return (
    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${styles[role] || "bg-slate-100 text-slate-600"}`}>
      {role === 'TEACHER' ? 'DOSEN' : role === 'STUDENT' ? 'MAHASISWA' : role}
    </span>
  );
}

function StatsCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex items-center gap-6">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-inner shadow-slate-200/50 shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black text-slate-900 leading-none mb-1">{value}</div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
}
