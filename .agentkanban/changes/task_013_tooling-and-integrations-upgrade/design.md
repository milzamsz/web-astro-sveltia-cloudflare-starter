# Design: Tooling & Integrations Upgrade

## Approach

### 1. Dependencies (`package.json`)

Add to `dependencies`:
- `@astrojs/mdx` — MDX content support
- `@astrojs/react` — React component integration
- `astro-icon` — SVG icon component (Lucide + Simple Icons)
- `schema-dts` — TypeScript types for JSON-LD schemas
- `cva` — Class Variance Authority for UI component variants
- `clsx` — conditional class joining
- `tailwind-merge` — Tailwind class conflict resolution
- `sharp` — image processing (for OG image generation in Phase 9)
- `zod` — runtime schema validation (may already be present via Astro)

Add to `devDependencies`:
- `@types/react` + `@types/react-dom` — React types
- `vitest` — unit test runner
- `@playwright/test` — E2E test runner
- `prettier-plugin-tailwindcss` — Tailwind class sorting in Prettier
- `eslint-plugin-astro` — Astro-specific ESLint rules
- `globals` — ESLint globals for flat config
- `png-to-ico` — favicon generation (for future use)
- Fontsource packages (Manrope, Outfit, JetBrains Mono) — self-hosted fonts
- `@resend/node` — email sending (for contact form in Phase 9)

**Decision**: Fontsource packages are added now (in tooling phase) so the design token
CSS files can import them in Phase 2 without a separate install step.

### 2. Astro Config (`astro.config.ts`)

Add integrations in order:
1. `@astrojs/react()` — stays before Starlight
2. `@astrojs/mdx()` — stays before Starlight
3. `astroIcon()` — after integrations

After the `integrations` array, add:
```typescript
env: {
  schema: {
    SITE_URL: envField.string({ context: "server", access: "public", default: "http://localhost:4321" }),
    RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
    RESEND_FROM_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
    GOOGLE_SITE_VERIFICATION: envField.string({ context: "server", access: "public", optional: true }),
    BING_SITE_VERIFICATION: envField.string({ context: "server", access: "public", optional: true }),
    PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: "client", access: "public", optional: true }),
    PUBLIC_GTM_ID: envField.string({ context: "client", access: "public", optional: true }),
    PUBLIC_CONSENT_ENABLED: envField.boolean({ context: "client", access: "public", optional: true, default: false }),
    PUBLIC_PRIVACY_POLICY_URL: envField.string({ context: "client", access: "public", optional: true }),
  },
},
```

Add or update:
```typescript
markdown: {
  shikiConfig: {
    theme: "github-dark",
    wrap: true,
  },
},
image: {
  layout: "constrained",
},
security: {
  checkOrigin: true,
},
```

### 3. Rocket-Style Pagefind Hook

A custom hook that runs Pagefind after the build, adapted from Rocket's approach:
```typescript
// In astro.config.ts, hooks: { "astro:build:done": async ({ pages }) => { ... } }
// Checks adapter type, runs pagefind only on static/SSG builds
```

This is added as a hook in `astro.config.ts`, not a separate integration.

### 4. TypeScript Config (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "strict": true,
    // ...existing options
  }
}
```

### 5. Vitest Config (`vitest.config.ts`)

```typescript
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["src/__tests__/**/*.test.ts"],
    environment: "node",
  },
});
```

### 6. Prettier (`.prettierrc`)

```json
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [{ "files": "*.astro", "options": { "parser": "astro" } }]
}
```

### 7. ESLint Flat Config (`eslint.config.mjs`)

Rewrite to:
```typescript
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist/", ".astro/", ".wrangler/", "node_modules/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
```

### 8. New `src/env.d.ts`

```typescript
/// <reference types="astro/client" />
```

## Rejected Alternatives

1. **Not using `@astrojs/react`**: Some landing components (FeatureTabs) benefit from
   React's interactive state management. Pure Astro islands would be more work for
   tab switching and animation. Accepted the React dependency.

2. **Not using `astro:env`**: Would require manual env validation in multiple places.
   The typed schema approach centralizes validation and provides editor autocomplete.

3. **Keeping ESLint `.eslintrc.cjs`**: The flat config is the standard in ESLint 9+.
   Astro 7 expects flat config. Migration is required.

## Security Model

- `security.checkOrigin: true` prevents CSRF attacks on form submissions
- `astro:env` with `access: "secret"` ensures server-only env vars never leak to client
- ESLint Astro plugin catches XSS vectors in Astro templates

## How Behavior Is Proven to RUN

| Check | Verify path |
|-------|-------------|
| `pnpm install` | Run install, assert exit 0, check lockfile for new deps |
| `astro check` | Run `npx astro check`, assert exit 0 |
| `pnpm lint` | Run lint, assert exit 0, verify Astro plugin rules apply |
| `pnpm build` | Run build, assert exit 0, verify Pagefind ran in logs |
| `pnpm test` | Run `vitest run`, assert exit 0 (empty suite) |
| `astro:env` validation | Set invalid env, assert build fails with actionable error |

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Peer dep conflicts with Astro 7 | Pin compatible versions, test install in CI |
| ESLint flat config breaks existing `.astro` files | Test with `pnpm lint` before committing |
| Fontsource packages add bundle size | Use `@fontsource-variable` for variable fonts, subset to Latin |

## Production-Readiness Gate

- **Org-scoping**: N/A (tooling phase, no data queries)
- **Audit events**: N/A (no mutations)
- **Secret references**: All secrets via `astro:env` schema; server-only access
- **Signed commands**: N/A (no agent commands)
- **Quotas**: N/A
- **Migration idempotency**: N/A (no DB migrations)
- **Runbooks**: If build fails after upgrade, run `pnpm clean` (rimraf .astro dist) and retry
