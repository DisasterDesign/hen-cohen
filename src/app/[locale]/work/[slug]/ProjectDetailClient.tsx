"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
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

/* ── Video embed with click-to-play ── */
function VideoEmbed({
  embedUrl,
  thumbnail,
  title,
}: {
  embedUrl: string;
  thumbnail: string;
  title: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-[#111]">
      {isPlaying ? (
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full group cursor-pointer"
          aria-label={`Play ${title}`}
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="80vw"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 flex items-center justify-center border border-white/20">
              <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="white" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

export default function ProjectDetailClient({
  locale,
  slug,
  messages,
}: ProjectDetailClientProps) {
  const project = getProjectBySlug(slug);
  const reduced = useReducedMotion();

  if (!project) {
    return (
      <main className="pt-40 md:pt-52 pb-20 bg-bg-dark min-h-screen">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8 text-center">
          <p className="text-text-dim">Project not found</p>
        </div>
      </main>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const number = String(currentIndex + 1).padStart(2, "0");

  return (
    <main className="pt-40 md:pt-52 pb-20 bg-bg-dark min-h-screen">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        {/* Back link */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, x: locale === "he" ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: CINEMATIC_EASE }}
        >
          <Link
            href={`/${locale}/work`}
            className="text-[11px] tracking-[0.2em] uppercase text-text-dim hover:text-text-light transition-colors duration-300 nav-link"
          >
            {messages.backToWork}
          </Link>
        </motion.div>

        {/* Metadata bar: number | title | category | year */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: CINEMATIC_EASE }}
          className="mt-10 mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-text-dim mb-4">
            <span className="font-mono">{number}</span>
            <span className="w-[1px] h-3 bg-text-dim/40" />
            <span>{project.category[locale]}</span>
            <span className="w-[1px] h-3 bg-text-dim/40" />
            <span>{project.year}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-text-light leading-tight">
            {project.title[locale]}
          </h1>
        </motion.div>

        {/* YouTube embed — centered, 80% width */}
        {project.videoEmbedUrl && (
          <ScrollReveal className="flex justify-center mb-16">
            <div className="w-full lg:w-[80%]">
              <VideoEmbed
                embedUrl={project.videoEmbedUrl}
                thumbnail={project.thumbnail}
                title={project.title[locale]}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Synopsis */}
        <ScrollReveal className="mb-16 max-w-[720px]">
          <h2 className="text-[11px] tracking-[0.25em] uppercase text-text-dim mb-4">
            {messages.synopsis}
          </h2>
          <p className="text-text-light/80 leading-relaxed whitespace-pre-line text-base md:text-lg">
            {project.synopsis[locale]}
          </p>
        </ScrollReveal>

        {/* Credits */}
        {project.credits && project.credits.length > 0 && (
          <ScrollReveal className="mb-20">
            <h2 className="text-[11px] tracking-[0.25em] uppercase text-text-dim mb-6">
              {messages.credits}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {project.credits.map((credit, index) => (
                <p key={index} className="text-sm text-text-light/70">
                  {credit[locale]}
                </p>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Prev / Next navigation */}
        <ScrollReveal>
          <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            {/* Previous */}
            <Link
              href={`/${locale}/work/${prevProject.slug}`}
              className="group block"
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-text-dim mb-1">
                {messages.prevProject}
              </p>
              <p className="font-display text-lg md:text-xl text-text-light group-hover:text-accent transition-colors duration-300">
                {prevProject.title[locale]}
              </p>
            </Link>

            {/* Next */}
            <Link
              href={`/${locale}/work/${nextProject.slug}`}
              className="group block sm:text-end"
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-text-dim mb-1">
                {messages.nextProject}
              </p>
              <p className="font-display text-lg md:text-xl text-text-light group-hover:text-accent transition-colors duration-300">
                {nextProject.title[locale]}
              </p>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
