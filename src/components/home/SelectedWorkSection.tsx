"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Locale, Messages } from "@/lib/i18n";

interface SelectedWorkSectionProps {
  locale: Locale;
  messages: Messages["selectedWork"];
}

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1] as const;

export default function SelectedWorkSection({ locale, messages }: SelectedWorkSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <div ref={ref} className="mx-auto max-w-[1200px] px-6 md:px-8">
        <SectionHeading label={messages.label} title={messages.title} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.slug}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: reduced ? 0.2 : 0.6,
                delay: reduced ? 0 : 0.1 + index * 0.1,
                ease: CINEMATIC_EASE,
              }}
            >
              <Link
                href={`/${locale}/work/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-primary">
                  <Image
                    src={project.thumbnail}
                    alt={project.title[locale]}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-lg md:text-xl text-text-primary transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-[3px]">
                      {project.title[locale]}
                    </h3>
                    <span className="text-xs text-text-secondary shrink-0 transition-all duration-500 group-hover:opacity-100 opacity-70">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">
                    {project.description[locale]}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: reduced ? 0.2 : 0.8, ease: CINEMATIC_EASE }}
          className="mt-12 text-center"
        >
          <Link
            href={`/${locale}/work`}
            className="inline-block text-xs tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors accent-underline pb-1"
          >
            {messages.viewAll}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
