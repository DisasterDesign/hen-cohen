"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Locale, Messages } from "@/lib/i18n";

interface WorkGridClientProps {
  locale: Locale;
  messages: Messages["work"];
}

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1] as const;

export default function WorkGridClient({ locale, messages }: WorkGridClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const reduced = useReducedMotion();

  return (
    <main className="pt-40 md:pt-52 pb-20 md:pb-28 bg-bg-dark min-h-screen">
      <div ref={ref} className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [...CINEMATIC_EASE] as [number, number, number, number] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-text-dim mb-2">
            {messages.label}
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-light">
            {messages.title}
          </h1>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px]">
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={project.slug}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: reduced ? 0.2 : 0.5,
                  delay: reduced ? 0 : 0.05 + index * 0.08,
                  ease: CINEMATIC_EASE,
                }}
              >
                <Link
                  href={`/${locale}/work/${project.slug}`}
                  className="group block relative bg-[#111111] overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title[locale]}
                      fill
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>

                  {/* Card info */}
                  <div className="px-4 py-4">
                    <span className="text-[11px] tracking-[0.2em] text-text-dim font-mono">
                      {number}
                    </span>
                    <h3 className="mt-1 text-sm md:text-base font-medium uppercase tracking-wide text-text-light leading-tight line-clamp-2">
                      {project.title[locale]}
                    </h3>
                    <p className="mt-1 text-[11px] tracking-[0.15em] uppercase text-text-dim">
                      {project.category[locale]}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
