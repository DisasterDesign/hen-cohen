import { getMessages, type Locale } from "@/lib/i18n";
import HeroSection from "@/components/home/HeroSection";
import SelectedWorkSection from "@/components/home/SelectedWorkSection";
import CollaborationSection from "@/components/home/CollaborationSection";
import QuoteSection from "@/components/home/QuoteSection";
import Footer from "@/components/Footer";

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
