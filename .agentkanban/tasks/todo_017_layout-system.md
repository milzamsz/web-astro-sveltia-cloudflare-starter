# Iteration 1

## BaseLayout.astro — Major Overhaul
- [x] Add inline non-blocking dark mode bootstrap script (reads localStorage, applies `dark` class to `<html>` before render)
- [x] Add `lang` attribute to `<html>` from `currentLocale` prop
- [ ] Add font preload `<link rel="preload">` hints for Fontsource woff2 files
- [x] Add `<a href="#main-content" class="skip-link">Skip to content</a>` as first body child
- [x] Add `<main id="main-content">` wrapper around `<slot />`
- [x] Add `<SEO>` component slot (accepts `title`, `description`, `ogImage`, `article` props)
- [x] Add `<Analytics>` component slot (conditional on `PUBLIC_GA_MEASUREMENT_ID` / `PUBLIC_GTM_ID`)
- [x] Accept optional `themeToggle` prop for `<ThemeToggle>` button in header area
- [x] Ensure `global.css` import uses new filename

## src/layouts/BlogLayout.astro (new)
- [x] Props: `post` (blog entry), `locale: Locale`
- [x] Render `<BaseLayout>` as parent
- [x] Import and render `<SEO>` with article-specific OG data
- [ ] Render `<ArticleHero>` component (Phase 6)
- [x] Conditionally render `<TableOfContents>` (inline variant when `layout: 'inline'`, sidebar when `layout: 'sidebar'`/`'auto'`; respects `site.config.articleFeatures.toc`)
- [x] Render `<Prose>` wrapper around `<slot />` (content)
- [ ] Render `<ShareButtons>` below content
- [x] Render `<RelatedPosts>` section
- [x] Inject `<JsonLd>` BlogPosting schema
- [x] Inject `<JsonLd>` FAQPage schema if post has `faqs` field
- [x] Add reading-time estimate to hero (words / 200 wpm)

## src/layouts/PageLayout.astro (new)
- [x] Props: `title`, `description`, `locale: Locale`, `breadcrumbs?: {label, href}[]`
- [x] Render `<BaseLayout>` as parent
- [x] Render `<SEO>` component
- [x] Render `<Breadcrumbs>` if `breadcrumbs` prop provided
- [x] Render page hero (h1 + description)
- [x] Render `<Prose>` wrapper around `<slot />`
- [x] Inject `<JsonLd>` BreadcrumbList if breadcrumbs provided

## src/layouts/ServiceLayout.astro (new — replaces ProjectLayout)
- [x] Props: `service` (service entry data), `locale: Locale`
- [x] Render `<BaseLayout>` + `<SEO>`
- [x] Render service hero (title, description, optional image)
- [x] Render meta strip (tags, features list, priceRange)
- [x] Optionally render `<TableOfContents>` (same config as blog)
- [x] Render `<Prose>` content area
- [x] Inject `<JsonLd>` structured data (Service schema)

## src/layouts/LandingLayout.astro (new)
- [x] Minimal layout: `<BaseLayout>` + `<SEO>` + `<slot />` — no header nav links, no footer nav
- [x] Suitable for dedicated landing / campaign pages

## src/layouts/MarketingLayout.astro (new)
- [x] Standard: `<BaseLayout>` → `<Header>` → `<main><slot /></main>` → `<Footer>`
- [x] Used by most marketing pages (homepage, about, blog listing, contact)

## Verification
- [x] `astro check` — no TypeScript errors in any layout
- [x] Update `src/pages/blog/[slug].astro` to use `BlogLayout`
- [x] Update `src/pages/index.astro` to use `MarketingLayout`
- [x] `pnpm build` — all 6 layouts compile cleanly
