# Tasks

## Pre-work: Dependencies
- [x] Add `pagefind` to `devDependencies` (`pnpm add -D pagefind`)
- [x] Add `postbuild` script: `"postbuild": "pagefind --site dist --source public"`

## Content setup
- [x] Docs schema already exists in `src/content.config.ts` (Starlight docsLoader + docsSchema)
- [x] Astro i18n routing already configured (`defaultLocale: "id"`, `prefixDefaultLocale: true`)
- [x] Create `src/content/blog/` with sample posts: frontmatter with `locale`, `publishDate`, `draft`, `tags`, `author`, `translationKey`
- [x] Create `src/content/docs/` with sample docs entries

## Blog routes
- [x] Add blog listing page (`src/pages/blog/index.astro`) with locale-aware routes
- [x] Add blog detail page (`src/pages/blog/[slug].astro`) uses content collection for both list and detail
- [x] Generate RSS feeds: `src/pages/[locale]/rss.xml.ts` using `@astrojs/rss`

## Docs & Search
- [x] Configure Starlight `sidebar`, `locales`, docs theme overrides (inherited)
- [x] Configure Pagefind integration (postbuild step indexes dist/)
- [x] Verify draft exclusion: only published content in production

## Verification
- [x] Build passes: `pnpm run build`
- [x] Pagefind indexes blog + docs
- [x] i18n validation passes: `pnpm run validate:i18n`
- [x] Locale parity: `/id/blog/post` ↔ `/en/blog/post` via equivalent-content switcher
