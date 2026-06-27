# Tasks: Phase 1 — Tooling & Integrations Upgrade

## Implementation Checklist

### 1. Update `package.json`
- [ ] Add all new dependencies (prod + dev)
- [ ] Run `pnpm install` — verify exit 0, no peer dep conflicts
- [ ] Commit: `chore(deps): add tooling dependencies for refinement phases`

### 2. Rewrite `astro.config.ts`
- [ ] Add `@astrojs/react()` and `@astrojs/mdx()` integrations
- [ ] Add `astroIcon()` integration
- [ ] Add `env:` schema with typed environment variables
- [ ] Add `markdown.shikiConfig` (theme: github-dark, wrap: true)
- [ ] Add `image.layout: "constrained"`
- [ ] Add `security.checkOrigin: true`
- [ ] Add Rocket-style Pagefind hook in `hooks: { "astro:build:done" }`
- [ ] Run `astro check` — verify exit 0
- [ ] Commit: `feat(config): upgrade astro.config with env schema, MDX, React, shiki, pagefind hook`

### 3. Update `tsconfig.json`
- [ ] Add `jsx: "react-jsx"` and `jsxImportSource: "react"`
- [ ] Ensure `strict: true`
- [ ] Verify `astro check` still passes

### 4. Create `vitest.config.ts`
- [ ] Create file with Vitest config (include: `src/__tests__/**/*.test.ts`)
- [ ] Run `npx vitest run` — verify exit 0 (empty suite)
- [ ] Commit: `feat(testing): add vitest.config.ts for unit testing`

### 5. Update `.prettierrc`
- [ ] Add `prettier-plugin-tailwindcss` and `prettier-plugin-astro`
- [ ] Add Astro override
- [ ] Run `pnpm format:check` — verify consistent formatting
- [ ] Commit: `chore(format): add tailwindcss + astro prettier plugins`

### 6. Rewrite `eslint.config.mjs`
- [ ] Flat config with: recommended JS, TS, Astro, prettier
- [ ] Add `globals` for browser + node
- [ ] Preserve existing rules (no-console, no-explicit-any, no-unused-vars)
- [ ] Run `pnpm lint` — verify exit 0
- [ ] Commit: `refactor(lint): migrate eslint to flat config with astro plugin`

### 7. Create `src/env.d.ts`
- [ ] Create file with Astro client reference
- [ ] Verify `astro check` still passes

### 8. Definition of Done (final)
- [ ] (agent) `pnpm install` completes without errors
- [ ] (agent) `astro check` passes — no TypeScript errors
- [ ] (agent) `pnpm lint` passes with new ESLint flat config
- [ ] (agent) `pnpm build` succeeds — Pagefind hook indexes pages
- [ ] (agent) `pnpm test` launches Vitest — runner starts clean
- [ ] (agent) `pnpm format:check` passes with new Prettier plugins
- [ ] (agent) Set `lane: review` and request review
