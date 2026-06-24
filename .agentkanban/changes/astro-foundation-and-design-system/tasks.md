# Tasks

- [x] Bootstrap the Astro project with pnpm, TypeScript strict mode, and core integrations.
  - [x] Create `astro.config.ts` with Starlight integration and i18n routing
  - [x] Create `tsconfig.json` with strict mode
  - [x] Create `src/` directory scaffold (`layouts/`, `components/ui/`, `pages/`, `styles/`, `lib/`, `i18n/`, `content/`)
  - [x] Create `public/` with placeholder assets
  - [x] Add missing deps: `@astrojs/sitemap`, `@astrojs/rss`, `tailwindcss`, `@tailwindcss/vite`
- [x] Add shared layouts, header, footer, and localized not-found scaffolding.
- [x] Define design tokens, global styles, and reusable UI primitives.
- [x] Add metadata, JSON-LD baseline helpers, sitemap, RSS baseline, and security header stubs.
  - [x] Add `@astrojs/sitemap` integration config
  - [x] Add RSS feed generation stub
- [x] Wire lint, format, type, and build commands for later CI evidence.
  - [x] Fix `lint:css` script with correct path/glob
