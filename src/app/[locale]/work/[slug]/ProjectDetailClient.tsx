"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { projects, getProjectBySlug } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Locale, Messages } from "@/lib/i18n";

interface ProjectDetailClientProps {
  locale: Locale;
  slug: string;
  messages: Messages["project"];
}

const CINEMATIC_EASE = [0.25, 0.1, 0.25, 1] as const;

export default function ProjectDetailClient({ locale, slug, messages }: ProjectDetailClientProps) {
  const project = getProjectBySlug(slug);
  const reduced = useReducedMotion();

  if (!project) {
    return (
      <main className="pt-28 pb-20 bg-bg-primary">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 text-center">
          <p className="text-text-secondary">Project not found</p>
        </div>
      </main>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="pt-16 md:pt-20 bg-bg-primary">
      {/* Hero image */}
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.3 : 0.8, ease: CINEMATIC_EASE }}
        className="relative w-full aspect-[21/9] overflow-hidden"
      >
        <Image
          src={project.heroImage}
          alt={project.title[locale]}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
      </motion.div>

      <div className="mx-auto max-w-[900px] px-6 md:px-8 py-12 md:py-20">
        {/* Back link */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: CINEMATIC_EASE }}
        >
          <Link
            href={`/${locale}/work`}
            className="text-xs tracking-[0.15em] text-text-secondary hover:text-text-primary transition-colors nav-link"
          >
            {messages.backToWork}
          </Link>
        </motion.div>

        {/* Title and meta */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: CINEMATIC_EASE }}
          className="mt-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-primary">
            {project.title[locale]}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
            <span>{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-text-primary" />
            <span>{project.category[locale]}</span>
          </div>
        </motion.div>

        {/* Synopsis */}
        <ScrollReveal className="mt-10">
          <h2 className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
            {messages.synopsis}
          </h2>
          <p className="text-text-secondary leading-relaxed whitespace-pre-line">
            {project.synopsis[locale]}
          </p>
        </ScrollReveal>

        {/* Video embed */}
        {project.videoEmbedUrl && (
          <ScrollReveal className="mt-12">
            <div className="relative w-full aspect-video overflow-hidden bg-[rgba(27,27,25,0.04)]">
              <iframe
                src={project.videoEmbedUrl}
                title={project.title[locale]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </ScrollReveal>
        )}

        {/* Credits */}
        {project.credits && project.credits.length > 0 && (
          <ScrollReveal className="mt-12">
            <h2 className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
              {messages.credits}
            </h2>
            <ul className="space-y-2">
              {project.credits.map((credit, index) => (
                <li key={index} className="text-sm text-text-secondary">
                  {credit[locale]}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        )}

        {/* Next project */}
        <ScrollReveal className="mt-20 pt-10 border-t border-border">
          <Link
            href={`/${locale}/work/${nextProject.slug}`}
            className="group block"
          >
            <p className="text-xs tracking-[0.2em] text-text-secondary mb-2">
              {messages.nextProject}
            </p>
            <p className="font-heading text-2xl md:text-3xl text-text-primary group-hover:opacity-55 transition-opacity duration-300">
              {nextProject.title[locale]}
            </p>
          </Link>
        </ScrollReveal>
      </div>
    </main>
  );
}
