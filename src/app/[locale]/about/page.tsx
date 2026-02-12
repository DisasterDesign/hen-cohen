import { getMessages, type Locale } from "@/lib/i18n";
import AboutClient from "./AboutClient";
import Footer from "@/components/Footer";

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
