# ARCHITECTURE.md

## Purpose

This document is the fast architecture map for the repository.

- `PLAN.md` is the full product and roadmap document.
- `ARCHITECTURE.md` summarizes the current system shape and the intended target shape.

## Architecture Principles

- static-first public website
- dynamic behavior only where the roadmap requires it
- file-based content as the primary public content model
- explicit i18n from the start
- spec-driven delivery through Agentic Kanban artifacts

## Current Implemented Architecture

Today the repository is a static Astro application with a small shared shell and locale helpers.

```text
Visitor
  -> Astro static routes
  -> BaseLayout + Header + Footer
  -> SEO helpers
  -> i18n route helpers and dictionaries
```

Implemented boundaries:

- Public site rendering: Astro
- Styling and tokens: global CSS plus Tailwind v4 import
- Route localization: Astro i18n plus repo helpers
- SEO metadata: canonical, hreflang, JSON-LD baseline
- Validation: build-time and script-based checks

Not yet implemented in code:

- CMS
- auth
- API routes
- database
- object storage
- preview publishing
- contact processing
- analytics providers

## Target MVP Architecture

The target architecture described in `PLAN.md` is still valid as the intended direction:

```text
Astro public site
Starlight docs
Sveltia CMS
Cloudflare Pages Functions
D1
R2
Better Auth
Resend
Turnstile
Preview and publish workflow
Analytics and cleanup jobs
```

This target should be treated as planned architecture, not shipped architecture.

## Current vs Target

### Current

- Astro app exists
- homepage exists
- shared layout exists
- i18n routing exists for `id` and `en`
- baseline SEO helpers exist
- validation script exists for i18n

### Target

- full localized marketing pages
- localized blog and docs content collections
- Sveltia-backed editing at `/admin`
- Cloudflare server-side endpoints
- protected preview on `content-preview`
- publish/discard workflow
- D1/R2-backed operational features

## System Boundaries

### Public Web

Owned by Astro pages, layouts, components, i18n helpers, and SEO helpers.

Primary files:

- [astro.config.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/astro.config.ts)
- [src/layouts/BaseLayout.astro](/C:/Workspace/templates/astro-sveltia-cloudflare/src/layouts/BaseLayout.astro)
- [src/pages/index.astro](/C:/Workspace/templates/astro-sveltia-cloudflare/src/pages/index.astro)

### Localization Layer

Owned by:

- [src/i18n/routes.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/routes.ts)
- [src/i18n/switcher.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/switcher.ts)
- [src/i18n/ui.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/i18n/ui.ts)

Responsibilities:

- locale prefixing
- locale detection
- equivalent-path switching
- shared UI translations

### SEO Layer

Owned by [src/lib/seo.ts](/C:/Workspace/templates/astro-sveltia-cloudflare/src/lib/seo.ts).

Responsibilities:

- canonical URL generation
- hreflang link generation
- baseline JSON-LD
- Open Graph and Twitter metadata

### Future Operational Layer

Planned but not implemented yet:

- Cloudflare Pages Functions
- D1-backed auth and contact storage
- R2-backed media
- Resend-driven transactional email
- Turnstile validation

## Deployment Shape

Current local workflow:

- `pnpm dev`
- `pnpm build`

Planned deployment model:

- `main` for production
- `content-preview` for protected preview
- Cloudflare Pages as the hosting target

The branch model is documented, but the full preview/publish implementation is still pending.

## Content Model

Current content state:

- file-based UI copy in `src/i18n/ui.ts`
- homepage content embedded in `src/pages/index.astro`

Planned content state:

- Markdown/MDX/YAML driven public content
- localized content collections
- CMS-managed editing workflow

## Security Model

Current security posture:

- static public site only
- no server-side auth surface implemented
- no database or secret-backed application behavior in code yet

Planned security posture:

- protected `/admin`
- invite-only auth
- mandatory 2FA
- Turnstile-protected contact intake
- environment-separated Cloudflare resources

## SDD Ownership Map

Architecture work in this repository is governed by:

- tasks in `.agentkanban/tasks/`
- capability specs in `.agentkanban/specs/`
- change proposals, designs, and checklists in `.agentkanban/changes/`

Current implemented slices came from:

- `bootstrap-governance-and-skills-lock`
- `astro-foundation-and-design-system`
- `i18n-routing-and-locale-governance`

Future architecture updates should be implemented through the same spec-driven path, then reflected back into `TECHNICAL.md` and `ARCHITECTURE.md`.
