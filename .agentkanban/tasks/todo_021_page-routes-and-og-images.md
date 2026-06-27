# Iteration 1

## Homepage — src/pages/index.astro
- [x] Switch to `<MarketingLayout>` wrapper
- [x] Add `<SEO>` with homepage-specific OG image
- [x] Section 1: `<Hero variant="centered">` with headline, subheadline, CTA pair
- [x] Section 2: `<FeatureTabs>` (React, `client:load`) with 3–4 features from site config
- [x] Section 3: `<StackMarquee>` fed by stack collection entries
- [x] Section 4: `<Credibility>` with site stats
- [x] Section 5: `<LighthouseScores>` (static 100/100/100/100 defaults)
- [x] Section 6: `<FAQ>` with JSON-LD schema injection
- [x] Section 7: `<CTA>` with primary CTA button

## Blog Listing — src/pages/blog.astro
- [ ] Import `getAllPosts()`, `getFeaturedPosts()`, `getAllTags()` from `src/lib/blog.ts`
- [x] Render featured post highlight (first featured post as large hero card)
- [x] Render `<BlogCard>` grid for non-featured posts
- [x] Render tag cloud sidebar using `<Badge>` links
- [x] Render `<Pagination>` with `postsPerPage` from `site.config.blog`
- [x] Handle `?tag=` query param for tag filtering
- [x] SEO: title, description, OG image

## Blog Listing Pagination — src/pages/blog/[...page].astro (new)
- [ ] Use `paginate()` from Astro
- [ ] Render same layout as `blog.astro` with current page posts

## Blog Detail — src/pages/blog/[slug].astro
- [x] Switch to `<BlogLayout>` 
- [x] Pass `post` entry to layout (handles TOC, share buttons, related posts internally)
- [x] Pass `headings` to layout for TOC
- [x] Render `<Content />` (MDX/MD content) inside Prose wrapper
- [x] Pass SEO props: title, description, ogImage (use `/og/{slug}` if no explicit image)
- [x] Handle locale routing (check if under `[locale]/` prefix)

## Services Listing — src/pages/services.astro
- [x] Import all service entries from collection
- [x] Render page hero (title + description)
- [x] Render `<ServiceCard>` grid (2–3 cols responsive)
- [ ] Tag filtering support
- [x] SEO meta

## Service Detail — src/pages/services/[slug].astro
- [x] Use `<ServiceLayout>`
- [x] Pass service entry data to layout
- [x] Render `<Content />` for MDX body
- [x] Pass SEO props

## Dynamic OG Images — src/pages/og/[...slug].ts
- [x] `getStaticPaths()` — collect all blog, service, and static page slugs
- [x] SVG template: 1200×630, site brand colors (blue palette), title text, description text (truncated), site name + logo
- [x] Use Astro's built-in `@astrojs/og` or manual SVG→PNG with `sharp`
- [x] Return `Response` with `Content-Type: image/png` (or `image/svg+xml`)
- [ ] Fallback: `/og-default.svg` in public/ for pages with no dynamic OG

## Dynamic Robots.txt — src/pages/robots.txt.ts
- [x] Convert from static to dynamic TypeScript route
- [x] Allow: `User-agent: *`, `Allow: /`
- [x] Disallow: `/admin/`, `/api/`, `/.agentkanban/`
- [x] Add: `Sitemap: {SITE_URL}/sitemap-index.xml`

## RSS Feed — src/pages/rss.xml.ts
- [x] Convert from `rss.xml.js` → `rss.xml.ts`
- [ ] Import `getAllPosts()` from `src/lib/blog.ts`
- [x] Include both `.md` and `.mdx` posts
- [x] Filter to default locale posts only
- [x] Include `featured` flag in custom RSS item data
- [x] Correct `pubDate`, `author`, `enclosure` (image if present)

## Contact Page — src/pages/contact.astro
- [ ] Upgrade form action to submit to Cloudflare Function endpoint
- [ ] Update Cloudflare Function `functions/api/contact.ts` to use `resend` SDK
- [ ] Add Turnstile widget (conditional on env var `PUBLIC_TURNSTILE_SITE_KEY`)
- [ ] Render map section (conditional on `PUBLIC_GOOGLE_MAPS_API_KEY`)
- [ ] Success/error states via URL params

## Verification
- [x] `astro check` — no TypeScript errors
- [x] `pnpm build` — all routes generate without errors
- [ ] Visit `/` — all sections render
- [ ] Visit `/blog` — posts list, pagination, tag filter
- [ ] Visit `/blog/[slug]` — TOC, content, share buttons, related posts
- [ ] Visit `/services` — service cards grid
- [ ] Visit `/services/[slug]` — full service detail
- [ ] Visit `/og/blog-post-slug` — returns image
- [ ] Visit `/robots.txt` — correct output
- [ ] Visit `/rss.xml` — validates
