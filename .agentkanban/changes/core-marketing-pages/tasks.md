# Tasks

## Pre-work: Content models
- [x] Add `pages` and `services` content collections to `src/content.config.ts`
  - [x] `pages` schema: `locale`, `slug`, `title`, `description`, `sections`, `isLegal`, `order`, `translationKey`
  - [x] `services` schema: `locale`, `slug`, `title`, `description`, `features`, `priceRange`, `order`, `translationKey`
  - [x] Create sample content files for about, services, pricing, contact, legal pages

## Fix existing i18n gaps
- [x] Update `Footer.astro` to use `t(locale, "footer.privacy")` / `t(locale, "footer.terms")`
  - [x] Add `footer.privacy` and `footer.terms` translation keys to `src/i18n/ui.ts`
  - [x] Use `resolveRoute(locale, "/privacy")` / `resolveRoute(locale, "/terms")` for footer links
- [x] Refactor `src/pages/index.astro` to use `Hero` component instead of inline hero styles
- [x] Add `jsonLdOrganization`, `jsonLdService`, `jsonLdFAQ`, `jsonLdBreadcrumb` helpers to `src/lib/seo.ts`

## Build page routes
- [x] Create `src/pages/about.astro` (uses `pages` collection)
- [x] Create `src/pages/services.astro` (lists from `services` collection)
- [x] Create `src/pages/services/[slug].astro` (detail from `services` collection)
- [x] Create `src/pages/pricing.astro`
- [x] Create `src/pages/contact.astro` (maps/form placeholder)
- [x] Create `src/pages/privacy.astro`
- [x] Create `src/pages/terms.astro`
- [x] Each page uses `BaseLayout`, `Header currentPath={path}`, locale-prefixed navigation via `resolveRoute()`

## Reusable components
- [x] `src/components/Hero.astro` — reusable hero with locale support
- [x] `src/components/CTA.astro` — call-to-action block
- [x] `src/components/FeatureGrid.astro` — feature grid with icon slots
- [x] `src/components/FAQ.astro` — FAQ accordion with `jsonLdFAQ` schema markup
- [x] `src/components/TrustBlock.astro` — trust indicators / logos

## Verification
- [x] Build passes: `pnpm run build`
- [x] All pages render in both `/id/*` and `/en/*`
- [x] i18n validation passes: `pnpm run validate:i18n`
- [x] Footer links use correct locale-prefixed URLs
- [x] Structured data present on all applicable pages
