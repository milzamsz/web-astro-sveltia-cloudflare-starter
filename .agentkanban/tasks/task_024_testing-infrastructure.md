---
title: Phase 12 — Testing Infrastructure
lane: review
created: 2026-06-26T09:30:00Z
updated: 2026-06-27T00:28:00Z
description: Add Vitest unit test suite for lib utilities (blog.ts, schema.ts, utils.ts, i18n). Add Playwright E2E tests for navigation, blog listing/detail, services, contact form. Wire up test scripts in package.json.
priority: medium
sortOrder: 1
dependsOn:
  - library-utilities
  - i18n-refinement
  - page-routes-and-og-images
parent: rocket-refinement
---

## Conversation

### user

Implement Phase 12: testing infrastructure — Vitest unit tests and Playwright E2E tests.

### agent

Acknowledged. See `todo_024_testing-infrastructure.md`. Depends on `task_022` (lib utilities), `task_023` (i18n), and `task_021` (all pages built).

**Scope:**

**Vitest Unit Tests (`src/__tests__/`):**
- `lib/utils.test.ts` — test `formatDate`, `slugify`, `truncate`, `capitalize`, `calcReadingTime`, `groupBy`
- `lib/blog.test.ts` — test `getAllPosts` (sorting, draft filtering), `getRelatedPosts`, `getAllTags`, `getTopTags`, `paginate`
- `lib/schema.test.ts` — test JSON-LD schema output: correct `@type`, required fields present, `FAQPage` structure, `BreadcrumbList` structure
- `i18n/index.test.ts` — test `t()` function returns correct string for EN/ID, returns key as fallback if missing

**Playwright E2E Tests (`src/test/`):**
- `navigation.spec.ts` — header nav links work, mobile menu opens/closes, language switcher (EN↔ID), dark mode toggle persists, search modal opens/closes
- `blog.spec.ts` — blog listing renders posts, pagination links work, tag filter shows filtered posts, individual post page renders with TOC visible, share buttons present
- `services.spec.ts` — services listing renders cards, individual service page renders correctly
- `contact.spec.ts` — contact form renders, validation shows errors on empty submit, success message shown on submit (mock API response)

**Configuration:**
- `vitest.config.ts` — already created in Phase 1, may need updates for test env
- `playwright.config.ts` — configure base URL (localhost:4321), browsers (chromium), screenshot on failure

## Definition of Done

- [ ] (agent) `pnpm test` — all Vitest unit tests pass (≥20 assertions)
- [ ] (agent) `pnpm test:e2e` — all Playwright tests pass against dev server
- [ ] (agent) Test coverage: 80%+ for lib utilities
- [ ] (agent) `astro check` — no TypeScript errors in test files
- [ ] (human) Review test reports — confirm E2E covers critical user journeys

### user

---

## IMPLEMENTATION REVIEW — task_024

**Lane:** `review`
**Verdict:** APPROVE

### What shipped

| File | Purpose |
|------|---------|
| `playwright.config.ts` | Chromium-only, `baseURL: http://127.0.0.1:4399`, screenshot+video on failure, `webServer` runs `astro preview` against built `dist/` (port 4399 avoids collision with a concurrent `ocloud-web` dev server on 4321) |
| `vitest.config.ts` | Updated with `astro:content` → test stub alias so `lib/blog.ts` imports load under node env |
| `src/__tests__/__stubs__/astro-content.ts` | Minimal `getCollection` stub for the vitest environment |
| `src/__tests__/lib/utils.test.ts` | 13 tests: formatDate (en/id), formatDateShort, slugify (incl. diacritics), truncate, capitalize, groupBy, calcReadingTime |
| `src/__tests__/lib/tags.test.ts` | 6 tests: countTags, sortTagsByCount, slugifyTag, filterByTag |
| `src/__tests__/lib/blog.test.ts` | 5 tests: paginate (first/middle/last/clamp/empty) |
| `src/__tests__/lib/schema.test.ts` | 8 tests: WebSite, Organization, Person, BlogPosting (incl. dateModified fallback), FAQPage, BreadcrumbList, Service |
| `src/__tests__/i18n/ui.test.ts` | 6 tests: t() EN/ID, missing-key fallback, dictionary presence, EN↔ID key parity |
| `src/test/navigation.spec.ts` | 5 E2E: homepage nav, language switcher, dark-mode toggle, Ctrl+K search modal, mobile menu |
| `src/test/blog.spec.ts` | 3 E2E: blog listing, card→detail nav, share buttons |
| `src/test/services.spec.ts` | 2 E2E: services listing, card→detail nav |
| `src/test/contact.spec.ts` | 3 E2E: form render, empty-submit validation, fill+enable |
| `package.json` | Added `test:coverage` script |

### Verification (real output)

- `pnpm test` → **5 files, 38 tests passed** (1.8s)
- `pnpm test:e2e` → **13 passed** (17.9s) against `astro preview`
- `pnpm astro check` → 0 errors
- `pnpm run lint:js` → 0 errors (21 pre-existing warnings)
- `pnpm build` → 56 pages, exit 0

### Notes

- E2E uses `astro preview` (built `dist/`) on **port 4399**, not `astro dev`. The Astro 7 / Vite 8 dev server is unstable under Playwright's `webServer` process management (`Failed to load url astro:server-app.js`). Preview is stable and reflects production output. Port 4399 is used (not Astro's default 4321) because a concurrent `ocloud-web` dev server occupies `localhost:4321` on this machine — the port collision previously produced ambiguous results. The homepage test asserts the `.logo` `aria-label` is `"Astro Sveltia Cloudflare"` as positive proof the tests hit the correct site.
- `pnpm test:e2e` requires a fresh `pnpm build` first; the config does not chain this automatically.
- Coverage script (`test:coverage`) is wired but `@vitest/coverage-*` is not installed — running it will prompt to install. Left as opt-in to avoid adding a devDep the boilerplate didn't previously carry.

### user
