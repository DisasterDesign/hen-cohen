import type { Metadata } from "next";
import { getMessages, type Locale } from "@/lib/i18n";
import ContactClient from "./ContactClient";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";

  return {
    title: isHe ? "צור קשר | חן אופיר כהן — צלמת ובמאית" : "Contact | Hen Ofir Cohen — Filmmaker",
    description: isHe
      ? "רוצים ליצור סרט דוקומנטרי או סרט תדמית? צרו קשר עם חן אופיר כהן — צלמת קולנוע, במאית דוקומנטרית ועורכת."
      : "Want to create a documentary or branded film? Get in touch with Hen Ofir Cohen — filmmaker, cinematographer and editor.",
    alternates: {
      canonical: `https://hencohen.com/${locale}/contact`,
      languages: { he: "https://hencohen.com/he/contact", en: "https://hencohen.com/en/contact" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const messages = getMessages(loc);

  return (
    <>
      <ContactClient locale={loc} messages={messages.contact} />
      <Footer locale={loc} messages={messages.footer} navMessages={messages.nav} />
    </>
  );
}
