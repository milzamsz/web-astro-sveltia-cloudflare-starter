---
title: Phase 10 — Library Utilities
lane: done
created: 2026-06-26T09:30:00Z
updated: 2026-06-26T23:55:00Z
description: Add blog.ts, services.ts, tags.ts, schema.ts (JSON-LD builders), og.ts (OG image helpers), post-links.ts (uid-based durable links), content-validation.ts (runtime validators), gallery.ts, utils.ts (formatDate, slugify, truncate). Extend seo.ts with new helpers.
priority: medium
sortOrder: 1
dependsOn:
  - content-collections-extension
  - configuration-architecture
parent: rocket-refinement
---

## Conversation

### agent

Phase 10 is implemented and moved to `review`.

Delivered:
- Added the shared utility modules for dates, slugs, tags, blog and service collection access, JSON-LD schema builders, OG image helpers, durable post and service links, gallery helpers, runtime validation, and general helpers.
- Extended `seo.ts` to use the centralized site config and expose `buildPageTitle()` plus `buildOpenGraphMeta()`.
- Wired the content validation pass into `astro:build:start` with a filesystem-based validator so the build stays self-contained.

Verification:
- `pnpm astro check` ✅
- `pnpm build` ✅

Notes:
- The content validation hook now uses filesystem scanning instead of `astro:content` imports to avoid Astro config module-runner issues.
- The human Rich Results check remains open.

### user

---

## PRODUCTION READINESS AUDIT — task_022 (consolidated Rocket Refinement epic audit)

**Env exercised:** local (Windows, Node 25.7, pnpm 8.15)

### Correctness
- [x] All 10 utility modules created; `seo.ts` extended
- [x] Content validation hook runs at `astro:build:start` (filesystem scan)
- [x] `pnpm astro check` → 0 errors
- [x] `pnpm build` → 56 pages, exit 0 (validation hook executes during build)
- [x] `pnpm run lint:js` → 0 errors (`type` → `interface` fixes applied in this audit pass for gallery.ts, content-validation.ts)
- [x] Behavior proven to RUN: build log shows content sync + validation completes without abort

### Security & reliability
- [x] No secrets in lib; schema builders use typed `schema-dts`
- [N/A] No mutations

### Docs
- [x] memory.md records lib utility convention

### Verdict: PASS (human Rich Results structural check still open per DoD)

### user

Implement Phase 10: all library utility files.

### agent

Acknowledged. See `todo_022_library-utilities.md`. Depends on `task_016` (collections) and `task_015` (site config).

**Scope:**

- `src/lib/blog.ts` — `getAllPosts()`, `getFeaturedPosts(limit)`, `getPostsByTag(tag)`, `getRelatedPosts(current, limit)`, `getAllTags()`, `getTopTags(limit)`, `getPostsByLocale(locale)`, reading-time calculator
- `src/lib/services.ts` — mirror of `blog.ts` for services collection: `getAllServices()`, `getFeaturedServices()`, `getServicesByTag()`, `getAllServiceTags()`
- `src/lib/tags.ts` — shared tag utilities used by both blog + services: `countTags()`, `sortTagsByCount()`, `slugifyTag()`, `filterByTag()`
- `src/lib/schema.ts` — typed JSON-LD builders using `schema-dts`: `buildWebSiteSchema()`, `buildOrganizationSchema()`, `buildPersonSchema()`, `buildBlogPostingSchema(post, siteConfig)`, `buildFAQSchema(faqs[])`, `buildBreadcrumbSchema(crumbs[])`, `buildServiceSchema(service)`
- `src/lib/og.ts` — OG image generation: `buildOGSVG(title, description, siteName)` template string, color and font sizing, `renderOGImage(svg)` via sharp
- `src/lib/post-links.ts` — durable link resolution: `resolvePostByUid(uid, posts)`, `buildPostHref(post, locale)` (survives slug renames)
- `src/lib/content-validation.ts` — runtime validators: warn on missing required fields, detect duplicate slugs/uids, validate locale consistency
- `src/lib/gallery.ts` — gallery/carousel helpers: `getGalleryItems(service)`, image/video discriminator
- `src/lib/utils.ts` — general: `formatDate(date, locale)`, `slugify(str)`, `truncate(str, n)`, `capitalize(str)`, `calcReadingTime(content)`, `groupBy(arr, key)`
- `src/lib/seo.ts` — extend existing: `buildPageTitle(title)`, `buildOpenGraphMeta(page)`, integrate with `siteConfig`

## Definition of Done

- [ ] (agent) All 10 utility files created
- [ ] (agent) `blog.ts` functions return correct types matching content schema
- [ ] (agent) `schema.ts` produces valid JSON-LD output (WebSite, BlogPosting, FAQ, BreadcrumbList)
- [ ] (agent) `utils.ts` `formatDate` uses `Intl.DateTimeFormat` respecting locale
- [ ] (agent) `content-validation.ts` warns on duplicate slugs during build
- [ ] (agent) `astro check` — no TypeScript errors in lib files
- [ ] (human) Confirm `buildBlogPostingSchema()` output matches Google Rich Results structure

### user
