"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const ZoomRoom = dynamic(() => import('@/components/ZoomRoom'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-slate-950">
      <Skeleton className="h-[400px] w-[600px] rounded-xl bg-slate-800" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-slate-800" />
        <Skeleton className="h-4 w-[200px] bg-slate-800" />
      </div>
      <p className="text-white animate-pulse">Initializing Secure Zoom Room...</p>
    </div>
  ),
});

export default function ZoomRoomWrapper({ meetingId, userName }: { meetingId: string, userName: string }) {
  return <ZoomRoom meetingId={meetingId} userName={userName} />;
}