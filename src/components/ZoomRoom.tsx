"use client";

import { useEffect } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";

interface ZoomRoomProps {
  meetingId: string;
  userName: string;
}

export default function ZoomRoom({ meetingId, userName }: ZoomRoomProps) {
  useEffect(() => {
    const initZoom = async () => {
      // @ts-ignore
      ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', '/av');
      // @ts-ignore
      ZoomMtg.preLoadWasm();
      // @ts-ignore
      ZoomMtg.prepareWebSDK();

      const res = await fetch(`/api/zoom/signature?meetingNumber=${meetingId}&role=0`);
      const { signature } = await res.json();

      ZoomMtg.init({
        leaveUrl: `${window.location.origin}/dashboard`,
        patchJsMedia: true,
        success: (success: any) => {
          ZoomMtg.join({
            signature,
            meetingNumber: meetingId,
            userName: userName,
            sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY!,
            passWord: "", // Add if required
            success: (s: any) => console.log("Joined successfully"),
            error: (e: any) => console.error(e),
          });
        },
        error: (e: any) => console.error(e),
      });
    };

    initZoom();
  }, [meetingId, userName]);

  return <div id="zmmtg-root" className="fixed inset-0 bg-black" />;
}