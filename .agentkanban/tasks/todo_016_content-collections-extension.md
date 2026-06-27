# Iteration 1

## content.config.ts Updates

### Locale Schema
- [ ] Replace hardcoded `z.enum(["id","en"])` with dynamic schema from `i18nConfig.locales`
- [ ] Import `i18nConfig` from `./config/i18n.config`

### Blog Collection
- [ ] Extend glob: `**/*.{md,mdx}` (was `**/*.md`)
- [ ] Add `updatedAt: z.coerce.date().optional()`
- [ ] Add `featured: z.boolean().default(false)`
- [ ] Add `uid: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional()`
- [ ] Add `faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional()`
- [ ] Add `toc: z.boolean().optional()` (per-post override)
- [ ] Add `svgSlug: z.string().optional()`
- [ ] Keep all existing fields unchanged (title, description, locale, publishDate, draft, tags, author, translationKey)

### Authors Collection (new)
- [ ] Define collection with glob `**/*.json` from `./src/content/authors`
- [ ] Schema: `name: string`, `bio: string`, `avatar: image().optional()`, `social: { twitter?, github?, linkedin? }.optional()`

### FAQs Collection (new)
- [ ] Define collection with glob `**/*.json` from `./src/content/faqs`
- [ ] Schema: `question: string`, `answer: string`, `category: string.optional()`, `order: number.default(0)`, `locale: localeSchema`

### Stack Collection (new)
- [ ] Define collection with glob `**/*.{md,mdx}` from `./src/content/stack`
- [ ] Schema: `name: string`, `description: string`, `version: string`, `url: string.url()`, `icon: string`, `colorOklch: string`, `order: number.default(0)`

### Services Collection
- [ ] Add `image: image().optional()`
- [ ] Add `featured: z.boolean().default(false)`
- [ ] Add `tags: z.array(z.string()).default([])`
- [ ] Keep all existing fields unchanged

### exports
- [ ] Add `authors`, `faqs`, `stack` to `export const collections {}`

## Sample Content Files
- [ ] `src/content/authors/admin.json` — sample author (name, bio, social links)
- [ ] `src/content/faqs/general-en.json` — 2–3 FAQ entries in English
- [ ] `src/content/faqs/general-id.json` — same FAQ entries in Indonesian
- [ ] `src/content/stack/astro.md` — Astro stack entry with icon + color
- [ ] `src/content/stack/tailwindcss.md` — Tailwind stack entry
- [ ] `src/content/stack/cloudflare.md` — Cloudflare stack entry

## Regression Check
- [ ] Verify existing blog posts in `src/content/blog/` still load without errors
- [ ] Verify existing pages collection still loads
- [ ] Verify existing services collection still loads
- [ ] `astro check` — no type errors
- [ ] `pnpm build` — content layer builds all 7 collections successfully
