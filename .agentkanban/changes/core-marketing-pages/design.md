# Design: Core Marketing Pages

## Architecture

Compose public pages from reusable section components backed by typed page data and locale-aware layouts.

## Current State (as of task_004 planning)

**Already implemented (from tasks 001–003):**
- Homepage (`src/pages/index.astro`) with hero CTA
- Base layout with Header/Footer, SEO metadata (canonical, hreflang, JSON-LD, OG)
- i18n routing (`defaultLocale: "id"`, `prefixDefaultLocale: true`) for `/id/*` and `/en/*`
- Translation dictionaries (`src/i18n/ui.ts`) for UI chrome, hero, footer
- Route helpers (`src/i18n/routes.ts`, `src/i18n/switcher.ts`) for equivalent-content switching
- Design tokens in `src/styles/globals.css` (semantic CSS variables, Tailwind)

**To implement in this task:**
- Page routes (`src/pages/`):
  - `/about` — About page with localized content
  - `/services` — Services listing page
  - `/services/[slug]` — Service detail page (stable slug-based routing)
  - `/pricing` — Pricing tiers page
  - `/contact` — Contact page with Google Maps placeholder, form placeholder
  - `/privacy` — Privacy policy page
  - `/terms` — Terms & conditions page

**Shared Section Components (`src/components/`):**
- `Hero.astro` — Reusable hero with i18n support
- `CTA.astro` — Call-to-action section
- `FeatureGrid.astro` — Feature grid with icons
- `FAQ.astro` — FAQ section with schema markup
- `TrustBlock.astro` — Trust indicators

**Service Modeling:**
- Service data type with slug, locale-paired title/description, features
- Service list and detail relationship

**SEO/Structured Data:**
- Organization schema (site-wide)
- Service schema (service detail pages)
- FAQ schema (FAQ sections)
- Breadcrumb schema (all pages)

## Content Collections

### Pages collection (`src/content/pages/`)
- Schema: `locale`, `slug`, `title`, `description`, `sections`, `isLegal`, `order`
- Sections array: `{ type: "hero|cta|features|faq|trust", title?, content?, items? }`
- Locale-paired via `translationKey` frontmatter

### Services collection (`src/content/services/`)
- Schema: `locale`, `slug`, `title`, `description`, `features`, `priceRange`, `order`, `translationKey`
- List → detail via slug-based routing
- Data stored as MDX for future CMS editing

## Interfaces And Contracts

- Each page consumes typed content data that can later map cleanly to CMS collections.
- Services detail pages require stable slugs and locale links.
- Contact page reserves placeholders for maps and form integrations implemented later.
- Footer must use `t(locale, "footer.privacy")` / `t(locale, "footer.terms")` for i18n.
- All nav links must use `resolveRoute(locale, path)` for proper locale-prefixed URLs.

## Data Flow

Locale-aware content data feeds route generation, section rendering, and structured data output during build time.

## Storage And Migrations

- File-based content collections (Markdown/MDX frontmatter with locale pairing via `translationKey`).
- Content collections defined in `src/content.config.ts`:
  - `pages` — public marketing pages (about, services, pricing, contact, legal)
  - `services` — service listings with locale-paired slugs

## Security Model

- No dynamic form processing in this task.
- External embeds, including maps, must use safe placeholders until their secure integration task lands.

## Error And Failure Handling

- Invalid page data fails schema validation.
- Missing related service data fails build-time checks.

## Environment Behavior

- Same public routes across local, preview, and production.

## Backward Compatibility

- Component contracts must remain reusable for blog, docs, and CMS-rendered content.

## Rollback Strategy

- Individual routes and sections can be reverted without affecting auth or CMS systems.

## Testing Approach

- Page rendering tests and accessibility spot checks.
- Link integrity and structured data assertions for core routes.

## Affected Areas

- `src/pages/`
- `src/components/`
- `src/content/`
- structured data helpers.
