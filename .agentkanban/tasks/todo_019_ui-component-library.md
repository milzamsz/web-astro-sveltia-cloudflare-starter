# Iteration 1

## Utility
- [x] Create `src/lib/cn.ts` — `import { clsx } from 'clsx'; import { twMerge } from 'tailwind-merge'; export function cn(...inputs) { return twMerge(clsx(inputs)); }`

## Form Components
- [x] `src/components/ui/form/Button/Button.astro` — CVA variants (primary, secondary, ghost, destructive, link), sizes (sm, md, lg), loading spinner, anchor mode via `href` prop
- [x] `src/components/ui/form/Input/Input.astro` — label, error text, helper text, required indicator, id/name props
- [x] `src/components/ui/form/Textarea/Textarea.astro` — multiline variant of Input, rows prop
- [x] `src/components/ui/form/Select/Select.astro` — native select, custom chevron icon via astro-icon
- [x] `src/components/ui/form/Checkbox/Checkbox.astro` — accessible checkbox + label
- [x] `src/components/ui/form/Switch/Switch.astro` — CSS-only toggle switch
- [x] `src/components/ui/form/index.ts` — barrel export for all form components

## Data Display Components
- [x] `src/components/ui/data-display/Badge/Badge.astro` — CVA variants (default, outline, secondary, destructive), sizes (sm, md)
- [x] `src/components/ui/data-display/Card/Card.astro` — container with header/footer named slots, hover lift variant, border variants
- [x] `src/components/ui/data-display/Avatar/Avatar.astro` — circular image + letter fallback; size prop (sm, md, lg)
- [x] `src/components/ui/data-display/AvatarGroup/AvatarGroup.astro` — stacked avatars + overflow count badge
- [x] `src/components/ui/data-display/Pagination/Pagination.astro` — prev/next buttons + page numbers; active page highlighting; `currentPage`, `totalPages`, `basePath` props
- [x] `src/components/ui/data-display/Table/Table.astro` — styled `<table>` wrapper with zebra rows option
- [x] `src/components/ui/data-display/Skeleton/Skeleton.astro` — animated shimmer; width/height/rounded props
- [x] `src/components/ui/data-display/index.ts` — barrel export

## Feedback Components
- [x] `src/components/ui/feedback/Alert/Alert.astro` — CVA variants (info, success, warning, error); icon via astro-icon lucide; dismissible prop
- [x] `src/components/ui/feedback/index.ts` — barrel export

## Layout Helper Components
- [x] `src/components/ui/layout/Container/Container.astro` — max-width wrapper; size variants (sm, md, lg, xl, full)
- [x] `src/components/ui/layout/Section/Section.astro` — section with spacing variants (sm, md, lg, xl)
- [x] `src/components/ui/layout/Grid/Grid.astro` — responsive grid: cols prop (2, 3, 4), gap prop
- [x] `src/components/ui/layout/index.ts` — barrel export

## Content Components
- [x] `src/components/ui/content/Prose/Prose.astro` — div with Tailwind prose class; size variants; `as` prop for semantic element

## Primitives
- [x] `src/components/ui/primitives/Icon/Icon.astro` — thin wrapper: `<Icon name="lucide:..." />` and `<Icon name="simple-icons:..." />`; size, color props; aria-hidden when decorative

## Marketing Components
- [x] `src/components/ui/marketing/SocialProof/SocialProof.astro` — testimonial card with avatar, quote, author name/role, rating stars
- [x] `src/components/ui/marketing/Logo/Logo.astro` — monogram badge (siteConfig.name[0]) or custom image (siteConfig.branding.logo.image)
- [x] `src/components/ui/marketing/CTA/CTA.astro` — heading + subtext + primary button + optional secondary button; centered/split variants
- [x] `src/components/ui/marketing/index.ts` — barrel export

## Top-level UI Index
- [x] Update `src/components/ui/index.ts` to re-export from all category index files

## Existing Component Upgrades
- [x] `src/components/CTA.astro` — use `<Button>` and `<Section>` from new lib; add `variant` prop
- [x] `src/components/FAQ.astro` — add CSS accordion animation (`details`/`summary`); inject `<JsonLd>` FAQPage schema when entries present
- [x] `src/components/FeatureGrid.astro` — use `<Card>`, `<Icon>`, `<Grid>` components; responsive 2/3 col layout
- [x] `src/components/TrustBlock.astro` — use `<AvatarGroup>`, `<Badge>`, `<Section>`
- [ ] `src/components/Img.astro` — use Astro `<Image>` component; add `loading="lazy"` default, `fetchpriority="high"` for hero images

## Verification
- [x] `astro check` — no TypeScript errors across all new components
- [x] `pnpm lint` — no ESLint errors
- [x] `pnpm build` — all components tree-shake cleanly
