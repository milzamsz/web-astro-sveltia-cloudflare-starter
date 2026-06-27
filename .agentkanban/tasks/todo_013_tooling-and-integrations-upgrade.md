# Iteration 1

## package.json
- [ ] Add `@astrojs/mdx` to dependencies
- [ ] Add `@astrojs/react`, `react`, `react-dom` to dependencies
- [ ] Add `astro-icon`, `@iconify-json/lucide`, `@iconify-json/simple-icons` to dependencies
- [ ] Add `@fontsource-variable/manrope`, `@fontsource-variable/outfit`, `@fontsource-variable/jetbrains-mono` to dependencies
- [ ] Add `resend` to dependencies
- [ ] Add `schema-dts` to dependencies
- [ ] Add `class-variance-authority`, `clsx`, `tailwind-merge` to dependencies
- [ ] Add `sharp` to dependencies
- [ ] Add `zod` to devDependencies
- [ ] Add `vitest` to devDependencies
- [ ] Add `@playwright/test` to devDependencies
- [ ] Add `prettier-plugin-tailwindcss` to devDependencies
- [ ] Add `@types/react`, `@types/react-dom` to devDependencies
- [ ] Add `eslint-plugin-astro`, `globals` to devDependencies
- [ ] Add `pnpm.onlyBuiltDependencies: [esbuild, sharp]`
- [ ] Update `engines.node` to `>=22.12.0`
- [ ] Add `test`, `test:e2e` scripts

## astro.config.ts
- [ ] Add `@astrojs/mdx` integration
- [ ] Add `@astrojs/react` integration
- [ ] Add `astro-icon` integration with lucide + simple-icons sets
- [ ] Replace postbuild pagefind script with `astro:build:done` hook (adapter-aware output dir)
- [ ] Add `env.schema` with all 9 typed fields
- [ ] Add `markdown.shikiConfig: { theme: 'github-dark', wrap: true }`
- [ ] Add `image.layout: 'constrained'`
- [ ] Add `security.checkOrigin: true`
- [ ] Add `build.inlineStylesheets: 'always'`
- [ ] Keep Cloudflare adapter, keep Starlight integration

## tsconfig.json
- [ ] Add `"jsx": "react-jsx"` and `"jsxImportSource": "react"`
- [ ] Verify `"strict": true`

## vitest.config.ts
- [ ] Create file — configure test env, include pattern for `src/__tests__/**`

## .prettierrc
- [ ] Add `prettier-plugin-tailwindcss` and `prettier-plugin-astro` plugins

## eslint.config.mjs
- [ ] Migrate to flat config format
- [ ] Add `eslint-plugin-astro` rules
- [ ] Add `typescript-eslint` recommended config
- [ ] Add `globals` for browser + node environments

## Verification
- [ ] `pnpm install` — no errors
- [ ] `astro check` — passes
- [ ] `pnpm lint` — passes
- [ ] `pnpm build` — succeeds, pagefind hook runs
- [ ] `pnpm test` — Vitest starts without error
