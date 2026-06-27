# Proposal: Tooling & Integrations Upgrade

## Problem

The project lacks several modern tooling capabilities needed for the downstream
refinement phases: MDX content authoring, React interactive components, SVG
icon management, typed environment variables, image optimization, automated
testing infrastructure, and up-to-date linting configuration.

## Outcome

A fully equipped Astro project with:
- MDX + React support for interactive content and landing sections
- `astro-icon` for optimized SVG icons (Lucide + Simple Icons)
- Typed environment schema via `astro:env`
- Rocket-style Pagefind search hook (adapter-aware, runs on build:done)
- shiki syntax highlighting config in astro.config.ts
- Image optimization defaults (`image.layout: constrained`)
- Vitest + Playwright for testing
- Prettier with Tailwind + Astro plugins
- ESLint flat config with Astro plugin
- CVA, clsx, tailwind-merge for UI component architecture

## Actors

- **Developers**: consume new tooling, run tests, write MDX/React components
- **CI pipeline**: runs `pnpm test`, `pnpm lint`, `pnpm build`
- **Content editors**: indirectly benefit from MDX for richer blog content

## Scope — In

- package.json dependency additions (see design.md for full list)
- astro.config.ts: MDX, React, astro-icon integrations; env schema; shiki config; image defaults; security checkOrigin; Pagefind hook
- tsconfig.json: JSX support for React
- vitest.config.ts: new test runner config
- .prettierrc: Tailwind CSS + Astro plugin
- eslint.config.mjs: flat config migration with Astro plugin

## Scope — Out

- Cloudflare adapter changes (keep as-is)
- Starlight integration changes (keep as-is)
- Removing existing deps (only add, never remove)
- Any runtime behavior changes beyond tooling upgrade
- Migration of existing code to use new tools (downstream phases)

## Acceptance Criteria

1. `pnpm install` completes without peer dep conflicts
2. `astro check` passes (zero TypeScript errors)
3. `pnpm lint` passes with new ESLint flat config
4. `pnpm build` succeeds; Pagefind hook indexes pages post-build
5. `pnpm test` launches Vitest (zero tests yet, runner starts clean)
6. astro:env schema validates at build time (fails fast on missing required vars)

## Constraints

- Keep `@astrojs/cloudflare` adapter (no Vercel/Netlify)
- Keep `@astrojs/starlight` integration
- Keep `tailwindcss` v4
- Keep `pnpm` as package manager (version 8.15.0 minimum)
- All new deps must be compatible with Node 24
- ESLint flat config must be backward-compatible with existing .astro files

## Affected Code

```
package.json                    : all lines — dependency additions
astro.config.ts                 : all lines — integration + env + shiki config
tsconfig.json                   : all lines — JSX compiler options
vitest.config.ts                : new file
.prettierrc                     : new file (or existing .prettierrc)
eslint.config.mjs               : all lines — flat config rewrite
src/env.d.ts                    : new — astro:env client declarations
```
