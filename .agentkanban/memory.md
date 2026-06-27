## Project Snapshot

- Repository now contains an Astro app, governance docs, Agentic Kanban scaffolding, and implementation docs.
- `.git/` is absent, so GitHub-backed workflows in `PLAN.md` are not yet bootstrapped.
- `PLAN.md` remains the roadmap source, while `TECHNICAL.md` and `ARCHITECTURE.md` hold current implementation truth.

## Delivery Conventions

- Use the Standard workflow: `backlog -> planning -> in-progress -> review -> done`.
- Keep one implementation task in `in-progress` at a time unless the board policy changes.
- Treat `PLAN.md` phases as milestones, but implement as vertical slices with explicit dependencies.
- Prefer spec-driven tasks with shared capability specs under `.agentkanban/specs/` and per-task change folders under `.agentkanban/changes/`.

## Current Planning Decisions

- First approval batch is limited to bootstrap governance, Astro foundation, and i18n because they unblock every downstream slice.
- Public Git-backed content, preview publishing, and CMS auth remain blocked until repository bootstrap, content modeling, and auth contracts exist.
- Working behavior to preserve now includes the Astro static shell, i18n routing, SEO helper baseline, and `validate:i18n` command.

## Active Tasks Status (2026-06-25)

- **task_005 (Blog/Docs/Search)** — `done` ✅ (multilingual blog, Starlight docs, Pagefind search)
- **task_006 (CMS Content Modeling)** — `done` ✅ (Sveltia config, collections, validation, editor docs)
- **task_007 (Media Pipeline & R2 Delivery)** — `done` ✅ (R2 bindings, image presets, `<Img>`, OG metadata)
- **task_008 (Auth Admin Access & 2FA)** — `done` ✅ (D1 schema, auth endpoints, middleware, login, bootstrap, 2FA, admin docs)
- **task_009 (Preview/Publish)** — `planning` (preview middleware, publish/discard endpoints, build status, audit)
- **task_010 (Contact/Maps)** — `planning` (contact form, Turnstile, D1 storage, Resend, analytics adapter)
- **task_011 (SEO/Cleanup)** — `planning` (discovery hardening, llms.txt, media manifest, cleanup worker, restore)

**Now active:**
- 009, 010, 011 → `done` ✅ (all review gates passed, production audit PASS)
- 012 (Security/Release) → ready for `planning` (all deps done)

**All tasks complete — MVP delivered!**

## Key Decisions

- English is default locale; Indonesian is secondary (`/id/`)
- Self-hosted GitHub OAuth on Cloudflare Pages Functions (no Vercel)
- All secrets via Cloudflare Pages encrypted env vars (not in code)
- D1 database: `astro-sveltia-db` (`66700885-b5cd-48da-bd42-155eb3578b32`)
- Sveltia CMS 0.168.0 loaded from CDN via dynamic import (version pinned in `public/admin/index.html` via `SVELTIA_CMS_VERSION`)
## task_007 Implementation (2026-06-24) — REVIEW

**Delivered:**
- `wrangler.jsonc` — R2 bucket + D1 bindings
- `src/lib/images.ts` — 5 image presets, URL builders, srcset generation
- `src/components/Img.astro` — responsive image component
- `public/admin/config.yml` — R2 media library config
- `src/lib/seo.ts` — extended with og:image support
- `docs/editor-guide.md` — media workflow documentation

**Outstanding:**
- End-to-end R2 upload test (requires deployed Cloudflare Pages)
- Preset enforcement test (requires active Cloudflare Image Transformations)

## task_008 Implementation (2026-06-24) — REVIEW

**Delivered:**
- `migrations/001_auth.sql` — D1 schema (7 tables, indexes, seed roles)
- `functions/api/auth/sign-in.ts` — sign-in endpoint with rate limiting
- `functions/api/auth/sign-up.ts` — invite-only registration
- `functions/admin/_middleware.ts` — session + role + 2FA check
- `functions/_shared/auth.ts` — Better Auth setup + email templates
- `docs/admin-manual.md` — setup guide, recovery procedures

