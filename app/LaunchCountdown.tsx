"use client";

import { useEffect, useState } from "react";

const LAUNCH_TIME =
  new Date("2026-10-29T17:27:00+04:00").getTime();

export default function LaunchCountdown() {
  const [remaining, setRemaining] =
    useState<number | null>(null);

  useEffect(() => {
    const preview =
      new URLSearchParams(window.location.search).get("preview") === "1";

    if (preview) {
      setRemaining(0);
      document.body.style.overflow = "";
      return;
    }

    const update = () => {
      const left =
        Math.max(0, LAUNCH_TIME - Date.now());

      setRemaining(left);

      document.body.style.overflow =
        left > 0 ? "hidden" : "";
    };

    update();

    const timer =
      setInterval(update, 1000);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (remaining === null || remaining <= 0)
    return null;

  const total =
    Math.floor(remaining / 1000);

  const hours =
    Math.floor(total / 3600);

  const minutes =
    Math.floor((total % 3600) / 60);

  const seconds =
    total % 60;

  const pad = (n: number) =>
    String(n).padStart(2, "0");

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
        color: "#000000",
        padding: "30px",
      }}
    >
      <div
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(30px,5vw,64px)",
          marginBottom: "28px",
        }}
      >
        New Collection Coming Soon
      </div>

      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "clamp(38px,7vw,80px)",
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
        }}
      >
        HOURS &nbsp;&nbsp; MINUTES &nbsp;&nbsp; SECONDS
      </div>
    </div>
  );
}
