import type { Locale } from "../lib/site-config";

export type TranslationDict = Record<string, string>;

/**
 * UI chrome translations for Indonesian and English.
 * Keyed by semantic IDs — add new entries as needed.
 */
export const translations: Record<Locale, TranslationDict> = {
  id: {
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.services": "Layanan",
    "nav.pricing": "Harga",
    "nav.blog": "Blog",
    "nav.contact": "Kontak",
    "nav.docs": "Dokumentasi",
    "hero.title": "Website Siap Produksi",
    "hero.subtitle": "Astro + Sveltia CMS + Cloudflare. Multilingual dari hari pertama.",
    "hero.cta": "Lihat Layanan",
    "footer.tagline": "Boilerplate multilingual untuk website marketing modern.",
    "footer.privacy": "Kebijakan Privasi",
    "footer.terms": "Syarat & Ketentuan",
    "skip.content": "Langsung ke konten",
    "notfound.title": "Halaman Tidak Ditemukan",
    "notfound.desc": "Halaman yang Anda cari tidak ditemukan.",
    "notfound.back": "Kembali ke Beranda",
    "locale.switch": "EN",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.docs": "Documentation",
    "hero.title": "Production-Ready Website",
    "hero.subtitle": "Astro + Sveltia CMS + Cloudflare. Multilingual from day one.",
    "hero.cta": "View Services",
    "footer.tagline": "Multilingual boilerplate for modern marketing websites.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    "skip.content": "Skip to content",
    "notfound.title": "Page Not Found",
    "notfound.desc": "The page you are looking for could not be found.",
    "notfound.back": "Back to Home",
    "locale.switch": "ID",
  },
};

/**
 * Get a translated string for the given locale and key.
 * Falls back to the key itself if not found (fail loud during dev).
 */
export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? key;
}
