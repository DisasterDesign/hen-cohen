"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
  isOnHero?: boolean;
}

export default function LanguageSwitcher({ locale, isOnHero = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const otherLocale = locale === "he" ? "en" : "he";
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const label = locale === "he" ? "EN" : "עב";

  return (
    <Link
      href={otherPath}
      className="text-xs tracking-[0.15em] accent-underline transition-colors"
      style={{
        color: isOnHero ? "rgba(255,255,255,0.65)" : "var(--text-secondary)",
      }}
    >
      {label}
    </Link>
  );
}
