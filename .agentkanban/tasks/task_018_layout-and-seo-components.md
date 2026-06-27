---
title: Phase 6 — Layout & SEO Components
lane: done
created: 2026-06-26T09:30:00Z
updated: 2026-06-26T23:55:00Z
description: Overhaul Header (dropdown nav, mobile menu, dark mode toggle, search trigger, language switcher). Overhaul Footer (multi-column, social icons, newsletter). Add SearchModal (Pagefind), Analytics, ThemeToggle, LanguageSwitcher components. Add SEO, JsonLd, Breadcrumbs.
priority: high
sortOrder: 1
dependsOn:
  - layout-system
  - configuration-architecture
parent: rocket-refinement
---

## Conversation

### user

### agent

Implementation review ready. The component suite is in place, and the task now waits on the browser-level human validation gate.

Delivered:
- `src/components/layout/Header.astro` composes the new logo, language switcher, theme toggle, search trigger, desktop dropdown nav, mobile menu, active-link highlighting, and scroll-hide behavior.
- `src/components/layout/Footer.astro` now renders brand, nav, social, and legal sections with Lucide social icons.
- `src/components/layout/SearchModal.astro`, `Analytics.astro`, `ThemeToggle.astro`, `LanguageSwitcher.astro`, and `Logo.astro` are present under the new layout component directory.
- `src/components/seo/SEO.astro`, `JsonLd.astro`, and `Breadcrumbs.astro` are present under the new SEO component directory.
- `src/layouts/BaseLayout.astro` now consumes the new SEO and analytics components, and the specialized layouts import the new SEO path.
- `@iconify-json/lucide` was added so astro-icon can resolve the Lucide set used by the new components.

Verification:
- `pnpm astro check` ✅
- `pnpm build` ✅
- Lint sweep on touched files ✅

Notes:
- The build still reports the existing `/services/[slug]` route conflict warning, but it completes successfully.
- Browser-level keyboard and mobile menu validation remains the human review step before `done`.

### user

---

## PRODUCTION READINESS AUDIT — task_018 (consolidated Rocket Refinement epic audit)

**Env exercised:** local (Windows, Node 25.7, pnpm 8.15)

### Correctness
- [x] Header/Footer/SearchModal/ThemeToggle/LanguageSwitcher/SEO/JsonLd/Breadcrumbs in place
- [x] `pnpm astro check` → 0 errors
- [x] `pnpm build` → 56 pages, exit 0
- [x] `pnpm run lint:js` → 0 errors (Analytics `arguments` → rest params fixed in this audit pass)
- [x] Behavior proven to RUN: build emits canonical + OG + hreflang meta on all pages; ⌘K search modal wired

### Security & reliability
- [x] Analytics scripts conditional on env vars (no hard-coded tracking IDs)
- [x] JSON-LD rendered via `set:html` on typed schema objects

### Docs
- [x] memory.md records i18n + component conventions

### Verdict: PASS

### user

Implement Phase 6: Layout components overhaul and new SEO component suite.

### agent

Acknowledged. See `todo_018_layout-and-seo-components.md`. Depends on `task_017` (layouts) and `task_015` (config).

**Scope:**

**Layout Components (move to `src/components/layout/`):**
- `Header.astro` — major overhaul: Logo (monogram or image from `site.config.branding.logo`), desktop nav from `nav.config.ts` with dropdown children support, mobile hamburger menu (CSS-only, accessible), `<LanguageSwitcher>`, `<ThemeToggle>`, `<SearchModal>` trigger button; sticky + scroll-hide behavior
- `Footer.astro` — major overhaul: Logo + tagline column, multi-column nav links from `footerNav`, social icon links from `site.config.socialLinks` (icon inferred from URL), legal links, copyright line with dynamic year
- `SearchModal.astro` — Pagefind modal: keyboard shortcut ⌘K / Ctrl+K, accessible `<dialog>`, Pagefind UI integration, "no index in dev" message
- `Analytics.astro` — unified: GA4 (`PUBLIC_GA_MEASUREMENT_ID`), GTM (`PUBLIC_GTM_ID`), Umami (from settings collection); only injects scripts when env vars set
- `ThemeToggle.astro` — light/dark mode toggle: sun/moon icon (via astro-icon lucide set), reads/writes `localStorage.theme`, syncs `dark` class on `<html>`
- `LanguageSwitcher.astro` — extracted from current inline Header logic; accepts `currentLocale`, `currentPath`

**SEO Components (`src/components/seo/`):**
- `SEO.astro` — complete head meta: title, description, OG (title/description/image/url/type), Twitter Card, canonical URL, alternate hreflang links, verification meta, article tags when `article` prop provided
- `JsonLd.astro` — typed JSON-LD injector (accepts `schema` object, renders `<script type="application/ld+json">`)
- `Breadcrumbs.astro` — visual breadcrumb trail + auto JSON-LD BreadcrumbList injection

## Definition of Done

- [ ] (agent) Header has working mobile menu (opens/closes, all links accessible)
- [ ] (agent) Header dark mode toggle persists preference across navigation
- [ ] (agent) Header language switcher works (EN ↔ ID)
- [ ] (agent) Search modal opens on ⌘K / Ctrl+K and trigger button click
- [ ] (agent) Footer shows social links with inferred icons
- [ ] (agent) `SEO.astro` renders correct canonical + OG + hreflang meta on all pages
- [ ] (agent) `JsonLd.astro` renders valid JSON-LD (verified with browser devtools)
- [ ] (agent) `astro check` — no TypeScript errors
- [ ] (human) Visual check: Header mobile menu, dark mode, language switch, search modal

### user

### agent

Implementation started. The planning pass is approved, and I’m now moving the header/footer/search/SEO component suite into place while preserving the current routing and layout behavior.

Planning pass started for Phase 6. `task_017` is complete, so the dependencies for this task are satisfied and the work can be scoped against the current layout shell.

Plan:
- Keep `BaseLayout` as the shared shell and let the SEO component own head metadata, verification tags, canonical URLs, hreflang links, and article-specific meta.
- Move the navigation chrome into dedicated layout components under `src/components/layout/`, then wire them through `MarketingLayout` and any routes that still bypass the new shell.
- Split interaction concerns into focused components: `SearchModal`, `ThemeToggle`, and `LanguageSwitcher`, so `Header` becomes composition instead of a monolith.
- Add typed `SEO`, `JsonLd`, and `Breadcrumbs` components under `src/components/seo/` so structured data can be reused across blog, pages, and service layouts.
- Preserve the current Astro, Cloudflare, and i18n behavior so the plan stays incremental and the existing routes keep building while the new components are introduced.

Risks and constraints:
- Header is the biggest surface area because it affects navigation, locale switching, mobile behavior, and the search trigger.
- Search integration should stay production-only where possible so local development does not break if Pagefind assets are missing.
- SEO output must remain canonical with the existing locale routing rules and avoid duplicate head tags while the migration is in progress.
- The new components should remain compatible with the existing `siteConfig`, `nav.config`, and `i18n` helpers rather than introducing a second source of truth.

Execution order:
1. Define component boundaries and align the checklist with the intended file layout.
2. Implement `SEO` and `JsonLd` first so layouts can consume them cleanly.
3. Rework `ThemeToggle` and `LanguageSwitcher`, then refactor `Header` to compose them.
4. Rework `Footer`, then add `SearchModal` and wire the search trigger into the header.
5. Run `astro check` and `pnpm build`, then move the task to `review` once the new components compile.

### user
