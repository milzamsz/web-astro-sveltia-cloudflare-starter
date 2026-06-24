# TECHNICAL.md

## Purpose

This document is the implementation reference for humans and agents working in this repository.

Use it to answer:

- what is implemented now
- how the repo is structured
- which commands are the current quality gates
- how Agentic Kanban and spec-driven delivery are expected to run here

`PLAN.md` remains the full roadmap. This file records the current technical truth.

## Current Stack

- Astro 7
- TypeScript
- pnpm 8.15.0
- Node.js 24.0.0
- Tailwind CSS v4 via `@tailwindcss/vite`
- `@astrojs/starlight`
- `@astrojs/sitemap`
- `@astrojs/rss`
- Sveltia CMS 0.167.3 (static admin SPA)
- R2-backed media storage (via wrangler.jsonc)
- Cloudflare Image Transformations (preset-driven)

## Current Commands

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm run lint:js
pnpm run lint:css
pnpm run type-check
pnpm run validate:i18n
pnpm run format
pnpm run format:check
pnpm validate:cms
```

## Current Source Layout

```text
src/
  components/
    CTA.astro
    FAQ.astro
    FeatureGrid.astro
    Footer.astro
    Header.astro
    Hero.astro
    TrustBlock.astro
    Img.astro              ← New in task 007
    ui/
      CTA.astro
  content/
    config.ts
    navigation.yml
    pages/
      about_en.md
      about.md
      ...
    services/
      cloud-deployment_en.md
      cloud-deployment.md
      web-development_en.md
      web-development.md
    ...
  i18n/
    routes.ts
    switcher.ts
    ui.ts
  layouts/
    BaseLayout.astro
  lib/
    images.ts              ← New in task 007
    seo.ts
    site-config.ts
  pages/
    about.astro
    contact.astro
    index.astro
    pricing.astro
    privacy.astro
    services.astro
    terms.astro
    [locale]/
      about.astro
      contact.astro
      pricing.astro
      privacy.astro
      services.astro
      terms.astro
    services/
      [slug].astro
  styles/
    globals.css
scripts/
  validate-i18n.js
  validate-cms-config.cjs
public/
  admin/
    config.yml
    index.html
  favicon.svg
  llms.txt
  robots.txt
wrangler.jsonc            ← New in task 007 (R2 bindings)
```

## Implemented Behavior

### Foundation

- Static Astro app is bootstrapped and builds successfully (except pre-existing locale page issue).
- Shared public shell exists through `BaseLayout.astro`, `Header.astro`, and `Footer.astro`.
- Global tokens and base styles live in [src/styles/globals.css](/C:/Workspace/templates/astro-sveltia-cloudflare/src/styles/globals.css).
- Baseline SEO helpers exist in [src/lib/seo.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/lib/seo.ts).

### I18n

- Supported locales: `id` and `en`
- Default locale: `id`
- Astro i18n is configured in [astro.config.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/astro.config.ts).
- Locale helpers live in [src/i18n/routes.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/routes.ts).
- Equivalent-path switching lives in [src/i18n/switcher.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/switcher.ts).
- UI strings live in [src/i18n/ui.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/ui.ts).
- Validation currently checks translation coverage through [scripts/validate-i18n.js](/C:/Workspace/templates/astro-sveltia-cloudflare/scripts/validate-i18n.js).

### Public Pages

- Homepage, About, Services listing + detail, Pricing, Contact, Privacy, Terms pages are implemented.
- Pages have `sections` array with Hero, CTA, Features, FAQ, Trust block types.
- Services have `features` (bullet list) and `priceRange` fields.
- Build produces pages for both `id` and `en` locales.

### Media Pipeline (task 007)

- **R2-backed media storage** via Cloudflare R2 (see `wrangler.jsonc`).
- Sveltia CMS configured with `media_library` pointing to R2 bucket.
- **Image transformation presets** defined in `src/lib/images.ts`:
  - `hero` (1920×800), `og` (1200×630), `card` (600×400), `thumb` (150×150), `full` (original).
- **`Img.astro`** component accepts only approved presets; arbitrary parameters rejected.
- OG image support extended in `seo.ts` (og:image meta tags).
- Editor documentation updated with media upload limits, preset table, replacement workflow.

### Content Collections (task 006)

- Sveltia CMS models all public content types through `public/admin/config.yml`.
- Collections: Pages (id/en), Services (id/en), Blog (id/en), Documentation (metadata), Settings (analytics, map, org), Navigation (header, footer).
- `pnpm validate:cms` validates config against content schemas.
- Editorial metadata fields (translationKey, publishState, updatedAt, mediaReferences) added to collections.

Current quality coverage:

- `build`: implemented
- `lint`: implemented
- `type-check`: implemented through `astro check`
- `validate:i18n`: implemented
- `test`: not implemented yet

## Current Source Layout

```text
src/
  components/
    Header.astro
    Footer.astro
  i18n/
    routes.ts
    switcher.ts
    ui.ts
  layouts/
    BaseLayout.astro
  lib/
    seo.ts
    site-config.ts
  pages/
    index.astro
  styles/
    globals.css
