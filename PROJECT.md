# PROJECT.md

> **Highest-priority overrides.** When this file conflicts with `AGENTS.md`,
> `system/globals/`, or any tool config, **this file wins.** Keep it short and
> specific to *your* project. Defaults below describe the starter as shipped.

## Identity

- **Name:** Astro Sveltia Cloudflare (rename to your project).
- **Type:** multilingual marketing site (company / blog / portfolio / landing).
- **Not for:** dashboards or app-heavy products.

## Brand & design overrides

- **Palette:** monochrome OKLCH (neutral). To rebrand, put your brand in
  `DESIGN.md` and translate it into `src/styles/tokens/colors.css` — never inline.
- **Tone:** calm, editorial, high-contrast, generous spacing.
- Keep functional status colors (success/warning/destructive) chromatic; everything
  else neutral.

## Non-negotiables (do not break)

- i18n: English (default, no prefix) + Indonesian (`/id/`). Every route exists in
  both locales.
- Content: Sveltia CMS collections (blog, services, pages, faqs, stack, authors,
  settings). Don't bypass the content layer.
- Platform: Cloudflare Pages + Functions, BetterAuth (D1/R2/2FA).
- SEO: OG image generation, JSON-LD, sitemap, RSS, robots, llms.txt, Pagefind.
- Docs: Starlight under `/docs`.

## Conventions

- Compose pages from `src/components/sections/**`.
- Run `pnpm lint` (includes `check:kpis`) before declaring work done.
- Add new sections to `src/components/sections/index.ts` and `src/registry.json`.

## Project-specific notes

<!-- Add anything an agent must know about THIS project here. -->
- _e.g. "Primary CTA always points to /contact."_
- _e.g. "Never add a cookie banner; we don't use tracking."_