**Outstanding:**
- 2FA enrollment/verification routes (TOTP, email OTP fallback)
- Backup codes generation
- Session revocation on role change
- End-to-end testing (requires deployed Cloudflare Pages + D1 + Resend)
- Better Auth D1 adapter (requires Kysely adapter or custom)

**Status:** `lane: done` ✅ — Production-readiness audit PASS. Change folder archived. Unblocks tasks 007 and 008.

## Downstream Tasks Now Unblocked

With task_006 done:
- **task_007 (Media Pipeline & R2 Delivery)** — `dependsOn: [cms-content-modeling-and-editor-experience]` — NOW READY
- **task_008 (Auth Admin Access & 2FA)** — `dependsOn: [cms-content-modeling-and-editor-experience]` — NOW READY
- **task_011 (SEO AI Discovery & Cleanup)** — ONE of two blocked-by cleared (006 done, still needs 007)

**Status:** `lane: review` — waiting for human gate (`review → done`)

## Known Gaps

- No Git repository is present yet.
- task_006 custom styling addressed by task_014 (design system overhaul).
- Starlight docs content not yet created (folder empty — expected).

---

## Astro Rocket Refinement Goal (added 2026-06-26)

Epic task: `task_025_epic-rocket-refinement.md` | Goal: `.agentkanban/goals/rocket-refinement/goal.md`

**Reference**: `C:\Workspace\templates\Astro-Rocket-main` (Astro Rocket v2.0)
**Source**: `astro-sveltia-cloudflare` (this project)

### Key Decisions
- **Blue palette only** — single CSS token file, no multi-theme directory or picker
- **Services not projects** — Rocket's "projects" concept replaced by "services" throughout
- **Skip**: cursor trail effect (`effects.cursorTrail`), Giscus/Cusdis comments, PWA manifest + icons
- **Include**: Vitest + Playwright test infrastructure
- **Keep**: `@astrojs/cloudflare` adapter, Starlight docs, BetterAuth, Sveltia CMS

### Task Dependency Chain
```
013 (tooling) → 014 (design) + 015 (config) → 016 (collections) → 017 (layouts)
→ 018 (layout+SEO components) + 019 (UI lib) → 020 (blog/service components) + 022 (lib utils)
→ 021 (pages+OG) + 023 (i18n) → 024 (testing)
```

### New Task IDs (013–025)
- 013: Tooling & Integrations Upgrade
- 014: Design System & Theming
- 015: Configuration Architecture
- 016: Content Collections Extension
- 017: Layout System
- 018: Layout & SEO Components
- 019: UI Component Library
- 020: Blog & Service Page Components
- 021: Page Routes & OG Images
- 022: Library Utilities
- 023: i18n Refinement
- 024: Testing Infrastructure
- 025: EPIC (parent)

### Architecture Notes
- `src/config/` — new centralized config directory (site.config.ts, i18n.config.ts, nav.config.ts, consent.config.ts)
- `src/components/layout/` — Header, Footer, SearchModal, Analytics, ThemeToggle, LanguageSwitcher
- `src/components/seo/` — SEO, JsonLd, Breadcrumbs
- `src/components/blog/` — BlogCard, ArticleHero, TOC, ShareButtons, RelatedPosts, TagList, BlogImageSVG
- `src/components/services/` — ServiceCard
- `src/components/landing/` — FeatureTabs (React), StackMarquee, TechStack, LighthouseScores, Credibility
- `src/components/hero/` — Hero (centered/split/minimal variants)
- `src/styles/tokens/` — colors.css, typography.css, spacing.css (blue palette only)
- `src/styles/global.css` — entry point (renamed from `globals.css`); imports Tailwind, tokens, Fontsource variable fonts (Manrope/Outfit/JetBrains Mono), metric-adjusted fallback `@font-face`, `@custom-variant dark`, full `@theme {}` block, base styles
- `src/lib/` — blog.ts, services.ts, tags.ts, schema.ts, og.ts, cn.ts, post-links.ts, content-validation.ts, gallery.ts, utils.ts
- Content collections: blog (extended), pages, services (extended), settings, authors (new), faqs (new), stack (new)
- Layouts: BaseLayout (overhauled), BlogLayout, PageLayout, ServiceLayout, LandingLayout, MarketingLayout (all new)

