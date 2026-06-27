# DESIGN.md

> **Bring your own brand.** Fill this in, then ask your agent: *"Apply DESIGN.md to
> the design tokens."* The agent translates these values into
> `src/styles/tokens/*.css` (OKLCH) — it must **never** inline colors in components.

This is a one-way input: DESIGN.md → tokens. After translation, the tokens are the
source of truth (see `system/globals/colors.md`).

## Brand colors

Provide hex or OKLCH; the agent converts to OKLCH tokens.

| Role | Value | Maps to token |
| --- | --- | --- |
| Primary | `#171717` | `--primary` |
| Primary foreground | `#ffffff` | `--primary-foreground` |
| Background | `#ffffff` | `--background` |
| Foreground (text) | `#171717` | `--foreground` |
| Muted text | `#737373` | `--muted-foreground` |
| Border | `#e5e5e5` | `--border` |
| Accent (optional) | `—` | `--accent` |

> Current default is **monochrome neutral**. Replace values to rebrand. Keep
> light/dark parity — give a dark value for each, or let the agent derive it.

## Typography

- Headings font: `Outfit` (override here, then update `tokens/typography.css`).
- Body font: `Manrope`.
- Mono font: `JetBrains Mono`.
- Scale/weights: keep the fluid scale unless you have a reason to change it.

## Shape & feel

- Radius: medium (`--radius-lg`/`--radius-xl` for cards).
- Elevation: subtle shadows + hairline borders (avoid heavy drop shadows).
- Density: comfortable / generous whitespace.
- Motion: minimal, reduced-motion-safe.

## Logo & assets

- Light logo: `/logos/logo-light.svg`
- Dark logo: `/logos/logo-dark.svg`
- Favicon: `/favicon.svg`

## Notes

<!-- Anything else about the brand (voice, imagery style, do/don't). -->
