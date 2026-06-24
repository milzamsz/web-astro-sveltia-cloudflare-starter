# Design: Blog Docs And Search Experience

## Architecture

Use Astro content collections for blog content and Starlight for docs, with shared locale utilities and a Pagefind build step for public search.

## Current State (as of task_005 planning)

**Already implemented (from tasks 001–003):**
- Starlight integrated in `astro.config.ts` (uses Astro i18n config for locales)
- `src/content.config.ts` with `docs` collection and Starlight schema
- i18n routing (`defaultLocale: "id"`, `prefixDefaultLocale: true`)
- Translation dictionaries, route helpers, SEO helpers
- Design tokens and shared layouts

**To implement in this task:**
- Blog content collection schema (posts, authors, categories, tags)
- Blog listing page (`/blog`) with pagination
- Blog detail page (`/blog/[slug]`) with article metadata
- RSS feed generation for both locales
- Starlight docs content directory and localization
- Pagefind search integration for public blog and docs
- Draft exclusion rules (only published content in production)

## Components And Boundaries

- Blog schemas for posts, authors, categories, and tags.
- Starlight docs configuration and localized navigation.
- Search integration that indexes static output after build.
- SEO helpers for article, breadcrumb, and feed metadata.

## Interfaces And Contracts

- Blog posts expose locale pairing, publish state, taxonomy, and summary metadata.
- Docs content follows localized path conventions compatible with Starlight.
- Search excludes drafts, preview-only pages, admin/auth routes, and other noindex surfaces.
- RSS feeds generated per locale (`/blog/rss.xml` for each locale prefix).

## Data Flow

Content collections feed blog routes and RSS; Starlight builds docs; Pagefind indexes the resulting public files.

## Storage And Migrations

- File-based content collections only (`src/content/blog/`, `src/content/docs/`).
- Blog frontmatter: `title`, `description`, `locale`, `publishDate`, `draft`, `tags`, `author`, `translationKey` (for locale pairing).
- Docs content follows Starlight's built-in `sidebar` and locale conventions.

## Security Model

- Search artifacts include only public content and no protected preview URLs.
- Draft content excluded from production build.

## Error And Failure Handling

- Invalid taxonomy or broken locale pairing fails validation.
- Empty related-post relationships degrade gracefully instead of breaking builds.

## Environment Behavior

- Local and preview can index public content for testing, but preview-specific noindex behavior is enforced later.

## Backward Compatibility

- Content models should remain stable for future CMS authoring.

## Rollback Strategy

- Blog, docs, and search integration stay isolated to content and build layers.

## Testing Approach

- Schema validation, route tests, RSS assertions, and search smoke tests.

## Affected Areas

- `src/content/blog/`
- `src/content/docs/`
- Starlight config and docs theme overrides.
- search scripts/config.
