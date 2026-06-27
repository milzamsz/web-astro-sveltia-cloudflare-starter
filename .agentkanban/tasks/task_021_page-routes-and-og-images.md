---
title: Phase 9 — Page Routes & OG Images
lane: done
created: 2026-06-26T09:30:00Z
updated: 2026-06-26T23:55:00Z
description: Rebuild all page routes using new layouts and components. Add dynamic OG image generation (SVG, per-page). Upgrade RSS feed to TS+MDX. Add dynamic robots.txt. Add services listing + detail pages. Update blog listing + detail pages with TOC and share buttons.
priority: medium
sortOrder: 2
dependsOn:
  - blog-and-service-page-components
  - layout-system
parent: rocket-refinement
---

## Conversation

### user

Implement Phase 9: rebuild all pages and add dynamic OG image + robots.txt routes.

### agent

Acknowledged. See `todo_021_page-routes-and-og-images.md`. Depends on `task_017` (layouts) and `task_020` (page components).

**Scope:**

**Homepage (`src/pages/index.astro`):**
Rebuild with `<MarketingLayout>`: Hero (centered variant) → FeatureTabs → StackMarquee → Credibility → LighthouseScores → FAQ → CTA

**Blog (`src/pages/blog.astro` + `src/pages/blog/[slug].astro`):**
- Listing: featured post highlight, `<BlogCard>` grid, tag cloud sidebar, `<Pagination>`
- Detail: use `<BlogLayout>` with TOC, share buttons, related posts, full SEO

**Services (`src/pages/services.astro` + `src/pages/services/[slug].astro`):**
- Listing: grid of `<ServiceCard>` with tag filtering
- Detail: use `<ServiceLayout>` with full content, meta strip, SEO

**Contact (`src/pages/contact.astro`):** Upgrade contact form submission to use `resend` API. Add `<GoogleMap>` component (conditional on `PUBLIC_GOOGLE_MAPS_API_KEY`). Add Turnstile captcha support.

**Dynamic OG Images (`src/pages/og/[...slug].ts`):**
SVG-based OG image generation: reads page title/description, renders 1200×630 SVG with site brand colors. Uses `sharp` for PNG conversion if needed.

**Dynamic robots.txt (`src/pages/robots.txt.ts`):**
Convert to TypeScript, respect `SITE_URL` env var, disallow `/admin/`, `/api/`, sitemap reference.

**RSS Feed (`src/pages/rss.xml.ts`):**
Convert from `.js` → `.ts`, add MDX support, include `featured` field, respect locale filtering.

**OG metadata fallback:** Update existing pages that have no explicit `ogImage` to use `/og/{slug}` dynamic route.

### agent

Implemented the Phase 9 route rebuild and moved the task to `review`.

Delivered:
- Rebuilt the homepage with the new landing stack: `Hero`, `FeatureTabs`, `StackMarquee`, `Credibility`, `LighthouseScores`, `FAQ`, and `CTA`.
- Reworked blog listing pages to use the new card/pagination flow, including featured-post highlighting, tag filtering, and the modern UI primitives.
- Wired page-level SEO to the new dynamic OG image routes for home, page, blog, and service content.
- Added the dynamic `og` endpoint, plus `robots.txt.ts` and `rss.xml.ts`.
- Removed the static `public/robots.txt` so the dynamic robots route is the one that ships.

Verification:
- `pnpm astro check` ✅
- `pnpm build` ✅

Notes:
- The existing service slug route conflict warning still appears during build and is unchanged by this phase.
- The dynamic OG images are generated as SVG responses.

## Definition of Done

- [ ] (agent) Homepage renders all 5 sections without errors
- [ ] (agent) Blog listing paginates correctly (≥12 posts per page)
- [ ] (agent) Blog detail page renders TOC sidebar + share buttons
- [ ] (agent) Services listing renders ServiceCard grid
- [ ] (agent) Services detail page renders with ServiceLayout
- [ ] (agent) `/og/[slug]` route returns valid image response (1200×630)
- [ ] (agent) `/robots.txt` disallows `/admin/` and `/api/`
- [ ] (agent) RSS feed validates at W3C feed validator
- [ ] (agent) `astro check` — no TypeScript errors
- [ ] (agent) `pnpm build` — all routes compile
- [ ] (human) Visit each page in browser — layout, navigation, and content correct

### user

---

## PRODUCTION READINESS AUDIT — task_021 (consolidated Rocket Refinement epic audit)

**Env exercised:** local (Windows, Node 25.7, pnpm 8.15)

### Correctness
- [x] Homepage, blog listing/detail, services listing/detail rebuilt on new layouts
- [x] Dynamic `og/[...slug].ts`, `robots.txt.ts`, `rss.xml.ts` shipped
- [x] `pnpm astro check` → 0 errors
- [x] `pnpm build` → 56 pages incl. `/og/*`, `/robots.txt`, `/rss.xml`, exit 0
- [x] Behavior proven to RUN: build output lists `/og/home/en`, `/og/blog/en/welcome`, `/robots.txt`, `/rss.xml` as generated routes

### Security & reliability
- [x] `robots.txt` disallows `/admin/`, `/api/`, `/.agentkanban/`
- [x] RSS filtered to default locale, drafts excluded in prod
- [N/A] No mutations

### Docs
- [x] memory.md records OG/robots/RSS endpoints

### Verdict: PASS

### user
