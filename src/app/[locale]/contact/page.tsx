import { getMessages, type Locale } from "@/lib/i18n";
import ContactClient from "./ContactClient";
import Footer from "@/components/Footer";

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
