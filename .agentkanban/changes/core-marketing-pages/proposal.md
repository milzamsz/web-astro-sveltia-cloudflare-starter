# Proposal: Core Marketing Pages

## Problem

The MVP promises a complete public marketing surface, but there are no localized pages, reusable sections, or public content schemas yet.

## Value

This slice turns the foundation and i18n contracts into a real visitor-facing experience and establishes the content structures CMS editors will later manage.

## Scope

- Build homepage, about, services list/detail, pricing, contact, and legal pages in both locales.
- Create reusable CTA, FAQ, hero, and content section components.
- Add public structured data relevant to those pages.

## Non-Scope

- Blog and docs content systems.
- Contact submission backend.

## Constraints

- Pages must remain static-first and accessible.
- Content structures must be CMS-ready, not hard-coded one-offs.

## Dependencies

- `i18n-routing-and-locale-governance`

## Assumptions

- Shared layouts and SEO helpers from tasks 002-003 are already available.

## Risks

- Poor content modeling can make later CMS mapping brittle.
- Accessibility gaps here would cascade into every later review cycle.

## Success Criteria

- All core public pages exist in both locales.
- Reusable sections and metadata support later CMS-driven authoring.
