"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Messages } from "@/lib/i18n";

interface QuoteSectionProps {
  messages: Messages["quote"];
}

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1] as const;

export default function QuoteSection({ messages }: QuoteSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <section className="py-24 md:py-36 bg-bg-primary border-y border-border">
      <div ref={ref} className="mx-auto max-w-[900px] px-6 md:px-8 text-center">
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: reduced ? 0.3 : 1.2, ease: CINEMATIC_EASE }}
          className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-primary leading-snug italic"
        >
          &ldquo;{messages.text}&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}
