"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"check" | "drawing" | "hold" | "fade" | "done">("check");

  useEffect(() => {
    // Only show on first visit per session
    if (sessionStorage.getItem("loading-shown")) {
      setPhase("done");
      return;
    }

    sessionStorage.setItem("loading-shown", "1");
    setPhase("drawing");

    // 2s draw → 1s hold → 0.6s fade → done
    const holdTimer = setTimeout(() => setPhase("hold"), 2000);
    const fadeTimer = setTimeout(() => setPhase("fade"), 3000);
    const doneTimer = setTimeout(() => setPhase("done"), 3600);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done" || phase === "check") return null;

  return (
    <div
      className="loading-screen"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1B1B19",
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
        pointerEvents: phase === "fade" ? "none" : "all",
      }}
    >
      <svg
        width="488"
        height="293"
        viewBox="0 0 195 117"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maxWidth: "80vw",
          height: "auto",
        }}
      >
        {/* Main body */}
        <rect
          className="loading-path loading-path-1"
          x="0.5"
          y="6.5"
          width="194"
          height="110"
          rx="11.5"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
        {/* Inner viewfinder square */}
        <rect
          className="loading-path loading-path-2"
          x="71.5"
          y="41.5"
          width="52"
          height="49"
          rx="11.5"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
        {/* Side flash/viewfinder */}
        <rect
          className="loading-path loading-path-3"
          x="144.5"
          y="13.5"
          width="38"
          height="27"
          rx="6.5"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
        {/* Top hot shoe */}
        <rect
          className="loading-path loading-path-4"
          x="16.5"
          y="0.5"
          width="15"
          height="6"
          rx="1.5"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
        {/* Lens circle */}
        <circle
          className="loading-path loading-path-5"
          cx="97.5"
          cy="66.5"
          r="21"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
