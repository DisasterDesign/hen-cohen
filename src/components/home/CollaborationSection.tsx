"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import type { Locale, Messages } from "@/lib/i18n";

interface CollaborationSectionProps {
  locale: Locale;
  messages: Messages["collaboration"];
}

export default function CollaborationSection({ locale, messages }: CollaborationSectionProps) {
  const cards = [
    { title: messages.card1Title, desc: messages.card1Desc },
    { title: messages.card2Title, desc: messages.card2Desc },
    { title: messages.card3Title, desc: messages.card3Desc },
  ];

  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionHeading label={messages.label} title={messages.title} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <ScrollReveal key={index} delay={0.15 * index}>
              <div className="group pt-6 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-[3px] hover:bg-[rgba(27,27,25,0.04)] rounded-sm px-1 -mx-1">
                {/* Top border — expands on hover */}
                <div className="relative h-px mb-0 -mt-6">
                  <div className="absolute inset-0 bg-border" />
                  <div className="absolute inset-y-0 left-0 w-[30%] bg-text-primary transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-full" />
                </div>
                <div className="pt-6">
                  <h3 className="font-heading text-xl md:text-2xl text-text-primary mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5} className="mt-14 text-center">
          <a
            href="https://wa.me/972502727599"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors accent-underline pb-1"
          >
            {messages.cta}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
