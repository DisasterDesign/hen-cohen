import type { Metadata } from "next";
import { getMessages, type Locale } from "@/lib/i18n";
import WorkGridClient from "./WorkGridClient";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";

  return {
    title: isHe ? "עבודות נבחרות | סרטים דוקומנטריים — חן כהן" : "Selected Work | Documentary Films — Hen Cohen",
    description: isHe
      ? "פרויקטים נבחרים של חן כהן — סרטים דוקומנטריים, סרטי תדמית לארגונים ומלכ״רים, וסיפורים אנושיים למותגים."
      : "Selected projects by Hen Cohen — documentary films, organizational storytelling, and branded human stories.",
    alternates: {
      canonical: `https://hencohen.com/${locale}/work`,
      languages: { he: "https://hencohen.com/he/work", en: "https://hencohen.com/en/work" },
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = getMessages(loc);

  return (
    <>
      <WorkGridClient locale={loc} messages={messages.work} />
      <Footer locale={loc} messages={messages.footer} navMessages={messages.nav} />
    </>
  );
}
