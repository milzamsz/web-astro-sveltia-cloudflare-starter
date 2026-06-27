---
title: Phase 8 — Blog & Service Page Components
lane: done
created: 2026-06-26T09:30:00Z
updated: 2026-06-26T23:55:00Z
description: Build blog-specific components (BlogCard, ArticleHero, TOC, ShareButtons, RelatedPosts, TagList, BlogPagination, BlogImageSVG). Build Hero component with variants. Build landing/marketing page components (FeatureTabs React, StackMarquee, TechStack, LighthouseScores, Credibility). Build ServiceCard.
priority: medium
sortOrder: 1
dependsOn:
  - ui-component-library
  - content-collections-extension
parent: rocket-refinement
---

## Conversation

### user

Implement Phase 8: blog, hero, service page, and landing section components.

### agent

Acknowledged. See `todo_020_blog-service-page-components.md`. Depends on `task_019` (UI primitives) and `task_016` (collections).

**Scope:**

**Hero (`src/components/hero/`):**
- `Hero.astro` — multi-variant (centered, split, minimal); eyebrow badge, headline (h1), subheadline, CTA pair (primary + secondary `<Button>`), hero image/illustration slot; `size` prop (sm, md, lg)

**Blog Components (`src/components/blog/`):**
- `BlogCard.astro` — post card with: optional image / SVG illustration, title, excerpt (truncated), author avatar, publish date, reading time estimate, tag list; hover state; grid/list layout variants
- `ArticleHero.astro` — hero section for blog post page: image + headline + author + date + reading time + tag list
- `TableOfContents.astro` — auto-generated TOC from headings; inline card (default) or sticky sidebar; `minHeadings` + `maxDepth` from `site.config`; smooth-scroll on click; active heading highlight via IntersectionObserver
- `ShareButtons.astro` — Web Share API button + Twitter/X, LinkedIn, copy-link icon buttons; share count not required
- `RelatedPosts.astro` — 2–3 related posts grid by shared tags; `<BlogCard>` inside
- `TagList.astro` — clickable tag chips; links to `/blog?tag=<slug>` for filtering
- `BlogImageSVG.astro` — auto-generated SVG post illustration (pattern-based from `svgSlug` or post title hash)
- Blog pagination: reuse `<Pagination>` from UI library

**Service Components (`src/components/services/` — replaces Rocket's project components):**
- `ServiceCard.astro` — card for services listing: title, description, tags, priceRange, CTA link; hover lift

**Landing / Marketing Section Components (`src/components/landing/`):**
- `FeatureTabs.tsx` — animated tabbed features showcase (React component; each tab: icon, heading, description, screenshot/illustration)
- `StackMarquee.astro` — infinite scrolling tech stack marquee using `stack` collection icons + names
- `TechStack.astro` — static grid view of stack collection
- `LighthouseScores.astro` — Lighthouse performance badge display (Performance, Accessibility, Best Practices, SEO — static values from config)
- `Credibility.astro` — trust signals section (client logos, stat counters, short testimonials)

## Definition of Done

- [ ] (agent) All blog components created; `BlogCard` renders correctly with/without image
- [ ] (agent) `TableOfContents` highlights active heading during scroll
- [ ] (agent) `Hero.astro` renders all 3 variants (centered, split, minimal)
- [ ] (agent) `FeatureTabs.tsx` (React) renders and tab-switches without errors
- [ ] (agent) `StackMarquee` reads from `stack` collection and animates
- [ ] (agent) `ServiceCard` renders service entries correctly
- [ ] (agent) `astro check` — no TypeScript errors
- [ ] (agent) `pnpm build` — all components compile
- [ ] (human) Visual check: BlogCard, Hero variants, FeatureTabs, StackMarquee

### user

### agent

Phase 8 is implemented and ready for review.

Delivered:
- Added the `hero/` component family with variant-aware `Hero.astro`, a small variant map, and backward-compatible support for the existing hero API.
- Added blog components for article hero, blog cards, tag chips, TOC, share actions, related posts, and deterministic SVG illustrations.
- Added the `services/ServiceCard.astro` component and wired the services listing pages to use it.
- Added landing components for `FeatureTabs` (React), `StackMarquee`, `TechStack`, `LighthouseScores`, and `Credibility`.
- Updated `BlogLayout.astro` to use the new blog components, and kept the existing blog route behavior intact.

Verification:
- `pnpm astro check` ✅
- `pnpm build` ✅
- Lint sweep on touched files ✅

Notes:
- The existing `/services/[slug]` route conflict warning still appears during build, but the build completes successfully.
- The new landing components are implemented and build-verified; they can be surfaced in the next UI pass if desired.

### user

---

## PRODUCTION READINESS AUDIT — task_020 (consolidated Rocket Refinement epic audit)

**Env exercised:** local (Windows, Node 25.7, pnpm 8.15)

### Correctness
- [x] Hero variants, blog components, ServiceCard, landing components (FeatureTabs React, StackMarquee, TechStack, LighthouseScores, Credibility) all ship
- [x] `pnpm astro check` → 0 errors
- [x] `pnpm build` → 56 pages, exit 0
- [x] `pnpm run lint:js` → 0 errors
- [x] Behavior proven to RUN: homepage renders Hero + FeatureTabs + StackMarquee + Credibility + LighthouseScores + FAQ + CTA

### Security & reliability
- [x] React island hydrated without errors; no secrets in components

### Docs
- [x] memory.md records landing component directory

### Verdict: PASS

### user
