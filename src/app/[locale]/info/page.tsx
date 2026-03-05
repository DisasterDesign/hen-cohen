import type { Metadata } from "next";
import { getMessages, type Locale } from "@/lib/i18n";
import InfoClient from "./InfoClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";

  return {
    title: isHe
      ? "צור קשר | חן אופיר כהן — צלמת ובמאית"
      : "Contact | Chen Ofir Cohen — Filmmaker",
    description: isHe
      ? "רוצים ליצור סרט דוקומנטרי או סרט תדמית? צרו קשר עם חן אופיר כהן — צלמת קולנוע, במאית דוקומנטרית ועורכת."
      : "Want to create a documentary or branded film? Get in touch with Chen Ofir Cohen — filmmaker, cinematographer and editor.",
    alternates: {
      canonical: `https://hencohen.com/${locale}/info`,
      languages: {
        he: "https://hencohen.com/he/info",
        en: "https://hencohen.com/en/info",
      },
    },
  };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = getMessages(loc);

  return <InfoClient locale={loc} messages={messages.info} />;
}
