import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Cari user yang lastSeen nya kurang dari 2 menit yang lalu
  const threshold = new Date(Date.now() - 2 * 60 * 1000);

  const onlineUsers = await prisma.user.findMany({
    where: {
      lastSeen: {
        gt: threshold
      },
      isOnline: true
    },
    select: {
      id: true,
      name: true,
      role: true,
      image: true
    },
    take: 10
  });

  return NextResponse.json(onlineUsers);
}
