"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface JitsiRoomProps {
  roomName: string;
  userName: string;
  userEmail?: string;
}

export default function JitsiRoom({ roomName, userName, userEmail }: JitsiRoomProps) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Memuat skrip Jitsi Meet External API secara dinamis
    const script = document.createElement("script");
    script.src = "https://8x8.vc/vpaas-magic-cookie-4081395560b745489f07a51609126620/external_api.js"; // Jitsi 8x8 stable
    script.async = true;
    script.onload = () => {
      if (window.JitsiMeetExternalAPI && jitsiContainerRef.current) {
        const domain = "8x8.vc";
        const options = {
          roomName: `vpaas-magic-cookie-4081395560b745489f07a51609126620/${roomName}`,
          width: "100%",
          height: "100%",
          parentNode: jitsiContainerRef.current,
          userInfo: {
            displayName: userName,
            email: userEmail
          },
          configOverwrite: {
            startWithAudioMuted: true,
            disableModeratorIndicator: false,
            startScreenSharing: false,
            enableEmailInStats: false,
            prejoinPageEnabled: false, // Langsung masuk agar lebih cepat
          },
          interfaceConfigOverwrite: {
            // Kostumisasi UI Jitsi di sini
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
              'security'
            ],
          }
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        
        // Event listener saat user keluar dari meeting
        api.addEventListener('videoConferenceLeft', () => {
          window.location.href = "/dashboard";
        });

        setIsLoading(false);
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [roomName, userName, userEmail]);

  return (
    <div className="relative w-full h-[calc(100vh-120px)] bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10 text-white">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <p className="font-bold tracking-widest text-sm animate-pulse uppercase">Menyiapkan Ruang Kelas Virtual...</p>
        </div>
      )}
      <div ref={jitsiContainerRef} className="w-full h-full" />
    </div>
  );
}

// Menambahkan deklarasi tipe untuk window agar tidak error TypeScript
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}
