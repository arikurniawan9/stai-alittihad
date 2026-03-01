import ZoomRoomWrapper from "@/components/ZoomRoomWrapper";

export default async function ClassPage({ params }: { params: Promise<{ meetingId: string }> }) {
  const { meetingId } = await params;

  return (
    <main>
      <ZoomRoomWrapper meetingId={meetingId} userName="Student User" />
    </main>
  );
}