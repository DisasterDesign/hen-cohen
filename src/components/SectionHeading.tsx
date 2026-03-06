"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
}

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1] as const;

export default function SectionHeading({ label, title, className = "" }: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={`mb-12 ${className}`}>
      {label && (
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0.2 : 0.5, ease: CINEMATIC_EASE }}
          className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-3"
        >
          {label}
        </motion.p>
      )}
      <div className="overflow-hidden">
        <motion.h2
          initial={reduced ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={
            isInView
              ? { opacity: 1, clipPath: "inset(0 0 0% 0)" }
              : {}
          }
          transition={{ duration: reduced ? 0.2 : 0.8, delay: label ? 0.1 : 0, ease: CINEMATIC_EASE }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-primary"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
