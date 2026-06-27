<!-- BEGIN AGENTIC KANBAN — DO NOT EDIT THIS SECTION -->
## Agentic Kanban

Read `.agentkanban/INSTRUCTION.md` for task workflow rules.
Read `.agentkanban/memory.md` for project context.

Enforcement mode: `warn`
Review policy:
low: planning=self-agent, implementation=self-agent
medium: planning=self-agent, implementation=self-agent
high: planning=independent-agent, implementation=independent-agent
critical: planning=independent-agent, implementation=independent-agent

If a task file (`.agentkanban/tasks/**/*.md`) was referenced earlier in this conversation, re-read it before responding and always respond in and at the end the task file.
<!-- END AGENTIC KANBAN -->

## AI Development System

This repo is built to be operated by AI coding agents. Stay **on-system**.

**Read before editing UI/design:**

- `PROJECT.md` — project-specific overrides (highest priority; read first).
- `system/globals/` — canonical design knowledge (8 files: colors, typography,
  spacing, interaction, imagery, effects, responsiveness, accessibility). One
  source of truth for all design decisions.
- `DESIGN.md` — bring-your-own-brand input; translate it into tokens, never inline.
- `src/registry.json` — machine-readable catalog of components, sections, pages.

**Architecture (three tiers):** Components (`src/components/ui/**`) → Sections
(`src/components/sections/**`, barrel `src/components/sections/index.ts`) → Pages
(`src/pages/**`). Build pages by composing sections; build sections from components.

**Hard rules:**

- Colors/spacing/typography come from design tokens only. No hardcoded hex/rgb and
  no Tailwind palette utilities (`bg-blue-500`). Use semantic tokens
  (`bg-primary`, `text-foreground`, `var(--muted-foreground)`).
- Dark mode must keep working (class strategy). Never hand-invert colors.
- Preserve i18n (en default + `/id/`), Sveltia CMS, Cloudflare Pages/Functions,
  BetterAuth, SEO/OG/RSS/sitemap, Pagefind, Starlight docs.
- New routes ship in both locales: `src/pages/x.astro` **and** `src/pages/[locale]/x.astro`.

**Verify before done:** `pnpm build`, `pnpm lint` (includes `pnpm check:kpis`),
`pnpm run lint:css`. `check:kpis` is the source of truth for design conventions and
fails CI on off-system edits. A Cursor `afterFileEdit` hook
(`.cursor/hooks/guard-conventions.mjs`) warns in real time.

**Portable self-audit prompts:** `system/prompts/` (usable in any chat tool).
