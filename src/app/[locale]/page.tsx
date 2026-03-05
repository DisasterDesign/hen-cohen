import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";

  return {
    title: isHe
      ? "חן אופיר כהן | צלמת, במאית ועורכת דוקומנטרית"
      : "Chen Ofir Cohen | Documentary Filmmaker, Cinematographer & Editor",
    description: isHe
      ? "חן אופיר כהן — צלמת קולנוע, במאית דוקומנטרית ועורכת. סרטים דוקומנטריים, סרטי תדמית לארגונים וסיפורים אנושיים למותגים. הפקות וידאו מקצועיות בישראל."
      : "Chen Ofir Cohen — Israeli documentary filmmaker, cinematographer and editor. Documentary films, nonprofit storytelling and branded human stories.",
    alternates: {
      canonical: `https://hencohen.com/${locale}`,
      languages: { he: "https://hencohen.com/he", en: "https://hencohen.com/en" },
    },
  };
}

export default function HomePage() {
  return (
    <main className="h-screen">
      <HeroSection />
    </main>
  );
}
