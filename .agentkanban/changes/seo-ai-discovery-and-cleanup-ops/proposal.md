# Proposal: SEO AI Discovery And Cleanup Ops

## Problem

The MVP needs production-safe discovery artifacts and media lifecycle automation, but neither the public SEO completion layer nor cleanup worker exists yet.

## Value

This slice hardens search and AI discoverability while preventing long-term media sprawl and unsafe deletions.

## Scope

- Finalize canonical, hreflang, sitemap index, RSS, JSON-LD, breadcrumbs, internal linking, and optional `llms.txt`.
- Ensure draft and preview exclusions are enforced for discovery outputs.
- Build media manifest generation and a cron-driven cleanup workflow with dry-run, grace period, quarantine, and reporting.
- Document restore procedures and cleanup safeguards.

## Non-Scope

- Final CI/release orchestration.
- Cross-cutting secret scanning policy.

## Constraints

- `llms.txt` and discovery outputs must represent production content only.
- Cleanup must be safe-by-default and reversible through quarantine or restore guidance.

## Dependencies

- `blog-docs-and-search-experience`
- `media-pipeline-and-r2-delivery`

## Assumptions

- Public content structures and media references are stable enough for manifest generation.

## Risks

- Cleanup false positives can delete valid assets.
- Discovery artifacts can accidentally expose preview or draft content.

## Success Criteria

- Public discovery metadata is valid and production-only.
- Cleanup automation reports intended actions before destructive deletion.
