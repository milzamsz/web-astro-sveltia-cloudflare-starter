# Design: I18n Routing And Locale Governance

## Architecture

Use Astro's native i18n routing (`i18n` config in `astro.config.ts`) for marketing pages, alongside Starlight's independent locale config for `/docs`. Two separate i18n systems that must coexist without route collisions.

## Components And Boundaries

- **Astro i18n config** — top-level `i18n` for marketing routes (`/id/*`, `/en/*`), separate from Starlight's `locales` for `/docs`.
- **Locale config and route helpers** — `src/i18n/routes.ts`: prefix resolution, equivalent-content mapping, path normalization.
- **Translation dictionaries** — `src/i18n/ui.ts`: UI chrome strings for `id`/`en` (navigation, footer, forms).
- **Equivalent-content switcher** — `src/i18n/switcher.ts`: resolves `/id/services` → `/en/services` via translation key mapping.
- **Validation scripts** — `scripts/validate-i18n.ts`: fails build on missing locale pairs for pages, blog, docs.
- **Locale-aware SEO helpers** — extend `src/lib/seo.ts` with Astro i18n prefix handling.

## Interfaces And Contracts

- **Route resolution**: `resolveRoute(locale, path)` → localized path with correct prefix.
- **Equivalent content**: `getEquivalentPath(currentPath, targetLocale)` → `/id/blog/post` → `/en/blog/post`.
- **Language switcher**: Header component calls `getEquivalentPath()` to preserve context when switching.
- **Sitemap**: `@astrojs/sitemap` with `i18n` option generates `<xhtml:link rel="alternate" hreflang="..." />` per URL per locale.
- **Validation**: Build-time check scans `src/pages/**` and `src/content/**` for required locale pairs; fails on missing translations.

## Data Flow

1. `astro.config.ts` `i18n` config → Astro generates localized routes for marketing pages.
2. `src/i18n/routes.ts` helpers → used by Header, BaseLayout, sitemap, validation.
3. Content collections + translation keys → validation script verifies pairs exist.
4. Sitemap generation → includes hreflang annotations from helpers.

## Storage And Migrations

- No database impact.
- File-based translations and content metadata only.
- Translation keys in frontmatter for content items.

## Security Model

- Locale cookies may influence redirect or preference behavior later, but must not bypass explicit URLs.

## Error And Failure Handling

- Missing required translations fail validation (build error with actionable message).
- Pages without equivalents return the locale home or configured fallback strategy explicitly, never silently.

## Environment Behavior

- Local, preview, and production share the same locale rules.

## Backward Compatibility

- Locale helpers must accommodate future locales without breaking `id` and `en`.

## Rollback Strategy

- Locale routing stays isolated in config and helper modules.

## Testing Approach

- Route generation tests for `/id/*` and `/en/*`.
- hreflang and canonical assertions.
- Validation tests for missing or duplicate translation mappings.
- Equivalent-content switching verification.

## Affected Areas

- `astro.config.ts` — add top-level `i18n` config.
- `src/i18n/` — new: `ui.ts`, `routes.ts`, `switcher.ts`.
- `src/lib/seo.ts` — extend `canonicalUrl`, `hreflangLinks` for i18n prefix handling.
- `src/components/Header.astro` — use equivalent-content switcher.
- `scripts/validate-i18n.ts` — new validation script.
- `package.json` — add `validate:i18n` script.
