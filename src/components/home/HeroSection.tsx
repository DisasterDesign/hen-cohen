"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const alreadyShown = sessionStorage.getItem("loading-shown");
    if (alreadyShown === "1") {
      const loadingEl = document.querySelector(".loading-screen");
      if (!loadingEl) {
        video.play();
        return;
      }
    }

    const timer = setTimeout(() => {
      video.play();
    }, 4400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="fixed inset-0 w-full h-screen overflow-hidden" style={{ zIndex: 0 }}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
