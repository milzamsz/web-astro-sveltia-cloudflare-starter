---
title: Phase 3 — Configuration Architecture
lane: done
created: 2026-06-26T09:30:00Z
updated: 2026-06-26T23:55:00Z
description: Centralize site, i18n, nav, and consent configuration into src/config/. Port Rocket's typed SiteConfig interface. Refactor existing lib/site-config.ts to re-export from the new config files for backward compat.
priority: high
labels: []
sortOrder: 1
dependsOn:
  - tooling-and-integrations-upgrade
parent: rocket-refinement
---

## Conversation

### user

Implement Phase 3: centralized configuration architecture following Rocket's pattern.

### agent

Acknowledged. See `todo_015_configuration-architecture.md`. Depends on `task_013` (typed env imports via `astro:env/server`).

**Scope:**

- `src/config/site.config.ts` — full typed `SiteConfig` interface + singleton. Fields: name, description, url, ogImage, author, email, phone, address, socialLinks, header.showSocialLinks, twitter, verification (google/bing from env), authorImage, blogImageOverlay, articleFeatures.toc (enabled, layout, sidebarPosition, minHeadings, maxDepth), articleFeatures.comments (disabled — user chose to skip), blog (postsPerPage, tagCloudLimit), services (perPage, tagCloudLimit — replaces Rocket's "projects"), i18n (delegates to i18n.config.ts), branding (logo, favicon, colors)
- `src/config/i18n.config.ts` — typed `I18nConfig` interface, enabled toggle, locales array, defaultLocale, routing options; current EN/ID locale pair
- `src/config/nav.config.ts` — typed nav items with optional children (dropdowns), external flag, icon name; extracted from hardcoded `Header.astro` nav links
- `src/config/consent.config.ts` — GDPR consent config (PUBLIC_CONSENT_ENABLED, PUBLIC_PRIVACY_POLICY_URL from env)
- `src/lib/site-config.ts` — refactored to re-export `SITE_CONFIG` from `src/config/site.config.ts`; preserve existing named exports for backward compat

**Note:** "projects" is renamed to "services" throughout this config to match the boilerplate's domain.

## Definition of Done

- [x] (agent) `src/config/site.config.ts` exports typed `SiteConfig` interface and default singleton
- [x] (agent) `src/config/i18n.config.ts` exports `I18nConfig` with EN/ID locales
- [x] (agent) `src/config/nav.config.ts` exports typed nav tree
- [x] (agent) `src/config/consent.config.ts` exports consent config
- [x] (agent) `src/lib/site-config.ts` re-exports `SITE_CONFIG` — existing components compile without changes
- [x] (agent) `astro check` — no TypeScript errors
- [x] (human) Review `site.config.ts` singleton values for business accuracy

### user


---

## IMPLEMENTATION REVIEW — task_015

**Lane:** `review`
**Verdict:** APPROVE

### Evidence

**Build:** `pnpm run build` → exit 0, 55 pages, Pagefind indexes 56 files (15.41s)
**Type check:** `astro check` → 0 errors
**Lint:** `pnpm run lint:js` → 0 errors (only pre-existing warnings)
**Tests:** `pnpm run test` → 1/1 passed

### What shipped

| File | Purpose |
|------|---------|
| `src/config/site.config.ts` | Typed `SiteConfig` interface + singleton (core metadata, social, header, verification, OG, blog, services, article features, branding, i18n) |
| `src/config/i18n.config.ts` | Typed `I18nConfig` (enabled, locales, defaultLocale, routing) |
| `src/config/nav.config.ts` | Typed `NavItem`, `mainNav` (6 items), `footerNav` (3 sections: product/legal/social), `getFooterNav()` helper |
| `src/config/consent.config.ts` | Typed `ConsentConfig` (master switch + privacy URL) |
| `src/lib/site-config.ts` | Backward-compatible re-export (existing components unchanged) |
| `src/components/Header.astro` | Updated to consume `mainNav` from nav.config instead of hardcoded array |
| `src/components/Footer.astro` | Updated to consume `footerNav.legal` from nav.config |

### DoD Checklist

- [x] `src/config/site.config.ts` exports typed `SiteConfig` interface and default singleton
- [x] `src/config/i18n.config.ts` exports `I18nConfig` with EN/ID locales
- [x] `src/config/nav.config.ts` exports typed nav tree
- [x] `src/config/consent.config.ts` exports consent config
- [x] `src/lib/site-config.ts` re-exports — existing components compile without changes
- [x] `astro check` — 0 TypeScript errors

### No blockers

All implementation is complete and verified. Backward compatibility confirmed — all 11 consumer files continue to compile.

### user

---

## PRODUCTION READINESS AUDIT — task_015 (consolidated Rocket Refinement epic audit)

**Env exercised:** local (Windows, Node 25.7, pnpm 8.15)

### Correctness
- [x] Checklist + spec acceptance criteria met
- [x] `pnpm astro check` → 0 errors, 94 hints (zod deprecation hints, pre-existing) — exit 0
- [x] `pnpm build` → 56 pages, exit 0 (16s)
- [x] `pnpm run lint:js` → 0 errors, 21 pre-existing warnings
- [x] Behavior proven to RUN: build emits all config-driven routes (EN/ID), OG endpoints, sitemap, robots, rss

### Security & reliability
- [x] No secrets in code (config reads from `astro:env/server` typed imports)
- [x] No mock fallback in exercised path
- [N/A] Multi-tenant / org-scoping (static marketing site, no DB queries in this task)

### Docs (honest-state)
- [x] TECHNICAL.md reflects centralized `src/config/` architecture
- [x] memory.md records config convention

### Verdict: PASS

### user
