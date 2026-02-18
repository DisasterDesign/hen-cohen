import type { Metadata } from "next";
import { locales, getMessages, getDirection, type Locale } from "@/lib/i18n";
import { playfairDisplay, inter, frankRuhlLibre, heebo } from "@/lib/fonts";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isHe = locale === "he";
  const baseUrl = "https://hencohen.com";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: isHe
        ? "חן כהן | במאית דוקומנטרית"
        : "Hen Cohen | Documentary Filmmaker",
      template: isHe ? "%s | חן כהן" : "%s | Hen Cohen",
    },
    description: isHe
      ? "חן כהן — במאית, צלמת קולנוע ועורכת. סרטים דוקומנטריים שנבנים מתוך קשב וכנות."
      : "Hen Cohen — Director, cinematographer and editor. Thoughtful documentary films shaped with care and honesty.",
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        he: `${baseUrl}/he`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      siteName: isHe ? "חן כהן" : "Hen Cohen",
      locale: isHe ? "he_IL" : "en_US",
      type: "website",
      url: `${baseUrl}/${locale}`,
    },
    icons: {
      icon: "/logo.svg",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const direction = getDirection(loc);
  const messages = getMessages(loc);

  const fontClasses = `${playfairDisplay.variable} ${inter.variable} ${frankRuhlLibre.variable} ${heebo.variable}`;

  return (
    <html lang={locale} dir={direction}>
      <body className={`${fontClasses} antialiased`}>
        <Navbar locale={loc} messages={messages.nav} />
        <PageTransition>
          {children}
        </PageTransition>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
