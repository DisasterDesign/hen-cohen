import type { Metadata } from "next";
import { locales, getMessages, getDirection, type Locale } from "@/lib/i18n";
// Font loaded via @font-face in globals.css
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ApertureCursor from "@/components/ApertureCursor";
import LoadingScreen from "@/components/LoadingScreen";
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
        ? "חן כהן | צלמת, במאית ועורכת דוקומנטרית"
        : "Hen Cohen | Documentary Filmmaker, Cinematographer & Editor",
      template: isHe ? "%s | חן כהן — צלמת ובמאית" : "%s | Hen Cohen — Filmmaker",
    },
    description: isHe
      ? "חן כהן — צלמת קולנוע, במאית דוקומנטרית ועורכת. סרטים דוקומנטריים, סרטי תדמית לארגונים וסיפורים אנושיים למותגים. הפקות וידאו מקצועיות בישראל."
      : "Hen Cohen — Israeli documentary filmmaker, cinematographer and editor. Professional video production: documentary films, nonprofit storytelling and branded human stories.",
    keywords: isHe
      ? ["חן כהן", "צלמת", "במאית", "צלמת דוקומנטרית", "במאית דוקומנטרית", "עורכת וידאו", "סרטים דוקומנטריים", "הפקת וידאו", "צלמת קולנוע", "סרטי תדמית", "צילום וידאו ישראל"]
      : ["Hen Cohen", "documentary filmmaker", "cinematographer", "video editor", "documentary films", "video production Israel", "nonprofit films", "branded content", "Israeli filmmaker"],
    authors: [{ name: isHe ? "חן כהן" : "Hen Cohen", url: baseUrl }],
    creator: isHe ? "חן כהן" : "Hen Cohen",
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
      title: isHe
        ? "חן כהן | צלמת, במאית ועורכת דוקומנטרית"
        : "Hen Cohen | Documentary Filmmaker, Cinematographer & Editor",
      description: isHe
        ? "צלמת קולנוע, במאית דוקומנטרית ועורכת. סרטים דוקומנטריים, סרטי תדמית וסיפורים אנושיים."
        : "Documentary filmmaker, cinematographer and editor. Documentary films, nonprofit storytelling and branded human stories.",
      images: [
        {
          url: "https://img.youtube.com/vi/GzucmfaxtoA/maxresdefault.jpg",
          width: 1280,
          height: 720,
          alt: isHe ? "חן כהן — צלמת ובמאית דוקומנטרית" : "Hen Cohen — Documentary Filmmaker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isHe
        ? "חן כהן | צלמת, במאית ועורכת דוקומנטרית"
        : "Hen Cohen | Documentary Filmmaker",
      description: isHe
        ? "צלמת קולנוע, במאית דוקומנטרית ועורכת. סרטים שנבנים מתוך קשב וכנות."
        : "Documentary filmmaker, cinematographer and editor. Thoughtful films shaped with care and honesty.",
      images: ["https://img.youtube.com/vi/GzucmfaxtoA/maxresdefault.jpg"],
    },
    icons: {
      icon: "/fabicon.svg",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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

  const fontClasses = "";
  const baseUrl = "https://hencohen.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: locale === "he" ? "חן כהן" : "Hen Cohen",
        url: baseUrl,
        jobTitle: locale === "he" ? "צלמת קולנוע, במאית דוקומנטרית ועורכת" : "Documentary Filmmaker, Cinematographer & Editor",
        description: locale === "he"
          ? "חן כהן — צלמת קולנוע, במאית דוקומנטרית ועורכת. סרטים דוקומנטריים, סרטי תדמית וסיפורים אנושיים."
          : "Hen Cohen — Documentary filmmaker, cinematographer and editor based in Israel.",
        sameAs: [
          "https://www.instagram.com/hen_ofir_cohen/",
          "https://www.facebook.com/hen.cohen.376",
        ],
        image: "https://img.youtube.com/vi/GzucmfaxtoA/maxresdefault.jpg",
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: locale === "he" ? "חן כהן — צלמת ובמאית דוקומנטרית" : "Hen Cohen — Documentary Filmmaker",
        publisher: { "@id": `${baseUrl}/#person` },
        inLanguage: [locale === "he" ? "he-IL" : "en-US"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        name: locale === "he" ? "חן כהן — הפקות וידאו" : "Hen Cohen — Video Production",
        provider: { "@id": `${baseUrl}/#person` },
        url: baseUrl,
        serviceType: locale === "he"
          ? ["צילום דוקומנטרי", "במאי סרטים", "עריכת וידאו", "סרטי תדמית", "הפקת וידאו"]
          : ["Documentary Filmmaking", "Cinematography", "Video Editing", "Nonprofit Films", "Branded Content"],
        areaServed: { "@type": "Country", name: "Israel" },
      },
    ],
  };

  return (
    <html lang={locale} dir={direction}>
      <body className={`${fontClasses} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar locale={loc} messages={messages.nav} />
        <PageTransition>
          {children}
        </PageTransition>
        <FloatingWhatsApp />
        <ApertureCursor />
        <LoadingScreen />
      </body>
    </html>
  );
}
