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
  const navRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
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

    if (navRef.current) {
      tl.from(navRef.current.children, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }, 0.8);
    }

    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 0.9);
    }

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
      <header
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          mixBlendMode: isHomePage ? "difference" : undefined,
        }}
      >
        <div className="relative h-full w-full px-4 md:px-8 lg:px-12 py-4 md:py-6 flex flex-col justify-between">
          {/* Top section */}
          <div className="pointer-events-auto">
            {/* Main row: [NAME LEFT] ... [NAV] ... [NAME RIGHT] — all on one baseline */}
            <div className="flex items-baseline justify-between w-full" dir="ltr">
              {/* Left name */}
              <Link href={`/${locale}`} className="block flex-shrink-0">
                <span
                  ref={nameLeftRef}
                  className="font-display font-bold text-text-light leading-[0.85] block whitespace-nowrap"
                  style={{
                    fontSize: "clamp(1.8rem, 7vw, 9rem)",
                  }}
                >
                  {splitChars(nameLeft)}
                </span>
              </Link>

              {/* Center nav (desktop only) */}
              <nav ref={navRef} className="hidden md:flex items-baseline gap-4 lg:gap-6 flex-shrink-1 px-4 lg:px-8">
                {isProjectPage ? (
                  <Link
                    href={`/${locale}/work`}
                    className="nav-link text-text-light text-[0.65rem] lg:text-[0.75rem] uppercase tracking-[0.15em] pb-0.5"
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
                        className={`nav-link text-[0.65rem] lg:text-[0.75rem] uppercase tracking-[0.15em] pb-0.5 transition-colors whitespace-nowrap ${
                          isActive ? "text-text-light active" : "text-text-dim hover:text-text-light"
                        }`}
                      >
                        {messages[link.key as keyof typeof messages]}
                      </Link>
                    );
                  })
                )}
              </nav>

              {/* Right name */}
              <Link href={`/${locale}`} className="block flex-shrink-0">
                <span
                  ref={nameRightRef}
                  className="font-display font-bold text-text-light leading-[0.85] block whitespace-nowrap"
                  style={{
                    fontSize: "clamp(1.8rem, 7vw, 9rem)",
                  }}
                >
                  {splitChars(nameRight)}
                </span>
              </Link>
            </div>

            {/* Second row: subtitle (left) + lang switcher (right) */}
            <div ref={subtitleRef} className="flex items-center justify-between mt-1 md:mt-2" dir="ltr">
              <span className="text-text-dim text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em]">
                {subtitle}
              </span>
              <Link
                href={otherPath}
                className="text-text-dim text-[0.55rem] md:text-[0.6rem] tracking-[0.15em] uppercase hover:text-text-light transition-colors opacity-60 hover:opacity-100"
              >
                {langLabel}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden absolute top-4 text-text-light z-50"
              style={{ [isHe ? "left" : "right"]: "1rem" }}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Bottom corners (Home only) */}
          {isHomePage && (
            <div ref={cornersRef} className="pointer-events-auto flex justify-between items-end" dir="ltr">
              {/* Bottom-left: Contact */}
              <div className="flex flex-col gap-1 text-text-dim text-[0.55rem] md:text-[0.6rem] tracking-[0.1em] font-mono">
                <a href="mailto:chen@hencohen.com" className="hover:text-text-light transition-colors">
                  chen@hencohen.com
                </a>
                <span>+972-50-272-7599</span>
              </div>

              {/* Bottom-right: Social */}
              <div className="flex flex-col items-end gap-1 text-text-dim text-[0.55rem] md:text-[0.6rem] tracking-[0.1em] uppercase">
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
              className="absolute top-4 text-text-light"
              style={{ [isHe ? "left" : "right"]: "1rem" }}
              aria-label="Close menu"
            >
              <X size={22} />
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
