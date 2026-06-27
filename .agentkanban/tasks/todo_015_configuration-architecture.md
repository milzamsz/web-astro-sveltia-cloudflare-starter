# Iteration 1

## src/config/site.config.ts
- [ ] Create `src/config/` directory
- [ ] Define `SiteConfig` TypeScript interface (ALL fields from current SITE_CONFIG + Rocket-inspired additions)
  - Required backward-compat fields: `url`, `defaultLocale`, `locales`, `localeLabels`, `localePrefixes`, `name`, `description`
  - Rocket additions: `ogImage`, `author`, `email`, `socialLinks`, `header.showSocialLinks`, `verification` (google/bing from env), `authorImage`, `blogImageOverlay`, `articleFeatures.toc`, `blog (postsPerPage, tagCloudLimit)`, `services (perPage, tagCloudLimit)`, `i18n` (delegates to i18n.config), `branding`
- [ ] Import `SITE_URL`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` from `astro:env/server`
- [ ] Import `I18nConfig` from `./i18n.config`
- [ ] Fill singleton with boilerplate defaults
- [ ] Export `default siteConfig`

## src/config/i18n.config.ts
- [ ] Define `I18nConfig` interface: `enabled`, `locales`, `defaultLocale`, `routing`
- [ ] Export singleton with `enabled: true`, `locales: ['en', 'id']`, `defaultLocale: 'en'`
- [ ] Export type `I18nConfig`

## src/config/nav.config.ts
- [ ] Define `NavItem` interface: `href`, `labelKey`, `icon?`, `external?`, `children?`
- [ ] Export `mainNav: NavItem[]` — MUST match Header.astro navLinks labelKeys
- [ ] Export `footerNav` grouped: product, legal (privacy/terms), social
- [ ] MANDATORY: Header.astro consumes `mainNav` from this config

## src/config/consent.config.ts
- [ ] Import `PUBLIC_CONSENT_ENABLED`, `PUBLIC_PRIVACY_POLICY_URL` from `astro:env/client`
- [ ] Export typed consent config object

## src/lib/site-config.ts
- [ ] Import and re-export `default as SITE_CONFIG` from `../config/site.config`
- [ ] Keep existing `Locale` type export
- [ ] Verify all 11 existing component imports resolve correctly

## Backward Compatibility Audit
- [ ] Search all files importing from `../lib/site-config` — verify they still compile
- [ ] Update `Header.astro` to MANDATORILY use `mainNav` from `nav.config.ts`
- [ ] Update `Footer.astro` to use `footerNav` from config

## Verification
- [ ] `astro check` — no TypeScript errors
- [ ] `pnpm lint` — clean
- [ ] `pnpm build` — succeeds
- [ ] All existing pages render with correct site name from config
