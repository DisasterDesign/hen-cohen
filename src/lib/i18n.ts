import heMessages from "../../messages/he.json";
import enMessages from "../../messages/en.json";

export const locales = ["he", "en"] as const;
export const defaultLocale = "he";

export type Locale = (typeof locales)[number];

export type Messages = typeof heMessages;

const messages: Record<Locale, Messages> = {
  he: heMessages,
  en: enMessages,
};

export function getMessages(locale: Locale): Messages {
  return messages[locale] || messages[defaultLocale];
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}
