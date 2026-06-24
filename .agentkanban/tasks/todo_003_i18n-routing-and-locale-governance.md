# Todo: I18n Routing And Locale Governance

## Iteration 1 — Completed

- [x] Configure Astro i18n for `id` and `en` with stable localized route rules.
  - [x] Add top-level `i18n` config to `astro.config.ts` (separate from Starlight locale config)
  - [x] Set `defaultLocale: "id"`, `prefixDefaultLocale: true` for `/id/*` and `/en/*` routing
  - [x] Update `src/pages/index.astro` to use locale-prefixed routing
- [x] Add translation dictionaries, locale helpers, and a language switcher contract.
  - [x] Create `src/i18n/ui.ts` with translation dictionaries for `id` and `en` UI chrome
  - [x] Create `src/i18n/routes.ts` with route helpers (prefix resolution, equivalent content mapping)
  - [x] Create `src/i18n/switcher.ts` with `getEquivalentPath(currentPath, targetLocale)` resolver
- [x] Extend canonical, hreflang, sitemap, and RSS generation for locale awareness.
  - [x] Update `src/lib/seo.ts` `canonicalUrl` and `hreflangLinks` to handle Astro i18n prefix routing
  - [x] Update `astro.config.ts` sitemap with `i18n` option for hreflang annotations
  - [x] Update `Header.astro` to use `getEquivalentPath()` for equivalent-content switching
- [x] Define missing-translation behavior and implement validation commands.
  - [x] Create `scripts/validate-i18n.js` to scan translations and required files
  - [x] Add `validate:i18n` script to `package.json`
  - [x] Integrate validation into `lint` script to fail build on missing translations
- [x] Verify equivalent-content switching and route integrity for core paths.
  - [x] Verify build passes: ✅ 2 pages built in 1.90s
  - [x] Verify i18n validation: ✅ passed
  - [x] Verify sitemap created with i18n config
