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
  const title = project.title[loc];
  const description = project.synopsis[loc].substring(0, 160);
  const baseUrl = "https://hencohen.com";

  return {
    title,
    description,
    keywords: loc === "he"
      ? [title, "חן אופיר כהן", "סרט דוקומנטרי", project.category.he, "צלמת", "במאית"]
      : [title, "Hen Ofir Cohen", "documentary film", project.category.en, "filmmaker", "cinematographer"],
    alternates: {
      canonical: `${baseUrl}/${locale}/work/${slug}`,
      languages: {
        he: `${baseUrl}/he/work/${slug}`,
        en: `${baseUrl}/en/work/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "video.other",
      url: `${baseUrl}/${locale}/work/${slug}`,
      images: [{ url: project.heroImage, width: 1280, height: 720, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.heroImage],
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
