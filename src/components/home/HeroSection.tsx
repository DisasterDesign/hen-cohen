"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Locale, Messages } from "@/lib/i18n";

interface HeroSectionProps {
  locale: Locale;
  messages: Messages["hero"];
}

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1] as const;

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.04,
              ease: CINEMATIC_EASE,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </>
  );
}

export default function HeroSection({ locale, messages }: HeroSectionProps) {
  const reduced = useReducedMotion();
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 60]);
  const indicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      setScrollIndicatorVisible(v < 100);
    });
    return unsubscribe;
  }, [scrollY]);

  // Delay video playback until after loading screen finishes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const alreadyShown = sessionStorage.getItem("loading-shown");
    if (alreadyShown === "1") {
      // Loading screen was already shown in a previous page visit this session,
      // or was just set by LoadingScreen — check if loading is still active
      const loadingEl = document.querySelector(".loading-screen");
      if (!loadingEl) {
        // No loading screen present, play immediately
        video.play();
        return;
      }
    }

    // Wait for loading animation to finish (3s animation + 0.6s fade)
    const timer = setTimeout(() => {
      video.play();
    }, 3600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video — Ken Burns zoom-out + parallax */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? {} : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={reduced ? {} : { duration: 1.5, ease: CINEMATIC_EASE }}
        style={reduced ? {} : { y: parallaxY }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FAFBF6] max-w-4xl leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          <WordReveal text={messages.tagline} delay={0.3} />
        </h1>

        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.2 : 0.8, delay: 0.8, ease: CINEMATIC_EASE }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[#FAFBF6]/80 max-w-2xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
        >
          {messages.subtitle}
        </motion.p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.6, delay: 1.2, ease: CINEMATIC_EASE }}
          >
            <Link
              href={`/${locale}/work`}
              className="btn-outline px-8 py-3 border border-[#FAFBF6]/80 text-[#FAFBF6] text-xs tracking-[0.2em] shadow-[0_2px_16px_rgba(0,0,0,0.4)]"
            >
              {messages.ctaWork}
            </Link>
          </motion.div>
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.6, delay: 1.35, ease: CINEMATIC_EASE }}
          >
            <a
              href="https://wa.me/972502727599"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid px-8 py-3 bg-[#FAFBF6] text-[#1B1B19] text-xs tracking-[0.2em] shadow-[0_2px_16px_rgba(0,0,0,0.4)]"
            >
              {messages.ctaContact}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — fades on scroll */}
      {scrollIndicatorVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity: reduced ? 0.6 : indicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-[#FAFBF6]/40 rounded-full flex justify-center drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
          >
            <motion.div
              animate={reduced ? {} : { opacity: [0, 1, 0], y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 bg-[#FAFBF6]/60 rounded-full mt-1.5"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
