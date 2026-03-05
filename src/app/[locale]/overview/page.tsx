import type { Metadata } from "next";
import { getMessages, type Locale } from "@/lib/i18n";
import OverviewClient from "./OverviewClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";

  return {
    title: isHe
      ? "אודות חן אופיר כהן | צלמת קולנוע ובמאית דוקומנטרית"
      : "About Chen Ofir Cohen | Documentary Filmmaker & Cinematographer",
    description: isHe
      ? "חן אופיר כהן — צלמת קולנוע, במאית דוקומנטרית ועורכת. מעורבת בכל שלבי ההפקה, מהבימוי ועד העריכה. סרטים שנבנים מתוך קשב וכנות."
      : "Chen Ofir Cohen — filmmaker, cinematographer and editor involved in every stage of production. Documentary films crafted with care and honesty.",
    alternates: {
      canonical: `https://hencohen.com/${locale}/overview`,
      languages: {
        he: "https://hencohen.com/he/overview",
        en: "https://hencohen.com/en/overview",
      },
    },
  };
}

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = getMessages(loc);

  return <OverviewClient locale={loc} messages={messages.overview} />;
}
