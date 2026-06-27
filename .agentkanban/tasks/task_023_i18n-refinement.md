---
title: Phase 11 — i18n Refinement
lane: done
created: 2026-06-26T09:30:00Z
updated: 2026-06-26T23:55:00Z
description: Expand i18n translation keys to cover all new components (blog, navigation, services, forms, pagination, a11y). Migrate inline ui.ts strings to en.json + id.json files. Update i18n/index.ts loader to use JSON files. Verify complete translation coverage EN/ID.
priority: medium
sortOrder: 1
dependsOn:
  - blog-and-service-page-components
  - layout-and-seo-components
parent: rocket-refinement
---

## Conversation

### user

### agent

Implemented the Phase 11 i18n pass and moved the task to `review`.

**Delivered:**
- Split the translation source into `src/i18n/en.json` and `src/i18n/id.json`, keeping the existing `t(locale, key)` API in `src/i18n/ui.ts`.
- Expanded coverage for the new blog, navigation, services, form, pagination, search, and accessibility strings.
- Updated the validator script to compare the JSON key sets directly and fail on drift.
- Localized the header, footer, search modal, blog card/hero/related posts/TOC/share actions, service card, pagination, and blog listing filters/empty states.
- Passed locale through the shared layout shell so the global skip link and search modal use translated strings.

**Verification:**
- `pnpm run validate:i18n` ✅
- `pnpm astro check` ✅
- `pnpm build` ✅

**Notes:**
- The content still has the expected unrelated build warning for the `/services/[slug]` route conflict.
- Indonesian strings were reviewed for coverage, but the remaining human check is still required for meaning/quality.

### user

### agent

### user

Implement Phase 11: i18n expansion for all new components and JSON-based translations.

### agent

Acknowledged. See `todo_023_i18n-refinement.md`. Depends on `task_018` and `task_020` (all new components that need translation strings).

**Scope:**

**New translation keys required across new components:**

Blog: `blog.readMore`, `blog.publishedOn`, `blog.updatedOn`, `blog.minuteRead`, `blog.minutesRead`, `blog.share`, `blog.shareVia`, `blog.copyLink`, `blog.copied`, `blog.tags`, `blog.toc`, `blog.relatedPosts`, `blog.noResults`, `blog.filterByTag`, `blog.allPosts`

Navigation: `nav.search`, `nav.openSearch`, `nav.toggleMenu`, `nav.openMenu`, `nav.closeMenu`, `nav.darkMode`, `nav.lightMode`

Services: `services.learnMore`, `services.viewAll`, `services.priceRange`, `services.features`, `services.tags`

Forms: `form.submit`, `form.sending`, `form.success`, `form.error`, `form.required`, `form.emailPlaceholder`, `form.messagePlaceholder`, `form.namePlaceholder`

General/a11y: `aria.skipToContent`, `aria.closeModal`, `aria.openMenu`, `aria.searchButton`, `pagination.prev`, `pagination.next`, `pagination.page`, `pagination.of`, `search.placeholder`, `search.noResults`, `search.loading`

**Migrate** all current inline `ui.ts` string maps to separate `src/i18n/en.json` and `src/i18n/id.json` files. Update `src/i18n/index.ts` (or `ui.ts`) to import and merge from JSON files. Add validation script `validate:i18n` to check that all keys present in `en.json` are also present in `id.json`.

## Definition of Done

- [ ] (agent) `src/i18n/en.json` and `src/i18n/id.json` exist with all keys
- [ ] (agent) `src/i18n/ui.ts` (or `index.ts`) loads from JSON files
- [ ] (agent) `pnpm run validate:i18n` passes — no missing ID keys
- [ ] (agent) All new component strings use `t(locale, 'key')` — no hardcoded EN strings
- [ ] (agent) `astro check` — no TypeScript errors
- [ ] (human) Verify Indonesian translations are meaningful (not placeholder strings)

### user

---

## PRODUCTION READINESS AUDIT — task_023 (consolidated Rocket Refinement epic audit)

**Env exercised:** local (Windows, Node 25.7, pnpm 8.15)

### Correctness
- [x] `src/i18n/en.json` + `id.json` exist; `ui.ts` imports JSON; `t(locale, key)` preserved
- [x] `pnpm run validate:i18n` → ✅ JSON files in sync, exit 0
- [x] `pnpm astro check` → 0 errors
- [x] `pnpm build` → 56 pages, exit 0
- [x] `pnpm run lint:js` → 0 errors
- [x] Behavior proven to RUN: localized routes `/id/*` and `/en/*` render translated chrome

### Security & reliability
- [x] No secrets / no mutations
- [N/A] Multi-tenant n/a

### Docs
- [x] memory.md records JSON i18n convention

### Verdict: PASS (human Indonesian meaning/quality check still open per DoD)

### user
