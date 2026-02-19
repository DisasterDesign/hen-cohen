"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale, Messages } from "@/lib/i18n";

interface NavbarProps {
  locale: Locale;
  messages: Messages["nav"];
}

const navLinks = [
  { key: "home", href: "" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.08 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar({ locale, messages }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const isHomePage = pathname === `/${locale}`;

  return (
    <>
      <nav
        dir="ltr"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? "bg-bg-primary/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="flex flex-row-reverse items-center justify-between h-16 md:h-20">
            <Link
              href={`/${locale}`}
              className="transition-colors duration-300"
              style={{
                color:
                  isScrolled || !isHomePage
                    ? "var(--text-primary)"
                    : "#FAFBF6",
              }}
            >
              <Image
                src="/logo-header.svg"
                alt="Hen Cohen"
                width={120}
                height={49}
                className="transition-all duration-300"
                style={{
                  filter:
                    isScrolled || !isHomePage
                      ? "none"
                      : "invert(1)",
                }}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const href = `/${locale}${link.href}`;
                const isActive = link.href === ""
                  ? pathname === `/${locale}`
                  : pathname.startsWith(href);

                return (
                  <Link
                    key={link.key}
                    href={href}
                    className="text-[12px] tracking-[0.15em] transition-colors nav-link"
                    style={{
                      color: isScrolled || !isHomePage
                        ? isActive ? "var(--text-primary)" : "var(--text-secondary)"
                        : isActive ? "#FAFBF6" : "rgba(255,255,255,0.65)",
                    }}
                  >
                    {messages[link.key as keyof typeof messages]}
                  </Link>
                );
              })}
              <div
                className="w-px h-4 transition-colors duration-300"
                style={{
                  backgroundColor:
                    isScrolled || !isHomePage
                      ? "var(--border)"
                      : "rgba(255,255,255,0.3)",
                }}
              />
              <LanguageSwitcher
                locale={locale}
                isOnHero={isHomePage && !isScrolled}
              />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 transition-colors duration-300"
              style={{
                color:
                  isScrolled || !isHomePage
                    ? "var(--text-primary)"
                    : "#FAFBF6",
              }}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="h-[2px] bg-text-primary origin-left"
          style={{ scaleX: progressScaleX }}
        />
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => {
              const href = `/${locale}${link.href}`;
              const isActive = link.href === ""
                ? pathname === `/${locale}`
                : pathname.startsWith(href);
              return (
                <motion.div key={link.key} variants={mobileLinkVariants}>
                  <Link
                    href={href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`font-heading text-2xl transition-colors ${
                      isActive ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {messages[link.key as keyof typeof messages]}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div variants={mobileLinkVariants}>
              <LanguageSwitcher locale={locale} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
