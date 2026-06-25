# Design: Contact Intake Maps And Analytics

## Architecture

Serve a static contact page that posts to a Pages Function endpoint protected by Turnstile and rate limiting, while analytics events are emitted through a provider-agnostic adapter.

## Components And Boundaries

- Contact page UI and accessible map section.
- Contact API route, validation helpers, rate limiting, and Turnstile verification.
- D1 persistence for submissions and retention metadata.
- Resend notifications and confirmations.
- Analytics adapter interfaces and GTM/Umami implementations.

## Interfaces And Contracts

- Contact requests accept only validated, schema-bound fields.
- Analytics events use a typed taxonomy and explicitly exclude prohibited PII fields.
- Map settings derive from content/config and provide a non-embed fallback.

## Data Flow

Visitors submit contact requests; server verifies Turnstile and validation; D1 stores the submission; Resend sends messages; client emits allowed analytics events through the chosen adapter.

## Storage And Migrations

- D1 adds contact submission tables and retention support fields.

## Security Model

- Server-side Turnstile validation, hashed rate-limit keys, honeypot, generic error responses, and no raw IP retention beyond policy needs.

## Error And Failure Handling

- Invalid or suspicious requests receive generic rejection responses.
- Email delivery failures do not expose internal state to visitors.

## Environment Behavior

- Analytics disabled in admin, auth, preview, and local dev.
- Preview/test environments use sandboxed mail and form targets where required.

## Backward Compatibility

- Contact schema should allow future export or workflow integration without route changes.

## Rollback Strategy

- Contact endpoint and analytics adapter remain isolated from page rendering and auth bootstrap.

## Testing Approach

- API tests, anti-abuse tests, analytics adapter tests, and end-to-end contact flow checks.

## Affected Areas

- contact page components.
- `functions/api/contact.ts`
- `functions/_shared/turnstile.ts`
- analytics components and config.

## Production Readiness

| Category | Coverage |
|---|---|
| **Org-scoping** | Contact submissions scoped via `organization_id` in D1. Analytics adapters configurable per environment via CMS settings. Maps section disabled in preview. |
| **Audit events** | Submission events logged with `action: 'contact_submission'`, `target: email_hash`, `ip_address` hashed. Rate limit events tracked by IP hash. |
| **Secret references** | `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY` as Cloudflare Pages secrets. Turnstile site key public (injected via env var). |
| **Signed commands** | Contact form submission authenticated via Turnstile token (server-verified). No raw shell. Honeypot provides automated bot detection. |
| **Quotas** | Rate limiting: 5 submissions per IP hash per 15min. Duplicate detection: same email+body within 1h returns 409. Email volume limited by Resend plan. |
| **Migration idempotency** | `002_contact.sql` uses `CREATE TABLE IF NOT EXISTS`. Additive only. Rollback by dropping table (data loss — backup first). |
| **Runbooks** | Contact submission flow documented in `docs/editor-guide.md`. Analysis reporting via D1 queries documented in admin manual. |

---

*Update `002_contact.sql` in `migrations/` during implementation.*
- D1 migrations.
