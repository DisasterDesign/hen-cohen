"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { Locale, Messages } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  messages: Messages["footer"];
  navMessages: Messages["nav"];
}

const navLinks = [
  { key: "home", href: "" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function Footer({ locale, messages, navMessages }: FooterProps) {
  return (
    <footer className="bg-bg-primary border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-16">
        <ScrollReveal duration={0.5}>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
            {/* Name */}
            <div>
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2 hover:opacity-55 transition-opacity duration-300"
              >
                <Image
                  src="/logo.svg"
                  alt="Hen Cohen"
                  width={28}
                  height={30}
                />
                <span className="font-heading text-xl tracking-wide text-text-primary">
                  {messages.name}
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className="text-[11px] tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors duration-300 nav-link"
                >
                  {navMessages[link.key as keyof typeof navMessages]}
                </Link>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/hen_ofir_cohen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:opacity-55 transition-opacity duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/hen.cohen.376"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:opacity-55 transition-opacity duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/972502727599"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:opacity-55 transition-opacity duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={20} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="h-px bg-border my-10" />

        {/* Copyright */}
        <p className="text-center text-xs text-text-secondary">
          {messages.copyright}
        </p>
        <p className="text-center text-[10px] text-text-secondary/50 mt-3">
          Built by{" "}
          <a
            href="https://www.fuzionwebz.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-secondary transition-colors duration-300"
          >
            Fuzion
          </a>
        </p>
      </div>
    </footer>
  );
}