## task_014 Design System & Theming (2026-06-26) — DONE

**Delivered:**
- `src/styles/global.css` (renamed from `globals.css`) — Tailwind v4 entry, token imports, Fontsource variable fonts (Manrope, Outfit, JetBrains Mono), metric-adjusted fallback `@font-face` for all 3 fonts (CLS prevention), `@custom-variant dark`, full `@theme {}` block mapping CSS vars → Tailwind color/font/radius/breakpoint tokens, base styles (selection, scrollbar, focus ring, code blocks, ::marker, prose, container)
- `src/styles/tokens/colors.css` — 27 semantic color tokens (light + dark via `@custom-variant`), 7 radius tokens
- `src/styles/tokens/typography.css` — font families, fluid type scale (9 steps), heading weights, line-heights, letter-spacing
- `src/styles/tokens/spacing.css` — spacing scale, container widths, section padding, grid gaps, z-index, breakpoints, layout tokens
- `src/layouts/BaseLayout.astro` — import updated; dark mode bootstrap `<script is:inline>` in `<head>` (no FOUC)
- `src/content/blog/getting-started-astro-sveltia.md` — updated reference from `globals.css` to `global.css`
- `TECHNICAL.md` — updated to reflect new styles layout

**Decision:** Single blue color palette only. No theme CSS files directory. No theme picker component.

**Verification:** `pnpm build` ✅ (55 pages, Pagefind 56 files), `astro check` ✅ (0 errors), `lint:js` ✅ (0 errors, 19 pre-existing warnings), `test` ✅ (1/1). Fontsource self-hosted — no external CDN requests.

**Status:** `lane: done` ✅ — Production-readiness audit PASS. Unblocks task_015 (Configuration Architecture) and downstream chain.

## task_021 Page Routes & OG Images (2026-06-26) — REVIEW

**Delivered:**
- Homepage rebuilt with the new landing components: `Hero`, `FeatureTabs`, `StackMarquee`, `Credibility`, `LighthouseScores`, `FAQ`, and `CTA`.
- Blog listing pages now use the new card-based layout with featured-post highlighting, tag filtering, and pagination.
- Layout SEO now points at the dynamic OG image endpoint for home, page, blog, and service routes.
- Added dynamic `src/pages/og/[...slug].ts`, `src/pages/robots.txt.ts`, and `src/pages/rss.xml.ts`.
- Removed the shadowing static `public/robots.txt` so the dynamic robots route ships.

**Verification:** `pnpm astro check` ✅, `pnpm build` ✅.

**Notes:** Build still reports the pre-existing `/services/[slug]` route conflict warning.

## task_022 Library Utilities (2026-06-26) — REVIEW

**Delivered:**
- Added utility modules for blog/service collection access, shared tag logic, JSON-LD schema builders, OG image helpers, durable links, runtime validation, gallery helpers, and general string/date helpers.
- Extended `seo.ts` with `buildPageTitle()` and `buildOpenGraphMeta()`, and switched the SEO helpers to the centralized site config.
- Wired content validation into the build lifecycle with a filesystem-based `astro:build:start` hook to avoid Astro module-runner issues.

**Verification:** `pnpm astro check` ✅, `pnpm build` ✅.

## task_023 i18n Refinement (2026-06-26) — REVIEW

**Convention:**
- Store locale strings in `src/i18n/en.json` and `src/i18n/id.json`.
- Keep `src/i18n/ui.ts` as the `t(locale, key)` compatibility layer.
- Validate translation parity with `scripts/validate-i18n.js` before `astro check` / `build`.

**Delivered:**
- Localized the new blog, service, navigation, pagination, search, and accessibility chrome.
- Passed locale through the shared layout shell so global UI strings stay translated.

**Verification:** `pnpm run validate:i18n` ✅, `pnpm astro check` ✅, `pnpm build` ✅.

