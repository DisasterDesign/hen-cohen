import { getMessages, type Locale } from "@/lib/i18n";
import WorkGridClient from "./WorkGridClient";
import Footer from "@/components/Footer";

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
