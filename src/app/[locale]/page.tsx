import type { Metadata } from "next";
import { getMessages, type Locale } from "@/lib/i18n";
import HeroSection from "@/components/home/HeroSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import CollaborationSection from "@/components/home/CollaborationSection";
import QuoteSection from "@/components/home/QuoteSection";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";

  return {
    title: isHe
      ? "חן כהן | צלמת, במאית ועורכת דוקומנטרית"
      : "Hen Cohen | Documentary Filmmaker, Cinematographer & Editor",
    description: isHe
      ? "חן כהן — צלמת קולנוע, במאית דוקומנטרית ועורכת. סרטים דוקומנטריים, סרטי תדמית לארגונים וסיפורים אנושיים למותגים. הפקות וידאו מקצועיות בישראל."
      : "Hen Cohen — Israeli documentary filmmaker, cinematographer and editor. Documentary films, nonprofit storytelling and branded human stories.",
    alternates: {
      canonical: `https://hencohen.com/${locale}`,
      languages: { he: "https://hencohen.com/he", en: "https://hencohen.com/en" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = getMessages(loc);

  return (
    <main>
      <HeroSection locale={loc} messages={messages.hero} />
      <SelectedWorkSection locale={loc} messages={messages.selectedWork} />
      <CollaborationSection locale={loc} messages={messages.collaboration} />
      <QuoteSection messages={messages.quote} />
      <Footer locale={loc} messages={messages.footer} navMessages={messages.nav} />
    </main>
  );
}
