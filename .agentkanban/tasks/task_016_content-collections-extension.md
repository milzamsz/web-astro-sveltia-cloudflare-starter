---
title: "Phase 4 — Content Collections Extension"
lane: done
created: 2026-06-26T09:30:00Z
updated: 2026-06-26T23:55:00Z
description: "Extend content.config.ts: upgrade blog schema (featured, uid, faqs, toc, svgSlug, md+mdx glob), add authors (JSON), faqs (JSON), stack (MDX). Extend services schema (image, featured). Make locale dynamic from i18n config. Add sample content files."
priority: high
labels: []
dependsOn: [configuration-architecture]
parent: rocket-refinement
---

## Conversation

### user

Implement Phase 4: extend all content collections following the Rocket reference schema.

### agent

Acknowledged. See `todo_016_content-collections-extension.md`. Depends on `task_015` (i18n config must exist for dynamic locale schema).

**Scope:**

**Blog collection** — add: `updatedAt`, `featured: boolean`, `uid` (kebab-case stable ID), `faqs` array (per-post FAQ for JSON-LD), `toc: boolean` (per-post override), `svgSlug` (custom OG illustration). Extend glob to `**/*.{md,mdx}`. Make locale dynamic from `i18nConfig.locales`.

**Authors collection** (new, JSON files at `src/content/authors/`): `name`, `bio`, `avatar` (image), `social` (twitter, github, linkedin).

**FAQs collection** (new, JSON files at `src/content/faqs/`): `question`, `answer`, `category`, `order`, `locale`.

**Stack collection** (new, MDX at `src/content/stack/`): `name`, `description`, `version`, `url`, `icon`, `colorOklch`, `order`.

**Services collection** — extend existing: add `image`, `featured: boolean`, `tags: string[]`.

**Settings collection** — keep unchanged.

**Note:** "projects" collection from Rocket is NOT added. "services" is the equivalent.

Sample content files: add 1–2 sample entries per new collection for immediate dev server testing.

## Definition of Done

- [x] (agent) `content.config.ts` updated — all 6 collections defined (blog, docs, pages, services, settings, authors, faqs, stack)
- [x] (agent) Locale schema updated (uses config-defined locale array)
- [x] (agent) Sample author JSON, sample FAQ JSON (EN/ID), sample stack MDX exist
- [x] (agent) Existing blog posts still load (no regressions from schema additions)
- [x] (agent) `astro check` — no TypeScript errors
- [x] (agent) `pnpm build` — content layer compiles all 8 collections successfully
- [x] (human) Verify new collections appear in Sveltia CMS config (updated `public/admin/config.yml`)

### user


---

## IMPLEMENTATION REVIEW — task_016

**Lane:** review
**Verdict:** APPROVE

### Evidence

**Build:** `pnpm run build` → exit 0, 55 pages, Pagefind indexes 56 files (9.5s)
**Type check:** `astro check` → 0 errors
**Lint:** `pnpm run lint:js` → 0 errors (pre-existing warnings only)
**Tests:** `pnpm run test` → 1/1 passed
**CMS Validation:** `node scripts/validate-cms-config.cjs` → 0 errors, 0 warnings

### What shipped

| File | Purpose |
|------|---------|
| `src/content.config.ts` | 8 collections: blog (extended), docs, pages, services (extended), settings, authors (new), faqs (new), stack (new) |
| `src/content/authors/admin.json` | Sample author profile |
| `src/content/faqs/*.json` | 4 FAQ entries (2 EN + 2 ID) with category, order, locale |
| `src/content/stack/*.md` | 3 stack entries (Astro, Tailwind CSS, Cloudflare) with icon + OKLCH color |
| `public/admin/config.yml` | Added CMS collections for authors, faqs-id, faqs-en, stack |
| `scripts/validate-cms-config.cjs` | Updated expected collections list |

### DoD Checklist

- [x] `content.config.ts` updated — all 8 collections defined
- [x] Locale schema uses config (not hardcoded enum)
- [x] Sample author, FAQ, stack files exist
- [x] Existing blog posts still load
- [x] `astro check` — 0 TypeScript errors
- [x] `pnpm build` — all 8 collections compiled

### Discovered work → backlog

1. Blog/service page components need updates to consume new fields (`featured`, `tags`, `image`, `authorId`, `faqs`, `toc`, `svgSlug`)
2. Stack collection rendering component needed (using `astro-icon`)
3. Author detail page / author listing page needed

### user

---

## PRODUCTION READINESS AUDIT — task_016 (consolidated Rocket Refinement epic audit)

**Env exercised:** local (Windows, Node 25.7, pnpm 8.15)

### Correctness
- [x] All 8 collections compile; sample entries load
- [x] `pnpm astro check` → 0 errors
- [x] `pnpm build` → 56 pages, exit 0
- [x] `pnpm run validate:cms` → 0 errors, 0 warnings
- [x] Behavior proven to RUN: build emits localized content routes for all collections

### Security & reliability
- [x] Locale schema driven by `i18nConfig` (no hardcoded enum drift)
- [N/A] No DB / mutations in this task

### Docs
- [x] CMS config validated against shipped collections

### Verdict: PASS

### user
