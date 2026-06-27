import type { Locale } from "../lib/site-config";
import en from "./en.json";
import id from "./id.json";

export type TranslationDict = Record<string, string>;

export const translations: Record<Locale, TranslationDict> = {
  id,
  en,
};

/**
 * Get a translated string for the given locale and key.
 * Falls back to the key itself if not found (fail loud during dev).
 */
export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? key;
}
