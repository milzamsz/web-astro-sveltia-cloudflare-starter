# Proposal: I18n Routing And Locale Governance

## Problem

The MVP requires Indonesian and English from day one, but the repo has no locale-aware routing, translation contracts, or validation rules.

## Value

This task establishes the multilingual contract that protects every later page, blog entry, docs page, CMS field, and SEO artifact.

## Scope

- Configure native Astro i18n for `id` and `en`.
- Define route mapping, localized navigation helpers, and language switching behavior.
- Add canonical, hreflang, locale sitemap, and locale RSS support.
- Add translation validation and missing-translation failure behavior.

## Non-Scope

- Filling in every marketing page or content entry.
- CMS editorial UI.

## Constraints

- No silent fallback that hides missing localized content.
- Language switching must preserve equivalent content when available.

## Dependencies

- `astro-foundation-and-design-system`

## Assumptions

- `id` is the default locale and `en` is the secondary locale, both with URL prefixes.

## Risks

- Locale model mistakes can force route changes across the whole repo.
- Fallback leakage can break SEO and editorial review.

## Success Criteria

- Core route patterns exist for both locales.
- Locale validation prevents incomplete or conflicting content.
