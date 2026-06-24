# Design: Media Pipeline And R2 Delivery

## Architecture

Use environment-specific R2 buckets plus an asset domain and preset-based image URL generation so uploads stay out of Git while public rendering remains cache-friendly and constrained.

## Components And Boundaries

- Bucket naming and environment bindings.
- CMS media library configuration and upload constraints.
- Image helper utilities for presets, breakpoints, alt text, and OG usage.
- Validation for allowed mime types, size caps, and protected path prefixes.

## Interfaces And Contracts

- Content models store logical asset references or resolved URLs compatible with R2.
- Image components accept only approved preset names and refuse arbitrary transformation parameters.
- Asset domain config supports dev, preview, and production separation.

## Data Flow

Editors upload media to R2 through CMS; content stores references; Astro renders URLs through approved transformation helpers.

## Storage And Migrations

- Object storage only, no DB schema changes in this task.

## Security Model

- Credentials are bucket-scoped and environment-specific.
- CORS is limited to the required origins and methods.

## Error And Failure Handling

- Unsupported file types or sizes are rejected before upload.
- Missing media references degrade to safe placeholders or fail validation, depending on field criticality.

## Environment Behavior

- Separate buckets and asset domains for local/dev emulation, preview, and production.

## Backward Compatibility

- Asset references should remain portable if the delivery domain changes later.

## Rollback Strategy

- Media config changes stay isolated from content routing and auth.

## Testing Approach

- Upload and replacement smoke tests.
- Component tests for preset enforcement and responsive output.

## Affected Areas

- CMS media config.
- image components/helpers.
- environment docs and validation scripts.

## Production Readiness

| Category | Coverage |
|---|---|
| **Org-scoping** | Environment-aware R2 bindings with dev/preview/production isolation; template-friendly bucket naming for easy forking. Collections are additive — new environments can be added without breaking existing content. |
| **Audit events** | Media upload actions are captured via Sveltia CMS entry logs; R2 access logs capture bucket-scoped credentials; transformation helpers emit audit events for content changes. R2 event logging can be extended in task 011. |
| **Secret references** | R2 credentials are bucket-scoped and stored as secrets in Cloudflare Pages configuration; no API keys embedded in configuration files. Media library configuration references only environment variables. |
| **Signed commands** | Not applicable at media config level. |
| **Quotas** | File size limits (e.g., 10MB) and image dimension caps enforced via Sveltia media library validation. Transformation presets restrict resize/crop operations to prevent abuse. |
| **Migration idempotency** | Media config changes are additive; new file types or presets can be added without migration. Rollback involves removing configuration entries; buckets remain intact. |
| **Runbooks** | Operator documentation in `docs/editor-guide.md` covers media library setup, R2 bucket configuration, and environment-specific procedures. Validation scripts (`scripts/validate-cms-config.cjs`) provide verification steps. |

## Testing Approach

- Upload and replacement smoke tests.
- Component tests for preset enforcement and responsive output.

## Affected Areas

- CMS media config.
- image components/helpers.
- environment docs and validation scripts.
