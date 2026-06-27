---
objective: "Refine astro-sveltia-cloudflare boilerplate using Astro Rocket v2.0 as reference — upgrade tooling, design system, component library, layouts, content collections, routing, testing."
created: 2026-06-26T09:30:00Z
---

# Goal: Astro Rocket Refinement

## Objective
Transform the `astro-sveltia-cloudflare` boilerplate from a minimal MVP into a production-grade, feature-rich Astro 7 starter by absorbing best-of patterns from Astro Rocket v2.0, while keeping our unique strengths: Sveltia CMS, Cloudflare Pages adapter, BetterAuth, YAML-driven content, and Starlight docs.

## Acceptance Criteria

- [ ] All new dependencies installed and building cleanly
- [ ] Design system expanded with CSS token architecture, Fontsource fonts, dark mode
- [ ] Centralized `src/config/` architecture with typed `SiteConfig`, i18n, nav, consent configs
- [ ] Content collections extended: blog (MDX support, featured, TOC, uid), authors, faqs, stack, services enhanced
- [ ] Full layout system: BaseLayout, BlogLayout, PageLayout, ServiceLayout, LandingLayout, MarketingLayout
- [ ] 30+ UI components: Button, Input, Badge, Card, Avatar, Pagination, Alert, Skeleton, Icon, Prose, etc.
- [ ] Blog components: BlogCard, ArticleHero, TOC, ShareButtons, RelatedPosts, TagList
- [ ] Landing components: Hero, FeatureTabs (React), StackMarquee, Credibility, LighthouseScores
- [ ] Service components: ServiceCard, ServiceLayout
- [ ] Layout + SEO components: Header (dropdown, mobile, dark mode, search), Footer (multi-col), SearchModal, Analytics, ThemeToggle, SEO, JsonLd, Breadcrumbs
- [ ] All pages rebuilt with new layouts and components
- [ ] Dynamic OG image generation per page
- [ ] Dynamic robots.txt respecting SITE_URL
- [ ] RSS feed updated to TypeScript + MDX support
- [ ] 10+ lib utilities: blog.ts, services.ts, schema.ts, og.ts, utils.ts, cn.ts, etc.
- [ ] Full EN/ID i18n coverage for all new components
- [ ] Vitest unit tests passing (20+ assertions across 4 test files)
- [ ] Playwright E2E tests passing (navigation, blog, services, contact)
- [ ] `pnpm build` succeeds with no TypeScript errors
- [ ] Lighthouse: Performance ≥ 95, SEO 100, Accessibility 100

## Key Decisions
- **Single blue palette** — no multi-theme picker
- **Services** — not "projects" (matches boilerplate domain)
- **Skip**: cursor trail effect, Giscus/Cusdis comments, PWA manifest
- **Include**: Vitest + Playwright testing
- **Keep**: Cloudflare adapter, Starlight docs, BetterAuth, Sveltia CMS

## Metrics
- New files: ~110
- Modified files: ~20
- Test coverage target: ≥80% for lib utilities
- Build time target: <60s

## Child Tasks

| Phase | Task | Slug |
|---|---|---|
| 1 | Tooling & Integrations | tooling-and-integrations-upgrade |
| 2 | Design System | design-system-and-theming |
| 3 | Config Architecture | configuration-architecture |
| 4 | Content Collections | content-collections-extension |
| 5 | Layout System | layout-system |
| 6 | Layout & SEO Components | layout-and-seo-components |
| 7 | UI Component Library | ui-component-library |
| 8 | Blog & Service Components | blog-and-service-page-components |
| 9 | Page Routes & OG Images | page-routes-and-og-images |
| 10 | Library Utilities | library-utilities |
| 11 | i18n Refinement | i18n-refinement |
| 12 | Testing Infrastructure | testing-infrastructure |