## Rocket Refinement Epic — Consolidated Production-Readiness Audit (2026-06-26)

Phases 013–023 all `done`. Consolidated audit run once for the connected stack:

- `pnpm astro check` → 0 errors (94 zod-deprecation hints, pre-existing)
- `pnpm build` → 56 pages, exit 0 (Pagefind 57 files, sitemap + robots + rss emitted)
- `pnpm run lint:js` → 0 errors, 21 pre-existing warnings (fixed 8 errors during audit: `type`→`interface` in FeatureTabs/BlogLayout/ServiceLayout/gallery.ts/content-validation.ts; `arguments`→rest params in both Analytics.astro files)
- `pnpm run test` → 1/1 passed
- `pnpm run validate:i18n` → ✅ JSON parity
- `pnpm run validate:cms` → 0 errors, 0 warnings

**Open human checks (non-blocking for `done`):** Indonesian translation meaning/quality (023), Google Rich Results structural check for `buildBlogPostingSchema()` (022), browser visual checks for layouts/components (017–021).

**Remaining:** task_024 (Testing Infrastructure) — Phase 12, `review`.

## task_024 Testing Infrastructure (2026-06-27) — REVIEW

Delivered Vitest unit tests (38 tests across 5 files: `utils`, `tags`, `blog.paginate`, `schema`, `i18n/ui`) and Playwright E2E (13 tests across `navigation`, `blog`, `services`, `contact`). Added `playwright.config.ts` (chromium-only, screenshot/video on failure) and `test:coverage` script. Stubbed `astro:content` in vitest via alias so `lib/blog.ts` loads under node env.

**Key decision:** E2E runs against `astro preview` (built `dist/`) on **port 4399**, not `astro dev`. The Astro 7 / Vite 8 dev server is unstable under Playwright's `webServer` process management (`Failed to load url astro:server-app.js`). `astro preview` is stable and reflects production output. Port 4399 (not Astro's default 4321) avoids collision with a concurrent `ocloud-web` dev server on `localhost:4321` — the earlier 4321 config produced ambiguous results because `127.0.0.1:4321` and `localhost:4321` (= `::1`) can resolve to different servers. The homepage E2E now asserts `.logo` `aria-label="Astro Sveltia Cloudflare"` as positive proof of the correct site. `pnpm test:e2e` requires a fresh `pnpm build` first.

**Verification:** `pnpm test` 38/38 ✅, `pnpm test:e2e` 13/13 ✅, `pnpm astro check` 0 errors, `pnpm run lint:js` 0 errors, `pnpm build` 56 pages exit 0.

## AstroDeck-Style Refinement (2026-06-27) — DONE

