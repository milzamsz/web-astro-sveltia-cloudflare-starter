export type Locale = "id" | "en";

export const SITE_CONFIG = {
  /** Base site URL (no trailing slash). Update in production. */
  url: "https://example.com",
  /** Default locale for fallback. */
  defaultLocale: "id" as const,
  /** Supported locales. */
  locales: ["id", "en"] as const,
  /** Human-readable locale labels. */
  localeLabels: {
    id: "Indonesia",
    en: "English",
  } as const,
  /** Short locale codes for URL prefixes. */
  localePrefixes: {
    id: "id",
    en: "en",
  } as const,
  /** Site name for metadata and JSON-LD. */
  name: "Astro Sveltia Cloudflare",
  /** Short description for metadata. */
  description: "Multilingual marketing website boilerplate.",
} as const;


