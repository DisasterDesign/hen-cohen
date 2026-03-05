"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import type { Locale, Messages } from "@/lib/i18n";

interface PersistentHeaderProps {
  locale: Locale;
  messages: Messages["nav"];
}

const navLinks = [
  { key: "work", href: "/work" },
  { key: "overview", href: "/overview" },
  { key: "info", href: "/info" },
] as const;

export default function PersistentHeader({ locale, messages }: PersistentHeaderProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const nameLeftRef = useRef<HTMLSpanElement>(null);
  const nameRightRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const isHe = locale === "he";
  const isHomePage = pathname === `/${locale}`;
  const isProjectPage = pathname.includes("/work/") && pathname.split("/").length > 3;

  const otherLocale = isHe ? "en" : "he";
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const langLabel = isHe ? "EN" : "עב";

  // GSAP entrance animation (only once)
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline({ delay: 0.3 });

    // Animate name characters
    const leftChars = nameLeftRef.current?.querySelectorAll(".char");
    const rightChars = nameRightRef.current?.querySelectorAll(".char");

    if (leftChars?.length) {
      tl.from(leftChars, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power3.out",
      }, 0);
    }

    if (rightChars?.length) {
      tl.from(rightChars, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power3.out",
      }, 0.1);
    }

    // Nav links fade in
    if (navRef.current) {
      tl.from(navRef.current.children, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }, 0.8);
    }

    // Subtitle
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 0.9);
    }

    // Corner info
    if (cornersRef.current) {
      tl.from(cornersRef.current.children, {
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }, 1.2);
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  // Split text into individual character spans
  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  // Name parts (LTR: CHEN OFIR ... COHEN, RTL: כהן ... חן אופיר)
  const nameLeft = isHe ? "חן אופיר" : "CHEN OFIR";
  const nameRight = isHe ? "כהן" : "COHEN";
  const subtitle = isHe ? "צלמת דוקומנטרית" : "Documentary Filmmaker";

  return (
    <>
      {/* Main header */}
      <header
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          mixBlendMode: isHomePage ? "difference" : undefined,
        }}
      >
        <div className="relative h-full w-full px-6 md:px-10 lg:px-14 py-6 md:py-8 flex flex-col justify-between">
          {/* Top row: Name + Nav */}
          <div className="pointer-events-auto">
            <div className="flex items-start justify-between" dir="ltr">
              {/* Left: Name + subtitle */}
              <div className="flex flex-col">
                <Link href={`/${locale}`} className="block">
                  <span
                    ref={nameLeftRef}
                    className="font-display font-bold text-text-light leading-[0.9] block"
                    style={{
                      fontSize: "clamp(2.5rem, 10vw, 12rem)",
                    }}
                  >
                    {splitChars(nameLeft)}
                  </span>
                </Link>
                <span
                  ref={subtitleRef}
                  className="text-text-dim text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.2em] mt-1 md:mt-2"
                >
                  {subtitle}
                </span>
              </div>

              {/* Right: Nav + Surname */}
              <div className="flex flex-col items-end">
                <div className="flex items-start gap-6 md:gap-8">
                  {/* Nav links (desktop) */}
                  <div ref={navRef} className="hidden md:flex items-center gap-5 mt-2">
                    {isProjectPage ? (
                      <Link
                        href={`/${locale}/work`}
                        className="nav-link text-text-light text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.15em] pb-0.5"
                      >
                        BACK
                      </Link>
                    ) : (
                      navLinks.map((link) => {
                        const href = `/${locale}${link.href}`;
                        const isActive = pathname.startsWith(href);
                        return (
                          <Link
                            key={link.key}
                            href={href}
                            className={`nav-link text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.15em] pb-0.5 transition-colors ${
                              isActive ? "text-text-light active" : "text-text-dim hover:text-text-light"
                            }`}
                          >
                            {messages[link.key as keyof typeof messages]}
                          </Link>
                        );
                      })
                    )}
                  </div>

                  {/* Surname */}
                  <Link href={`/${locale}`} className="block">
                    <span
                      ref={nameRightRef}
                      className="font-display font-bold text-text-light leading-[0.9] block"
                      style={{
                        fontSize: "clamp(2.5rem, 10vw, 12rem)",
                      }}
                    >
                      {splitChars(nameRight)}
                    </span>
                  </Link>
                </div>

                {/* Language switcher */}
                <Link
                  href={otherPath}
                  className="text-text-dim text-[0.6rem] tracking-[0.15em] hover:text-text-light transition-colors mt-1 md:mt-2"
                >
                  {langLabel}
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden absolute top-6 text-text-light z-50"
              style={{ [isHe ? "left" : "right"]: "1.5rem" }}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Bottom corners (Home only) */}
          {isHomePage && (
            <div ref={cornersRef} className="pointer-events-auto flex justify-between items-end" dir="ltr">
              {/* Bottom-left: Contact */}
              <div className="flex flex-col gap-1 text-text-dim text-[0.6rem] md:text-[0.65rem] tracking-[0.1em] font-mono">
                <a href="mailto:chen@hencohen.com" className="hover:text-text-light transition-colors">
                  chen@hencohen.com
                </a>
                <span>+972-50-272-7599</span>
              </div>

              {/* Bottom-right: Social */}
              <div className="flex flex-col items-end gap-1 text-text-dim text-[0.6rem] md:text-[0.65rem] tracking-[0.1em] uppercase">
                <a
                  href="https://www.instagram.com/hen_ofir_cohen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-light transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://vimeo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-light transition-colors"
                >
                  Vimeo
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-bg-dark flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-6 right-6 text-text-light"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map((link, i) => {
              const href = `/${locale}${link.href}`;
              const isActive = pathname.startsWith(href);
              return (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`font-display text-3xl uppercase tracking-[0.1em] transition-colors ${
                      isActive ? "text-text-light" : "text-text-dim"
                    }`}
                  >
                    {messages[link.key as keyof typeof messages]}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href={otherPath}
                onClick={() => setIsMobileOpen(false)}
                className="text-text-dim text-sm tracking-[0.15em] hover:text-text-light transition-colors"
              >
                {langLabel}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
