# Iteration 1

## CSS Tokens (split existing globals.css into modular files)
- [x] Create `src/styles/tokens/colors.css` — extract all color tokens from globals.css (both light + dark variants), add semantic naming (--background, --foreground, --primary, --secondary, --accent, --muted, --card, --border, --ring, surface-invert)
- [x] Create `src/styles/tokens/typography.css` — font family vars (Manrope body, Outfit headings, JetBrains Mono), fluid type scale vars, heading weight tokens
- [x] Create `src/styles/tokens/spacing.css` — spacing scale, container max-widths, section padding vars, grid gap tokens, z-index, breakpoints

## Fontsource Integration & Fallback Fonts (CLS prevention)
- [x] Add `@import '@fontsource-variable/manrope'` (body font, variable weight 400-700)
- [x] Add `@import '@fontsource-variable/outfit'` (heading font, variable weight 300-800)
- [x] Add `@import '@fontsource-variable/jetbrains-mono'` (mono font, variable weight 400-700)
- [x] Add Outfit Fallback `@font-face` (metric-adjusted Arial, size-adjust/ascent-override/descent-override)
- [x] Add Manrope Fallback `@font-face` (metric-adjusted Arial, size-adjust/ascent-override/descent-override)

## Global CSS File (new name: global.css, imports tokens)
- [x] Rename `src/styles/globals.css` → `src/styles/global.css`
- [x] Add `@import 'tailwindcss'` at top
- [x] Add `@import './tokens/colors.css'`, `./tokens/typography.css'`, `./tokens/spacing.css`
- [x] Add Fontsource @imports + fallback @font-face rules
- [x] Add `@custom-variant dark (&:where(.dark, .dark *))` for class-based dark mode
- [x] Add complete `@theme {}` block mapping CSS vars → Tailwind color/font/radius/breakpoint tokens
- [x] Port Rocket base styles: selection color, custom scrollbar, focus ring, code block style, ::marker color, prose styles
- [x] Remove old duplicate token declarations from the file (now in token files)

## Import Updates
- [x] Update `src/layouts/BaseLayout.astro` import: `global.css` (new name)
- [x] Update any other files importing `globals.css` (grep search)
- [x] Update `astro.config.ts` if Vite entry references the old filename

## Dark Mode Bootstrap Script (FOUC prevention)
- [x] Add inline non-blocking `<script is:inline>` in BaseLayout to read `localStorage.theme` and apply `dark` class to `<html>` before first paint

## Verification
- [x] `pnpm build` — CSS compiles, no import errors
- [x] `astro check` — no TypeScript errors
- [x] Verify Fontsource fonts generate no external network requests (CSP-safe)
- [x] Verify `dark` class toggle shows dark palette correctly
- [x] Verify no CLS from font loading (Lighthouse metric)
