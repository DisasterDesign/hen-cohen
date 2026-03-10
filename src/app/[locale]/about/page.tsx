import type { Metadata } from "next";
import { getMessages, type Locale } from "@/lib/i18n";
import AboutClient from "./AboutClient";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";

  return {
    title: isHe ? "אודות חן אופיר כהן | צלמת קולנוע ובמאית דוקומנטרית" : "About Hen Ofir Cohen | Documentary Filmmaker & Cinematographer",
    description: isHe
      ? "חן אופיר כהן — צלמת קולנוע, במאית דוקומנטרית ועורכת. מעורבת בכל שלבי ההפקה, מהבימוי ועד העריכה. סרטים שנבנים מתוך קשב וכנות."
      : "Hen Ofir Cohen — filmmaker, cinematographer and editor involved in every stage of production. Documentary films crafted with care and honesty.",
    alternates: {
      canonical: `https://hencohen.com/${locale}/about`,
      languages: { he: "https://hencohen.com/he/about", en: "https://hencohen.com/en/about" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = getMessages(loc);

  return (
    <>
      <AboutClient locale={loc} messages={messages.about} />
      <Footer locale={loc} messages={messages.footer} navMessages={messages.nav} />
    </>
  );
}
