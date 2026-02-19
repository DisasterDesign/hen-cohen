import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/data/projects";

export const dynamic = "force-static";

const baseUrl = "https://hencohen.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["he", "en"];
  const staticPages = ["", "/about", "/work", "/contact"];
  const projectSlugs = getAllProjectSlugs();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            he: `${baseUrl}/he${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    }

    for (const slug of projectSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/work/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            he: `${baseUrl}/he/work/${slug}`,
            en: `${baseUrl}/en/work/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
