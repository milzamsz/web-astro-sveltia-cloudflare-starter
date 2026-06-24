# Proposal: Astro Foundation And Design System

## Problem

The repo lacks an Astro application, shared layouts, design tokens, and baseline static quality tooling.

## Value

This slice creates the foundation that every public page, docs route, and CMS-rendered artifact will build on.

## Scope

- Bootstrap Astro with TypeScript strict mode and pnpm.
- Add Starlight, sitemap, Pagefind hooks, and static-first configuration.
- Define design tokens, base layouts, header/footer, metadata helpers, and baseline public assets.
- Add lint, format, and build entry points required for later evidence checks.

## Non-Scope

- Full localized content pages.
- Auth, CMS, or Cloudflare dynamic features.

## Constraints

- Public site must remain static-first.
- Avoid unnecessary client-side runtime.

## Dependencies

- `bootstrap-governance-and-skills-lock`

## Assumptions

- Starlight remains in the same Astro project at `/docs`.

## Risks

- Choosing the wrong project structure can slow all later tasks.
- Design system drift can create rework across locales and CMS templates.

## Success Criteria

- `pnpm build` and baseline static checks can be introduced successfully.
- Shared page shell and design tokens support the full public site.
