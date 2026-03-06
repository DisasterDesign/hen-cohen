"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import type { Locale, Messages } from "@/lib/i18n";

interface AboutClientProps {
  locale: Locale;
  messages: Messages["about"];
}

export default function AboutClient({ locale, messages }: AboutClientProps) {
  const bioSections = [
    messages.bio1,
    messages.bio2,
    messages.bio3,
    messages.bio4,
    messages.bio5,
  ];

  return (
    <main className="pt-28 md:pt-36 pb-20 md:pb-28 bg-bg-primary">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionHeading label={messages.label} title={messages.title} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Profile image */}
          <ScrollReveal direction={locale === "he" ? "left" : "right"} duration={0.9}>
            <div className="relative aspect-[3/4] overflow-hidden bg-bg-primary">
              <Image
                src="/hen-cohen-portrait.jpg"
                alt={messages.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Bio text */}
          <div>
            <ScrollReveal delay={0.2} direction={locale === "he" ? "right" : "left"}>
              <h3 className="font-heading text-2xl md:text-3xl text-text-primary mb-8">
                {messages.bioTitle}
              </h3>
            </ScrollReveal>

            {bioSections.map((paragraph, index) => (
              <ScrollReveal key={index} delay={0.3 + index * 0.08}>
                <p className="text-text-secondary leading-relaxed mb-6 whitespace-pre-line">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
