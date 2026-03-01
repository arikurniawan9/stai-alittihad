import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { event, payload } = body;

  const meetingId = payload.object.id.toString();
  const participant = payload.object.participant;
  const timestamp = new Date(participant.date_time);

  try {
    const session = await prisma.session.findUnique({
      where: { zoomMeetingId: meetingId },
    });

    if (!session) return NextResponse.json({ message: 'Session not found' }, { status: 200 });

    if (event === 'meeting.participant_joined') {
      await prisma.attendance.create({
        data: {
          sessionId: session.id,
          studentId: participant.email, // Using email as a simple identifier lookup
          joinTime: timestamp,
        },
      });
    } else if (event === 'meeting.participant_left') {
      const attendance = await prisma.attendance.findFirst({
        where: {
          sessionId: session.id,
          studentId: participant.email,
          leaveTime: null,
        },
        orderBy: { joinTime: 'desc' },
      });

      if (attendance) {
        const duration = Math.floor((timestamp.getTime() - attendance.joinTime.getTime()) / 60000);
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: {
            leaveTime: timestamp,
            totalDurationMinutes: duration,
          },
        });
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}