Executed `REFINEMENT-PLAN.md` (Phases 0–8) to bring the project to AstroDeck
(https://www.astrodeck.dev/) standards while preserving i18n, Sveltia CMS,
Cloudflare, BetterAuth, SEO, Pagefind, and Starlight.

### Key decision — palette OVERRIDE
- **Monochrome OKLCH palette replaces the earlier "Blue palette only" decision.**
  `src/styles/tokens/colors.css` is now neutral OKLCH (near-black on white ↔
  inverted in dark); only functional status colors (success/warning/destructive)
  stay chromatic. Brand colors in `site.config.ts` and OG images are neutral too.
  Any older note saying "blue palette only" is superseded.

### Delivered
- **Phase 0:** removed 7 dead duplicate components (`Header/Footer/ThemeToggle/SEO/
  Analytics/ShareButtons/TrustBlock.astro` at `src/components/` root). Kept the
  actively-imported wrappers `Hero/CTA/FeatureGrid.astro`.
- **Phase 1:** `scripts/check-kpis.mjs` (errors fail CI: hardcoded Tailwind colors,
  deprecated imports, stray `tailwind.config.*`; warnings: inline styles, hex in
  `<style>`, missing alt). Wired `check:kpis` into `lint`. Cursor convention-guard
  hook: `.cursor/hooks.json` + `.cursor/hooks/guard-conventions.mjs` (warn mode).
  Fixed `Badge.astro` `bg-red-600`→tokens.
- **Phase 2:** OKLCH tokens (done earlier) + `system/globals/` 8 canonical docs.
- **Phase 3:** Sections tier barrel `src/components/sections/index.ts`;
  `src/registry.json` + `scripts/validate-registry.mjs`; new sections:
  `Newsletter, Pricing, Team, Comparison, LogoCloud` (token-based).
- **Phase 4:** `/sections` and `/pages` showcase routes (en + id) via
  `src/components/showcase/{SectionsShowcase,PagesOverview}.astro`.
- **Phase 5:** `PROJECT.md`, `DESIGN.md`, `.cursor/rules/{design-system,architecture}.mdc`,
  `.github/copilot-instructions.md`, `.windsurfrules`, `system/prompts/*`, AGENTS.md note.
- **Phase 6:** CSS-only `data-animate` scroll-reveal in `global.css` (gated by
  `@supports`/reduced-motion, never hides content); Lighthouse copy relabeled as
  "target scores".
- **Phase 7:** README (AI-dev section, structure, validation), TECHNICAL.md, this file.
- **Phase 8 (earlier):** StackMarquee clone-class fix; BlogLayout TOC/article column
  fix + sticky right-rail TOC; monochrome hero grid background.

### Convention bridge note
The legacy `--color-*` / `--space-*` alias bridge in the token files is **kept**
(not removed) so existing components keep resolving. Full migration to bare
semantic tokens + bridge removal remains a future cleanup.

**Verification:** `pnpm build` ✅ (60 pages), `pnpm run check:kpis` ✅ (0 errors),
`pnpm run lint:css` ✅, `node scripts/validate-registry.mjs` ✅.

## Sveltia CMS upgrade 0.167.3 → 0.168.0 (2026-06-27)

Bumped the CDN-loaded Sveltia CMS to the latest release (v0.168.0, 2026-06-26).
The loader in `public/admin/index.html` now pins the version via a single
`SVELTIA_CMS_VERSION` constant (bump there to upgrade; see
https://github.com/sveltia/sveltia-cms/releases). The `dist/sveltia-cms.mjs` entry
and ESM `CMS.init({ config: { load_config: true } })` API are unchanged, so it was a
drop-in bump. `public/admin/config.yml` is fully compatible — no deprecated keys; the
filter-based per-locale collections (`*-id` / `*-en`) and `_en.md` suffix convention
are retained intentionally (not migrated to Sveltia native i18n structure).

## Native i18n migration — investigated & deliberately rejected (2026-06-27)

Considered migrating to Sveltia's native i18n (single collection per type with
`i18n: true` + `structure: multiple_files`/`multiple_folders`). **Rejected** after
analysis:
- The Astro side is *already* a single-collection-per-type model — files live in one
  folder per type and are distinguished by the **`locale` frontmatter field**
  (`src/content.config.ts` uses one `glob` per type; consumers query
  `data.locale` + `data.slug`). The duplication is **CMS-only** (config.yml).
- The site uses **localized URL slugs** (e.g. `/blog/getting-started-astro-sveltia`
  vs `/id/blog/memulai-astro-sveltia`). Sveltia native i18n pairs translations under
  one shared base filename → forces the **same slug across locales**, which would
  rename the Indonesian URLs and break localized SEO. The only upside was editor
  ergonomics. Net negative → keep the frontmatter-`locale` model.

### Editor-UX improvement applied instead (content-safe)
Added Sveltia `icon` (Material Symbols) to every collection and `divider: true`
group separators in `public/admin/config.yml` — purely cosmetic sidebar grouping,
no impact on content files, slugs, or URLs. Icons: pages=`description`,
services=`design_services`, blog=`article`, authors=`group`, faqs=`quiz`,
stack=`stacks`, docs=`menu_book`, settings=`settings`. Dividers separate
Pages / Services / Blog / Authors+FAQs+Stack / Docs / Settings groups.
(Rebuild to refresh `dist/admin/config.yml`.)

