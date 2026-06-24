# Design: Astro Foundation And Design System

## Architecture

Use one Astro workspace as the canonical application, with Starlight mounted inside it and shared utilities providing page layout, metadata, and styling primitives.

## Components And Boundaries

- Astro config and integrations.
- Shared layouts for marketing pages, blog, docs chrome, and error pages.
- Token-driven styling using CSS variables and scoped component styles.
- Build utilities for sitemap, RSS baseline, metadata, and security headers.

## Interfaces And Contracts

- Layout components accept locale-aware metadata and navigation data.
- SEO helpers generate canonical, Open Graph, and JSON-LD stubs for later tasks.
- Design tokens define colors, spacing, typography, and semantic elevations.

## Data Flow

Content collections and frontmatter feed layouts and helper utilities during static build generation.

## Storage And Migrations

- File-based content only at this stage.

## Security Model

- Public shell must emit secure headers and avoid inline script patterns that complicate CSP later.

## Error And Failure Handling

- Unknown routes render localized 404 pages.
- Missing config values fail at build time rather than silently degrading.

## Environment Behavior

- Local and CI use the same Astro build pipeline.
- Preview and production differ only by environment variables and Cloudflare bindings added later.

## Backward Compatibility

- New foundation must remain extensible for later CMS and auth work without changing public URLs.

## Rollback Strategy

- Foundation changes are isolated to framework and shared UI files.

## Testing Approach

- Add build, lint, formatting, and Astro check commands.
- Verify static output and minimal accessibility expectations for the shared shell.

## Affected Areas

- `astro.config.*`
- `src/layouts/`
- `src/components/ui/`
- `public/`
- package/tooling config files.
