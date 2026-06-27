# Iteration 1

## File Structure Setup
- [x] Create `src/components/layout/` directory
- [x] Create `src/components/seo/` directory
- [x] Move existing `Header.astro` → `src/components/layout/Header.astro` (full rewrite)
- [x] Move existing `Footer.astro` → `src/components/layout/Footer.astro` (full rewrite)

## src/components/layout/Header.astro — Rewrite
- [x] Import `siteConfig` from `src/config/site.config.ts`
- [x] Import `mainNav` from `src/config/nav.config.ts`
- [x] Render `<Logo>` component (monogram badge or custom image from `branding.logo`)
- [x] Desktop nav: render `mainNav` items; dropdowns for items with `children[]`
- [x] Dropdown: CSS-only hover + focus-within trigger; keyboard accessible
- [x] Mobile: hamburger button (aria-expanded, aria-controls); menu slides in from top
- [x] Render `<LanguageSwitcher>` component
- [x] Render `<ThemeToggle>` component
- [x] Render search button that opens `<SearchModal>`
- [x] Sticky header: `position: sticky; top: 0; z-index: 50`
- [x] Scroll-hide: `data-scrolled` attribute toggled via IntersectionObserver (hide on scroll-down, show on scroll-up)
- [x] Active link highlighting: compare `currentPath` to nav item href

## src/components/layout/Footer.astro — Rewrite
- [x] Import `siteConfig`, `footerNav` from config files
- [x] Render Logo + site description column
- [x] Render 2–3 nav link columns from `footerNav` groups
- [x] Render social icons row: iterate `siteConfig.socialLinks`, infer icon from URL domain
- [x] Use `astro-icon` lucide set for social icons (github, twitter, linkedin, etc.)
- [x] Render legal links (Privacy, Terms) from footerNav.legal group
- [x] Copyright line: `© {new Date().getFullYear()} {siteConfig.name}`

## src/components/layout/SearchModal.astro (new)
- [x] `<dialog id="search-modal">` with backdrop
- [x] Pagefind UI CSS + JS import (conditional — only in production build)
- [x] "Search not available in dev mode" fallback message
- [x] Open on: ⌘K (Mac) / Ctrl+K (Windows/Linux) keyboard shortcut
- [x] Open on: search button click (from Header)
- [x] Close on: Escape key, backdrop click, close button
- [x] Trap focus within modal while open (aria-modal pattern)

## src/components/layout/Analytics.astro (new)
- [x] Conditionally inject GA4 gtag.js if `PUBLIC_GA_MEASUREMENT_ID` is set
- [x] Conditionally inject GTM script if `PUBLIC_GTM_ID` is set
- [x] Conditionally inject Umami script if settings collection has `umamiUrl` + `umamiId`
- [x] All scripts have `async` attribute; no render-blocking

## src/components/layout/ThemeToggle.astro (new)
- [x] Button with sun icon (light mode) / moon icon (dark mode) via astro-icon lucide
- [x] On click: toggle `dark` class on `document.documentElement`
- [x] Persist to `localStorage.setItem('theme', 'dark'|'light')`
- [x] On load: read `localStorage.theme` || `window.matchMedia('prefers-color-scheme: dark')`

## src/components/layout/LanguageSwitcher.astro (new)
- [x] Props: `currentLocale: Locale`, `currentPath: string`
- [x] Extract logic from old `Header.astro` (uses `getEquivalentPath`, `i18n/switcher`)
- [x] Render as button/link with locale label (EN / ID)
- [x] `hreflang` attribute on the link

## src/components/seo/SEO.astro (new)
- [x] Props: `title`, `description`, `ogImage?`, `canonical?`, `article?: { publishedTime, modifiedTime, author, tags }`
- [x] `<title>` with `{title} | {siteConfig.name}` pattern
- [x] `<meta name="description">` 
- [x] OG tags: og:title, og:description, og:image, og:url, og:type, og:site_name
- [x] Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image
- [x] `<link rel="canonical" href={canonical || Astro.url}>`
- [x] Alternate hreflang links for each locale (when i18n enabled)
- [x] Verification meta: google, bing (from `siteConfig.verification`)
- [x] Article-specific tags when `article` prop provided

## src/components/seo/JsonLd.astro (new)
- [x] Props: `schema: object | object[]`
- [x] Render `<script type="application/ld+json">{JSON.stringify(schema)}</script>`
- [x] Handle both single schema and array (multiple schemas in one block)

## src/components/seo/Breadcrumbs.astro (new)
- [x] Props: `crumbs: { label: string; href: string }[]`
- [x] Render `<nav aria-label="Breadcrumb">` with structured `<ol><li>` list
- [x] Auto-inject `<JsonLd>` BreadcrumbList schema
- [x] Style: home icon → separator → crumbs → current page (no link on last)

## Logo Component Stub (src/components/ui/marketing/Logo/)
- [x] `Logo.astro` — letter-monogram badge (first letter of site name) OR custom image if `branding.logo.image` is set
- [x] Used in Header and Footer

## Verification
- [x] Update `src/layouts/BaseLayout.astro` to use new `SEO.astro` and `Analytics.astro`
- [x] Update `src/layouts/MarketingLayout.astro` to use new `Header.astro` and `Footer.astro`
- [x] `astro check` — no TypeScript errors
- [x] `pnpm build` — all components compile
- [ ] Test: keyboard nav through Header dropdowns works
- [ ] Test: mobile menu opens/closes correctly

## Planning Notes
- [x] Finalize component boundaries before implementation starts
- [x] Implement SEO and JSON-LD primitives first
- [x] Refactor ThemeToggle and LanguageSwitcher into isolated components
- [x] Rebuild Header around the new interaction components
- [x] Rework Footer and wire SearchModal into the layout shell
- [x] Re-run `astro check` and `pnpm build` before moving to review
