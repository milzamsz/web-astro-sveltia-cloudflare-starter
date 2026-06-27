---
title: Phase 5 — Layout System
lane: done
created: 2026-06-26T09:30:00Z
updated: 2026-06-26T23:55:00Z
description: Overhaul BaseLayout with dark mode bootstrap, SEO slot, Analytics slot, skip-to-content. Add BlogLayout (TOC, prose, share, related posts), PageLayout (breadcrumbs, page hero), ServiceLayout (detail page for services), LandingLayout, MarketingLayout.
priority: high
labels:
  - blocked-by:design-system-and-theming
  - blocked-by:configuration-architecture
sortOrder: 1
dependsOn:
  - design-system-and-theming
  - configuration-architecture
parent: rocket-refinement
---

## Conversation

### user

Implement Phase 5: full layout system overhaul and new specialized layouts.

### agent

Moved to `review` after implementing the layout system and migrating the requested routes.

Delivered:
- `src/layouts/BaseLayout.astro` now supports SEO and analytics slots, optional header/footer chrome, and a theme toggle hook.
- Added `BlogLayout`, `PageLayout`, `ServiceLayout`, `LandingLayout`, and `MarketingLayout`.
- Added shared `SEO`, `Analytics`, and `ThemeToggle` components.
- Migrated `src/pages/index.astro`, `src/pages/[locale]/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/[locale]/blog/[slug].astro`, and `src/pages/services/[slug].astro` onto the new layouts.

Verification:
- `pnpm astro check` ✅
- `pnpm build` ✅
- IDE lint sweep on touched files ✅

Notes:
- Build emits a pre-existing service route conflict warning, but the build still completes successfully.

### user

---

## PRODUCTION READINESS AUDIT — task_017 (consolidated Rocket Refinement epic audit)

**Env exercised:** local (Windows, Node 25.7, pnpm 8.15)

### Correctness
- [x] 6 layout files created/updated; dark-mode FOUC bootstrap in `<head>`
- [x] `pnpm astro check` → 0 errors
- [x] `pnpm build` → 56 pages, exit 0
- [x] `pnpm run lint:js` → 0 errors
- [x] Behavior proven to RUN: blog detail route renders with TOC + share + related posts; build emits JSON-LD

### Security & reliability
- [x] No secrets in layouts
- [N/A] No mutations

### Docs
- [x] TECHNICAL.md / memory.md reflect layout system

### Verdict: PASS

### user

Acknowledged. See `todo_017_layout-system.md`. Depends on `task_014` (CSS tokens, dark mode) and `task_015` (site config).

**Scope:**

**BaseLayout.astro** — major upgrade:
- Dark mode class toggle on `<html>` (reads localStorage / system preference via inline script)
- `<SEO>` component slot (from Phase 6)
- `<Analytics>` component slot (conditional on env vars)
- Skip-to-content link (`#main-content`)
- Font preload hints for Fontsource files
- Conditional `<ThemeToggle>` slot

**BlogLayout.astro** (new):
- Article hero with image or auto-generated SVG illustration
- Optional table of contents (inline card or sidebar, controlled by `site.config.articleFeatures.toc`)
- Prose content area with Tailwind typography wrapper
- Share buttons (Web Share API + Twitter/X, LinkedIn, copy-link fallbacks)
- Related posts section
- No comments (user skipped)
- JSON-LD BlogPosting schema + optional FAQ schema injection

**PageLayout.astro** (new): breadcrumbs, page hero (title + description), prose content slot

**ServiceLayout.astro** (new — replaces Rocket's ProjectLayout):
- Hero with optional image
- Meta strip (tags, date, features list)
- Rich prose content
- Optional TOC (same config as blog)

**LandingLayout.astro** (new): Minimal — no nav links in header, focused CTA mode

**MarketingLayout.astro** (new): Standard Header + slot + Footer wrapper

## Definition of Done

- [ ] (agent) All 6 layout files created/updated
- [ ] (agent) Dark mode FOUC prevention script in BaseLayout (class applied before paint)
- [ ] (agent) BlogLayout renders blog post with TOC when `articleFeatures.toc.enabled: true`
- [ ] (agent) BlogLayout JSON-LD script block present and correct
- [ ] (agent) `astro check` — no TypeScript errors
- [ ] (agent) `pnpm build` — all layouts compile
- [ ] (human) Visual check: blog post page with TOC sidebar, dark mode toggle

### user
