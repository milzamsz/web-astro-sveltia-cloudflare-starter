# Iteration 1

## Configuration
- [x] Create `playwright.config.ts` — `baseURL: 'http://127.0.0.1:4321'`, browsers: chromium only, screenshot on failure, video on failure
- [x] Update `vitest.config.ts` — `environment: 'node'`, include `src/__tests__/**/*.test.ts`, `astro:content` stub alias
- [x] Create `src/__tests__/` directory
- [x] Create `src/test/` directory for Playwright specs

## Vitest Unit Tests

### src/__tests__/lib/utils.test.ts
- [x] Test `formatDate(new Date('2025-01-15'), 'en')` → `'January 15, 2025'`
- [x] Test `formatDate(new Date('2025-01-15'), 'id-ID')` → `'15 Januari 2025'`
- [x] Test `slugify('Hello World!')` → `'hello-world'`
- [x] Test `slugify('Apa kabar?')` → `'apa-kabar'`
- [x] Test `truncate('Hello World', 5)` → `'Hello…'`
- [x] Test `truncate('Hi', 10)` → `'Hi'`
- [x] Test `capitalize('hello')` → `'Hello'`
- [x] Test `calcReadingTime('word '.repeat(200))` → `{ minutes: 1, words: 200 }`
- [x] Test `groupBy([{a:1},{a:2},{a:1}], 'a')`

### src/__tests__/lib/tags.test.ts
- [x] Test `countTags` counts occurrences
- [x] Test `sortTagsByCount` sorts by count desc then name
- [x] Test `slugifyTag`
- [x] Test `filterByTag` filters by slug + returns empty on no match

### src/__tests__/lib/blog.test.ts
- [x] Test `paginate` first/middle/last/clamp/empty (5 cases)
- [x] Note: `getCollection`-backed functions not unit-tested (require Astro runtime); pure `paginate` covered

### src/__tests__/lib/schema.test.ts
- [x] Test `buildWebSiteSchema` — `@type: 'WebSite'`, name, url, SearchAction
- [x] Test `buildBlogPostingSchema` — `@type: 'BlogPosting'`, headline, author, datePublished, mainEntityOfPage, keywords, inLanguage
- [x] Test `buildBlogPostingSchema` dateModified fallback to publishDate
- [x] Test `buildFAQSchema` — `@type: 'FAQPage'`, Question/Answer
- [x] Test `buildBreadcrumbSchema` — `@type: 'BreadcrumbList'`, positions
- [x] Test `buildOrganizationSchema`, `buildPersonSchema`, `buildServiceSchema`

### src/__tests__/i18n/ui.test.ts
- [x] Test `t('en', 'nav.home')` → English
- [x] Test `t('id', 'nav.home')` → Indonesian
- [x] Test `t('en', 'nonexistent.key')` → key fallback
- [x] Test `t('id', 'blog.readMore')` → Indonesian
- [x] Test both locale dictionaries present
- [x] Test EN↔ID key-set parity

## Playwright E2E Tests (against `astro preview`)

### src/test/navigation.spec.ts
- [x] Homepage loads, h1 + nav links visible
- [x] Language switcher present with href
- [x] Dark mode toggle flips `dark` class on `<html>`
- [x] Ctrl+K opens search modal, Escape closes
- [x] Mobile menu toggle sets `aria-expanded="true"`

### src/test/blog.spec.ts
- [x] `/blog` renders at least one `.blog-card`
- [x] Clicking `.blog-card__title a` navigates to detail with h1
- [x] `/blog/welcome` renders share buttons

### src/test/services.spec.ts
- [x] `/services` renders at least one `.service-card`
- [x] Clicking `.service-card__title a` navigates to detail with h1

### src/test/contact.spec.ts
- [x] `/contact` renders `#contact-form` with name/email/message fields
- [x] Empty submit keeps `#form-success` hidden
- [x] Filling form keeps submit button enabled

## package.json Script Updates
- [x] `"test": "vitest run"` exists
- [x] `"test:e2e": "playwright test"` exists
- [x] `"test:coverage": "vitest run --coverage"` added

## Verification
- [x] `pnpm test` — 5 files, 38 tests passed
- [x] `pnpm test:e2e` — 13 passed (requires `pnpm build` first; config uses `astro preview`)
- [x] `pnpm astro check` — 0 errors
- [x] `pnpm run lint:js` — 0 errors
- [x] `pnpm build` — 56 pages, exit 0
