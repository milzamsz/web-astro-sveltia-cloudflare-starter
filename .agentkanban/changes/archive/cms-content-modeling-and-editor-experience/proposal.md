# Proposal: CMS Content Modeling And Editor Experience

## Problem

Editors need a browser-based content workflow, but the repo has no Sveltia setup, editable collections, or schema-safe editorial UX.

## Value

This slice bridges the typed content model to browser-based authoring so editors can manage public content without direct file edits.

## Scope

- Add `/public/admin` entry files and pin Sveltia configuration.
- Model localized collections and singleton settings for core pages, blog, docs, and site config.
- Add editorial metadata such as SEO, translation status, and media references.
- Provide validation and editor documentation.

## Non-Scope

- Protecting `/admin` with Better Auth.
- Publishing or preview merge orchestration.

## Constraints

- No secrets stored in CMS config.
- Generated content must validate against repository schemas.

## Dependencies

- `core-marketing-pages`
- `blog-docs-and-search-experience`

## Assumptions

- GitHub remains the content source of truth for Sveltia.

## Risks

- Schema drift between CMS config and content collections can break editorial flow.
- Overly complex collections can undermine usability.

## Success Criteria

- Editors can manage all core public content types through the CMS config.
- Validation catches mismatches before content reaches main branches.
