---
title: I18n Routing And Locale Governance
lane: done
created: 2026-06-24T10:00:00+07:00
updated: 2026-06-24T06:28:49.331Z
description: Add bilingual routing, translation contracts, locale-aware metadata, and validation for Indonesian and English content.
labels: []
sortOrder: 0
priority: critical
dependsOn:
  - astro-foundation-and-design-system
change: .agentkanban/changes/i18n-routing-and-locale-governance
spec: .agentkanban/specs/i18n-routing-and-locale-governance/spec.md
evidence:
  build:
    ran: true
    passed: true
  behavior:
    ran: true
    passed: true
parent: astro-sveltia-cloudflare-mvp
blockerResolved: true
---

## Conversation

### user

Implement Plan

### agent

Working in `task_003_i18n-routing-and-locale-governance.md`.

Added root docs `TECHNICAL.md` and `ARCHITECTURE.md` to capture honest current-state implementation details and the target architecture split from `PLAN.md`. Also refreshed `.agentkanban/memory.md` so future tasks no longer treat the repo as scaffolding-only.

This was a documentation sync only. No application behavior changed, so no new build, lint, or behavior evidence was required for the i18n capability itself.

### user

Plan and deliver the multilingual routing and locale governance slice from `PLAN.md` phase 2.

### agent

Working in `task_003_i18n-routing-and-locale-governance.md`. Planning artifacts are ready for `id` and `en` routing, language switching, canonical and hreflang generation, and translation validation. This task is in `planning` pending approval and depends on task 002.

### user

### agent

## Plan-review gate (critical) — REVISE

**Independent reviewer verdict:** `revise` (7 gaps identified)

**Revision applied:** design.md and tasks.md revised to address all 7 gaps. Blocker resolved.

### agent

## Implementation — I18n Routing And Locale Governance

**Files created/updated:**
- `astro.config.ts` — added top-level `i18n` config (`defaultLocale: "id"`, `prefixDefaultLocale: true`), Starlight locales removed (uses Astro i18n)
- `src/i18n/ui.ts` — translation dictionaries for `id`/`en` (UI chrome, hero, footer, locale switch)
- `src/i18n/routes.ts` — route helpers: `localePrefix()`, `resolveRoute()`, `stripLocale()`, `detectLocale()`
- `src/i18n/switcher.ts` — `getEquivalentPath()` for equivalent-content routing across locales
- `src/lib/seo.ts` — updated `canonicalUrl()`, `hreflangLinks()` to handle i18n prefix routing
- `src/components/Header.astro` — updated to use `getEquivalentPath()` + `resolveRoute()` + `t()`
- `src/pages/index.astro` — updated to use translation dictionaries and locale-prefixed routes
- `src/layouts/BaseLayout.astro` — passes `currentPath` to Header
- `scripts/validate-i18n.js` — new validation script (checks file existence, translation coverage)
- `package.json` — added `type: "module"`, `validate:i18n` script, integrated into `lint`

**Verification:**
- ✅ `pnpm run build` → 2 pages built in 1.90s
- ✅ `node scripts/validate-i18n.js` → "I18n validation passed"
- ✅ Sitemap created with i18n config

**Implementation-review verdict:** All spec requirements satisfied — core routes support both locales, equivalent-content switching implemented, validation commands in place. Moving to `review` gate.

### user
