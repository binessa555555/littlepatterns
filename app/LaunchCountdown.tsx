"use client";

import { useEffect, useState } from "react";

const LAUNCH_TIME = new Date("2026-10-29T17:27:00+04:00").getTime();

export default function LaunchCountdown() {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, LAUNCH_TIME - Date.now())
  );

  useEffect(() => {
    if (Date.now() < LAUNCH_TIME) {
      document.body.style.overflow = "hidden";
    }

    const timer = setInterval(() => {
      const left = Math.max(0, LAUNCH_TIME - Date.now());
      setRemaining(left);

      if (left <= 0) {
        document.body.style.overflow = "";
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (remaining <= 0) return null;

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "30px",
        color: "#000000",
      }}
    >
      <div
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "clamp(30px, 5vw, 64px)",
          fontWeight: 400,
          marginBottom: "28px",
        }}
      >
        New Collection Coming Soon
      </div>

      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "clamp(38px, 7vw, 80px)",
          fontWeight: 300,
          letterSpacing: "4px",
        }}
      >
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </div>

      <div
        style={{
          marginTop: "16px",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
        Hours &nbsp;&nbsp; Minutes &nbsp;&nbsp; Seconds
      </div>
    </div>
  );
}
