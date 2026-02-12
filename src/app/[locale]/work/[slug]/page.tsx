import type { Metadata } from "next";
import { locales, getMessages, type Locale } from "@/lib/i18n";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  const loc = locale as Locale;
  return {
    title: project.title[loc],
    description: project.synopsis[loc].substring(0, 160),
    openGraph: {
      title: project.title[loc],
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const messages = getMessages(loc);

  return (
    <>
      <ProjectDetailClient locale={loc} slug={slug} messages={messages.project} />
      <Footer locale={loc} messages={messages.footer} navMessages={messages.nav} />
    </>
  );
}