scripts/
  validate-i18n.js
public/
  favicon.svg
  llms.txt
  robots.txt
```

## Implemented Behavior

### Foundation

- Static Astro app is bootstrapped and builds successfully.
- Shared public shell exists through `BaseLayout.astro`, `Header.astro`, and `Footer.astro`.
- Global tokens and base styles live in [src/styles/globals.css](/C:/Workspace/templates/astro-sveltia-cloudflare/src/styles/globals.css).
- Baseline SEO helpers exist in [src/lib/seo.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/lib/seo.ts).

### I18n

- Supported locales: `id` and `en`
- Default locale: `id`
- Astro i18n is configured in [astro.config.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/astro.config.ts).
- Locale helpers live in [src/i18n/routes.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/routes.ts).
- Equivalent-path switching lives in [src/i18n/switcher.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/switcher.ts).
- UI strings live in [src/i18n/ui.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/ui.ts).
- Validation currently checks translation coverage through [scripts/validate-i18n.js](/C:/Workspace/templates/astro-sveltia-cloudflare/scripts/validate-i18n.js).

### Public Pages

- Current public page implementation is limited to the homepage in [src/pages/index.astro](/C:/Workspace/templates/astro-sveltia-cloudflare/src/pages/index.astro).
- The repo does not yet implement the full marketing surface, blog, docs content model, CMS, auth, preview workflow, media pipeline, or Cloudflare server-side features described in `PLAN.md`.

## CMS Content Modeling (task 006 — done)

**Delivered:** Sveltia CMS configuration with all content collections, singleton settings, validation script, and editor documentation.

**Next batch enabled by this task:**

- **Sveltia CMS** — Static admin SPA for managing public content
- **Cloudflare Pages Functions** — Auth, preview/publish APIs, contact form, build status
- **Cloudflare D1** — User/session/state management for auth and preview
- **Cloudflare R2** — Media pipeline (protected upload, transformation presets)

**Technical Scope:**

- Admin SPA at `/public/admin/` with config pinning and optional brand styling
- Collections mapped to existing content schemas:
  - Pages (`about`, `contact`, `pricing`, `privacy`, `terms`), Services (`/services/[slug]`), Blog, Legal
  - Singleton: Site settings (analytics provider, map, org info)
  - Singleton: Header/footer navigation items
- Editorial metadata fields for translation (`translationKey`), publish state (`publishState`), media references (`mediaReferences`), updated timestamps
- CMS config validation against `src/content.config.ts`

**Operator Configuration:**

- **SVELTIA_BACKEND_REPO**: The Git repository in `owner/repo` format. Configured in `/public/admin/config.yml` under `backend.repo`.
- **SVELTIA_BACKEND_BRANCH**: Production content branch (`main`). Editors change this in the CMS to `content-preview` for draft/publish workflows.
- **SVELTIA_BASE_URL**: Authentication callback URL for GitHub OAuth. Must match the OAuth application callback URL.
- **SVELTIA_AUTH_ENDPOINT**: OAuth endpoint for Sveltia authentication. Default: `/admin/auth/`.
- **Media**: Configured as Git-backed (`src/content/uploads`) until task 007 (R2 media pipeline) switches to R2.
- **Content Structure**: Each content type has per-locale collections (`pages-id`, `pages-en`). Files follow `<slug>[_en].md` pattern. Settings and navigation are singleton YAML files.
- **Editor Onboarding**: See `docs/editor-guide.md` for the full editor manual.

**Production Readiness:**

- Org-scoping: Environment-agnostic placeholders (e.g., `repo: <owner>/<repo>`) for easy forking; collections are additive.
- Audit events: Editorial metadata fields (`translationStatus`, `publishState`, `updatedAt`) serve as native audit trail. Runtime audit logs are deferred to auth (task 008) and publish (task 009) tasks.
- Secret references: `/public/admin/` contains zero secrets. GitHub OAuth credentials managed via Sveltia runtime OAuth; explicit rule: "CMS config contains no embedded secrets."
- Signed commands: Not applicable at CMS config level.
- Quotas: Not applicable at config level.
- Migration idempotency: Additive collections; config migration is environment-specific via Sveltia env variables.
- Runbooks: Editor documentation (`docs/editor-guide.md`); operator notes in this section.

**Commands:**

- `pnpm validate:cms` (new) — runs `scripts/validate-cms-config.cjs` to ensure CMS config ↔ content schema alignment
- `pnpm validate:editor-guide` (optional) — checks editor docs for media reference coverage

**Affected Areas:**

- `public/admin/` — CMS entry point and configuration (`index.html`, `config.yml`)
- `src/content/settings.yml` — Site settings singleton (new)
- `src/content/navigation.yml` — Navigation singleton (new)
- `src/content/` — no schema changes; CMS collections mirror existing schemas
- `scripts/validate-cms-config.cjs` — validation script (new)
- `docs/editor-guide.md` — editor-facing documentation (new)
- `TECHNICAL.md` — operator notes for CMS environment variables (this section)

## Workflow Rules

This repository uses Agentic Kanban Standard workflow:

```text
backlog -> planning -> in-progress -> review -> done
```

For spec-driven tasks:

1. Read the task file in `.agentkanban/tasks/`.
2. Read the linked capability spec in `.agentkanban/specs/<capability>/spec.md`.
3. Read the linked change folder:
   `proposal.md`, `design.md`, and `tasks.md`.
4. Treat the change `tasks.md` as the authoritative checklist.
5. Record evidence before claiming completion.

Evidence categories expected by the workflow:

- `lint`
- `test`
- `build`
- `behavior`

## Documentation Update Rule

Update `TECHNICAL.md` when any of these change:

- runtime or package-manager requirements
- commands or quality gates
- source layout conventions
- implemented behavior or technical contracts
- Agentic Kanban workflow rules as applied in this repo

Update `ARCHITECTURE.md` when system boundaries, deployment shape, or major target/current-state mappings change.

## Honest State

Completed slices:

- bootstrap governance and repo conventions
- Astro foundation and static shell
- i18n routing and locale governance
- core marketing pages (about, services, pricing, contact, privacy, terms)
- blog, docs, and search experience (Pagefind, RSS per locale, draft exclusion)
- **CMS Content Modeling And Editor Experience (Sveltia CMS config, collections, validation, editor docs)**

Active planning:

- Media Pipeline And R2 Delivery (task_007) — **now ready** (blocked by 006, which is done)
- Auth Admin Access And 2FA (task_008) — **now ready** (blocked by 006, which is done)
- Preview Publish And Editorial Ops (task_009) — blocked by 007 + 008
- Contact Intake Maps And Analytics (task_010) — blocked by 008
- SEO AI Discovery And Cleanup Ops (task_011) — blocked by 006 + 007 (006 done, 007 pending)
- Security Hardening And Release Readiness (task_012) — blocked by 009 + 010 + 011

## Notes For Future Work

- Treat `README.md`, `GOVERNANCE.md`, and `SETUP.md` as partially roadmap-oriented until later slices are implemented.
- Prefer current code and this document over aspirational statements in older planning text when they disagree.
