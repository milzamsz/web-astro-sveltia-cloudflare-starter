# Iteration 1

## Hero Component
- [x] `src/components/hero/Hero.astro` — Props: `variant: 'centered'|'split'|'minimal'`, `eyebrow?`, `headline`, `subheadline?`, `primaryCta?: {label, href}`, `secondaryCta?: {label, href}`, `image?`
- [x] Centered variant: all content centered, headline large (text-5xl+), buttons row
- [x] Split variant: content left column, image/slot right column
- [x] Minimal variant: compact, no image, focused headline + single CTA
- [x] `src/components/hero/hero.variants.ts` — CVA config for variant classes
- [x] `src/components/hero/index.ts` — barrel export

## Blog Components
- [x] `src/components/blog/BlogCard.astro` — Props: `post` (blog entry), `variant: 'grid'|'list'`; render image or `<BlogImageSVG>` fallback; title, excerpt (150 chars), author, date, readingTime, `<TagList>`
- [x] `src/components/blog/ArticleHero.astro` — Props: `post`; render hero image or SVG; h1 title; author avatar + name; pub date; reading time; `<TagList>`
- [x] `src/components/blog/TableOfContents.astro` — Props: `headings` (from Astro's `getHeadings()`), `layout: 'inline'|'sidebar'`, `maxDepth`, `minHeadings`; inline: renders collapsible card above content; sidebar: renders sticky fixed aside; active heading highlighted via IntersectionObserver
- [x] `src/components/blog/ShareButtons.astro` — Props: `url`, `title`; buttons: Web Share API (if available), Twitter/X share URL, LinkedIn share URL, copy-to-clipboard; use `<Icon>` lucide set
- [x] `src/components/blog/RelatedPosts.astro` — Props: `currentPost`, `allPosts`, `limit?: 3`; select posts sharing ≥1 tag; render row of `<BlogCard variant="list">`
- [x] `src/components/blog/TagList.astro` — Props: `tags: string[]`, `basePath: '/blog'`; render `<Badge>` chips with link to `{basePath}?tag={slug}`
- [x] `src/components/blog/BlogImageSVG.astro` — Props: `slug`, `title`; generate deterministic SVG pattern from slug hash (geometry/color combo); no external deps
- [x] `src/components/blog/index.ts` — barrel export for all blog components

## Service Components (replaces Rocket "projects")
- [x] Create `src/components/services/` directory
- [x] `src/components/services/ServiceCard.astro` — Props: `service` (service collection entry); title, description, tags, priceRange badge, features list preview, "Learn more" CTA link; hover lift using `<Card>`
- [x] `src/components/services/index.ts` — barrel export

## Landing Section Components
- [x] `src/components/landing/FeatureTabs.tsx` — React component; Props: `tabs: { id, icon, heading, description, visual }[]`; tab state with `useState`; animated tab indicator; keyboard accessible (arrow keys)
- [x] `src/components/landing/StackMarquee.astro` — Props: `items` (from stack collection); CSS infinite marquee animation (two copies for seamless loop); each item: `<Icon>` + name + version; `pauseOnHover`
- [x] `src/components/landing/TechStack.astro` — Props: `items` (from stack collection); grid layout; each item: icon in colored circle (from `colorOklch`), name, version, link
- [x] `src/components/landing/LighthouseScores.astro` — Props: `scores: { performance, accessibility, bestPractices, seo }` (with defaults 100/100/100/100); circular score gauges with color coding (green ≥90, amber 50–89, red <50)
- [x] `src/components/landing/Credibility.astro` — Props: `stats?: {value, label}[]`, `testimonials?: {quote, author, role, avatar?}[]`, `logos?: {name, src}[]`; render stats row + optional testimonials grid + optional client logo strip
- [x] `src/components/landing/index.ts` — barrel export

## Verification
- [x] `astro check` — no TypeScript errors in any component
- [x] `pnpm build` — all components compile (including React `FeatureTabs.tsx`)
- [ ] Hero renders all 3 variants without layout breaks
- [ ] `StackMarquee` animation plays smoothly in browser
- [ ] `TableOfContents` IntersectionObserver highlights correct heading during scroll
