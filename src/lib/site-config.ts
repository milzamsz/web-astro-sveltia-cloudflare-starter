export type Locale = "id" | "en";

export const SITE_CONFIG = {
  /** Base site URL (no trailing slash). Update in production. */
  url: "https://example.com",
  /** Default locale for fallback. */
  defaultLocale: "en" as const,
  /** Supported locales. */
  locales: ["en", "id"] as const,
  /** Human-readable locale labels. */
  localeLabels: {
    en: "English",
    id: "Indonesia",
  } as const,
  /** Short locale codes for URL prefixes. */
  localePrefixes: {
    en: "en",
    id: "id",
  } as const,
  /** Site name for metadata and JSON-LD. */
  name: "Astro Sveltia Cloudflare",
  /** Short description for metadata. */
  description: "Multilingual marketing website boilerplate.",
} as const;


