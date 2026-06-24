# Proposal: Blog Docs And Search Experience

## Problem

The MVP requires a blog, localized docs, and public search, but none of those content systems exist yet.

## Value

This slice provides the long-form content engine and discovery layer that complements the marketing site and feeds later SEO, CMS, and cleanup automation tasks.

## Scope

- Add blog collections with categories, tags, authors, reading time, related posts, and article metadata.
- Add localized Starlight docs under `/docs`.
- Integrate Pagefind for public search and indexing behavior.
- Add locale RSS and article structured data.

## Non-Scope

- CMS editing UI.
- Preview publish controls.

## Constraints

- Draft content must stay out of production output.
- Search must reflect locale and public-only content.

## Dependencies

- `i18n-routing-and-locale-governance`

## Assumptions

- Astro foundation and SEO helpers already exist.

## Risks

- Content schema mistakes can force migrations in both blog and docs later.
- Search indexing drift can expose draft or preview-only content.

## Success Criteria

- Visitors can browse localized blog and docs content.
- Search indexes only the intended public content.
