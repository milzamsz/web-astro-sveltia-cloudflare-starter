# Iteration 1

## src/lib/blog.ts
- [x] `getAllPosts(locale?: string)` — fetch all blog entries, filter by locale if provided, sort by publishDate DESC, exclude drafts in production
- [x] `getFeaturedPosts(limit = 3, locale?: string)` — filter `featured: true`, sort, limit
- [x] `getPostsByTag(tag: string, locale?: string)` — filter posts containing tag
- [x] `getRelatedPosts(currentId: string, tags: string[], limit = 3)` — find posts sharing tags, exclude current
- [x] `getAllTags(locale?: string)` — collect all unique tags with counts `{ tag: string; count: number }[]`
- [x] `getTopTags(limit: number, locale?: string)` — top N tags by post count
- [x] `getPostBySlug(slug: string)` — find post by entry id
- [x] `getPostByUid(uid: string)` — find post by stable `uid` field
- [x] `calcReadingTime(text: string)` — word count / 200 wpm, returns `{ minutes: number; words: number }`
- [x] `paginate(posts[], page: number, perPage: number)` — slice + metadata `{ posts, currentPage, totalPages, hasNext, hasPrev }`

## src/lib/services.ts
- [x] `getAllServices(locale?: string)` — fetch all service entries, sort by `order` then title
- [x] `getFeaturedServices(limit = 3)` — filter `featured: true`
- [x] `getServicesByTag(tag: string)` — filter by tag
- [x] `getAllServiceTags()` — collect unique tags with counts
- [x] `getServiceBySlug(slug: string)` — find by entry id

## src/lib/tags.ts
- [x] `countTags(entries: {tags: string[]}[])` — aggregate tag counts from any collection
- [x] `sortTagsByCount(tagCounts: Record<string, number>)` — sort descending
- [x] `slugifyTag(tag: string)` — lowercase, replace spaces with `-`
- [x] `filterByTag(entries, tag: string)` — generic filter for any collection with `tags[]`

## src/lib/schema.ts
- [x] Import types from `schema-dts`
- [x] `buildWebSiteSchema(siteConfig)` — WebSite with SearchAction (Pagefind)
- [x] `buildOrganizationSchema(siteConfig)` — Organization with logo, contactPoint, sameAs (social links)
- [x] `buildPersonSchema(author, siteConfig)` — Person with name, url, sameAs
- [x] `buildBlogPostingSchema(post, siteConfig)` — BlogPosting with all required fields, author, image, datePublished, dateModified
- [x] `buildFAQSchema(faqs: {question, answer}[])` — FAQPage with acceptedAnswer
- [x] `buildBreadcrumbSchema(crumbs: {label, href}[])` — BreadcrumbList with ListItem
- [x] `buildServiceSchema(service, siteConfig)` — Service schema with provider, areaServed

## src/lib/og.ts
- [x] `buildOGSVG(opts: { title, description?, siteName, bgColor?, textColor? })` — returns SVG string (1200×630)
- [x] `renderOGPNG(svg: string)` — uses `sharp` to convert SVG buffer → PNG buffer
- [x] `buildOGResponse(svg: string)` — returns Astro `Response` with correct Content-Type and cache headers

## src/lib/post-links.ts
- [x] `resolvePostByUid(uid: string, posts: BlogEntry[])` — find post by `uid` field, fallback to slug match
- [x] `buildPostHref(post: BlogEntry, locale: string)` — construct correct localized href
- [x] `buildServiceHref(service: ServiceEntry, locale: string)` — same for services

## src/lib/content-validation.ts
- [x] `validateNoDuplicateSlugs(entries: {id}[])` — warn to console if duplicate ids found during build
- [x] `validateNoDuplicateUids(entries: {uid?}[])` — warn if duplicate `uid` values
- [x] `validateLocaleConsistency(entries, supportedLocales)` — warn if any entry has unsupported locale
- [x] Export `runContentValidation()` called from `astro:build:start` hook

## src/lib/gallery.ts
- [x] `isVideoSlide(slide)` — type guard: `slide.video !== undefined`
- [x] `isImageSlide(slide)` — type guard: `slide.src !== undefined`
- [x] `getGallerySlides(entry)` — returns typed slide array from service gallery field

## src/lib/utils.ts
- [x] `formatDate(date: Date, locale: string)` — `Intl.DateTimeFormat` with `{ year: 'numeric', month: 'long', day: 'numeric' }`
- [x] `formatDateShort(date: Date, locale: string)` — shorter format: `MMM DD, YYYY`
- [x] `slugify(str: string)` — lowercase, remove accents, replace spaces with `-`, strip special chars
- [x] `truncate(str: string, n: number, ellipsis = '…')` — truncate to n chars, break at word boundary
- [x] `capitalize(str: string)` — first letter uppercase
- [x] `groupBy<T>(arr: T[], key: keyof T)` — generic groupBy returning `Record<string, T[]>`
- [x] `calcReadingTime(content: string)` — alias/re-export from blog.ts

## src/lib/seo.ts — Extension
- [x] `buildPageTitle(title: string, siteName: string)` — `{title} | {siteName}` with 60 char truncation
- [x] `buildOpenGraphMeta(opts)` — returns OG meta object for use in `<SEO>` component
- [x] Update existing SEO helpers to import from `siteConfig` instead of old `SITE_CONFIG`

## Verification
- [x] `astro check` — no TypeScript errors in any lib file
- [ ] `pnpm test` — unit tests pass (Phase 11 adds tests for these)
- [x] `pnpm build` — no runtime errors from lib imports
