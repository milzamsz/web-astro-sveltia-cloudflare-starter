# Design: CMS Content Modeling And Editor Experience

## Architecture

Configure Sveltia as a static admin SPA that writes Git-backed content matching the repository's content schemas and locale conventions.

## Components And Boundaries

- `/public/admin/index.html`, `config.yml`, and CMS styling.
- Collection definitions for pages, services, blog, docs, legal content, and site settings.
- Editorial metadata for translation status, SEO, slugs, publish state, and media references.
- Validation scripts that compare CMS config against content schemas.

## Interfaces And Contracts

- Each CMS collection maps to a typed content schema and locale pairing strategy.
- Singleton settings expose analytics, SEO, map, organization, and footer/header configuration later used by the app.
- Media fields reference R2-hosted assets without requiring Git binary storage.

## Data Flow

Editors use Sveltia to commit structured markdown, MDX, or YAML to the content branch, which Astro later reads during build.

## Storage And Migrations

- No database storage in this task.
- File-based content remains canonical.

## Security Model

- Public admin SPA contains no server-side secrets.
- OAuth and admin auth are enforced in later tasks.

## Error And Failure Handling

- Invalid CMS config fails validation.
- Unsupported editorial structures are rejected at config or schema level.

## Environment Behavior

- Local CMS config points at the same schema model as preview and production, with environment-specific backend values deferred to runtime config.

## Backward Compatibility

- Collection names and field contracts should remain stable for future content history.

## Rollback Strategy

- CMS config and editor docs remain isolated from runtime auth or publish APIs.

## Testing Approach

- CMS config schema validation.
- Smoke checks ensuring all planned content types are editable.
- Collection→schema mapping tests confirming each Sveltia collection field maps to a valid content schema property.
- Locale pairing tests: every content type available in both `id` and `en`.

## Production Readiness

| Category | Coverage |
|---|---|
| **Org-scoping** | CMS config uses template-level placeholders (e.g. `repo: <owner>/<repo>`). Downstream forks replace these; no org-level coupling. Collections are additive — fork can extend without breaking base schemas. |
| **Audit events** | This task adds editorial metadata fields (`translationStatus`, `publishState`, `updatedAt`). Runtime audit logging is deferred to downstream auth (008) and publish (009) tasks, which consume these fields. Content commit history in Git provides the native audit trail. |
| **Secret references** | `/public/admin/` contains zero secrets. GitHub OAuth credentials are supplied via Sveltia's runtime OAuth redirect flow, not committed config. Explicit spec guard: "CMS config contains no embedded secrets" — validated by config review. |
| **Signed commands** | N/A — CMS config is static. No runtime commands are defined in this task. |
| **Quotas** | N/A at config layer. File size limits and allowed mime types are enforced at the media pipeline layer (task 007). |
| **Migration idempotency** | CMS config files are additive. Collections can be extended with new fields without breaking existing content. Deployment-side config (e.g. GitHub backend repo) is environment-specific via Sveltia env variables, not code changes. |
| **Runbooks** | Editor-facing documentation is produced in this task covering content editing expectations, locale handling, and media reference conventions. Operator notes for CMS config changes (environment variables, backend URL) are added to `TECHNICAL.md`. |

## Affected Areas

- `public/admin/` — Sveltia entry HTML, config YAML, and optional styling/logo.
- `src/content/` — no schema changes, but CMS collections must match existing schemas exactly.
- validation scripts — `scripts/validate-cms-config.js` (new) compares CMS config against `src/content.config.ts`.
- editor docs — `docs/editor-guide.md` or equivalent (new).
- `TECHNICAL.md` — operator section for CMS environment variables.
