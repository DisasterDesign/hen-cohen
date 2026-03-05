"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import type { Locale, Messages } from "@/lib/i18n";

interface OverviewClientProps {
  locale: Locale;
  messages: Messages["overview"];
}

const services = [
  { num: "01", titleKey: "service1Title", descKey: "service1Desc" },
  { num: "02", titleKey: "service2Title", descKey: "service2Desc" },
  { num: "03", titleKey: "service3Title", descKey: "service3Desc" },
] as const;

export default function OverviewClient({ locale, messages }: OverviewClientProps) {
  const bioSections = [
    messages.bio1,
    messages.bio2,
    messages.bio3,
    messages.bio4,
    messages.bio5,
  ];

  return (
    <main className="pt-40 md:pt-52 pb-20 md:pb-28 bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        {/* Section 1: Artist Statement */}
        <SectionHeading label={messages.label} title={messages.title} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Portrait photo */}
          <ScrollReveal
            direction={locale === "he" ? "left" : "right"}
            duration={0.9}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
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
              <h3 className="font-display text-2xl md:text-3xl text-[#f0f0f0] mb-8">
                {messages.bioTitle}
              </h3>
            </ScrollReveal>

            {bioSections.map((paragraph, index) => (
              <ScrollReveal key={index} delay={0.3 + index * 0.08}>
                <p className="text-[#f0f0f0]/70 leading-relaxed mb-6 whitespace-pre-line">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Section 2: Services */}
        <div className="mt-32">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#f0f0f0] mb-16">
              {messages.servicesTitle}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {services.map((service, index) => (
              <ScrollReveal key={service.num} delay={0.1 + index * 0.12}>
                <div className="border-t border-[#f0f0f0]/10 pt-8">
                  <span className="block text-xs tracking-[0.2em] text-[#f0f0f0]/40 mb-4">
                    {service.num}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-[#f0f0f0] mb-4">
                    {messages[service.titleKey]}
                  </h3>
                  <p className="text-[#f0f0f0]/60 leading-relaxed">
                    {messages[service.descKey]}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
