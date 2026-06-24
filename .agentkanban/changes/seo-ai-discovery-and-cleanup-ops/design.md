# Design: SEO AI Discovery And Cleanup Ops

## Architecture

Extend existing SEO helpers and build scripts to emit production-safe discovery assets, and add a worker/cron pipeline that compares referenced media manifests against stored objects before taking action.

## Components And Boundaries

- Discovery helpers for canonical, hreflang, sitemap, RSS, JSON-LD, breadcrumbs, and `llms.txt`.
- Validation scripts for structured data and indexing rules.
- Media manifest generator tied to content and asset references.
- Cleanup worker modes: dry-run, quarantine, delete, plus report output and notification.

## Interfaces And Contracts

- Discovery outputs must consume only published production content.
- Cleanup worker acts only on objects absent from the manifest and outside protected prefixes and grace windows.
- Restore documentation defines how quarantined or reported assets can be recovered safely.

## Data Flow

Build scripts derive metadata from published content; manifests enumerate referenced assets; cron compares manifests to bucket contents and emits reports or actions.

## Storage And Migrations

- Reports may be stored as objects, logs, or notifications without requiring new relational schema unless audit linkage is needed later.

## Security Model

- Cleanup credentials are scoped to the required bucket actions.
- Worker defaults to dry-run in production first deployment.

## Error And Failure Handling

- Missing manifest or inconsistent inputs abort cleanup rather than deleting assets.
- Invalid structured data or hreflang output fails validation.

## Environment Behavior

- Preview remains noindex and excluded from production discovery outputs.
- Cleanup uses environment-specific buckets and schedules.

## Backward Compatibility

- Discovery helpers extend, rather than replace, the SEO contracts from earlier tasks.

## Rollback Strategy

- Cleanup mode can be returned to dry-run immediately; discovery artifacts can be regenerated from content.

## Testing Approach

- Validation tests for discovery outputs.
- Worker tests covering dry-run, quarantine, protected prefixes, and grace period decisions.

## Affected Areas

- SEO helpers and build scripts.
- `public/llms.txt` generation flow.
- cleanup worker and reporting scripts.
