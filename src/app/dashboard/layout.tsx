import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import OnlineStatus from "@/components/OnlineStatus";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <Sidebar user={session.user} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <Topbar user={session.user} />

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* REALTIME ONLINE STATUS */}
      <OnlineStatus />
    </div>
  );
}
