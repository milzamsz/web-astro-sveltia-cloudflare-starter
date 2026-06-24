# Design: Auth Admin Access And 2FA

## Architecture

Implement auth in Pages Functions using Better Auth backed by D1, with Resend for transactional mail and middleware enforcing admin access before the static CMS assets are served.

## Components And Boundaries

- D1 schema and migrations for users, sessions, roles, invitations, audit fields, 2FA state, and trusted devices.
- Better Auth function routes and shared auth utilities.
- Email templates and send helpers for verification, reset, invite, OTP, and security notices.
- Admin guard middleware for `/admin` and related protected surfaces.

## Interfaces And Contracts

- User roles must distinguish editor, reviewer, publisher, and admin capabilities.
- 2FA enrollment and verification APIs must support TOTP, email OTP fallback, and backup codes.
- Owner bootstrap is a one-time operational path with explicit documentation.

## Data Flow

Users authenticate through auth endpoints; D1 persists sessions and 2FA state; middleware checks role plus MFA completion before allowing admin access.

## Storage And Migrations

- D1 migrations create auth and audit tables with environment-specific databases.

## Security Model

- Secure session cookies, invite-only onboarding, hashed secrets, least-privilege roles, and no sensitive token logging.

## Error And Failure Handling

- Auth failures return generic errors that avoid user enumeration.
- 2FA disablement or credential rotation revokes active sessions.

## Environment Behavior

- Local, preview, and production each use separate D1 bindings and mail configuration.

## Backward Compatibility

- Role model should support later preview/publish permissions without schema rework.

## Rollback Strategy

- Migration steps are additive where possible, with documented rollback order for auth routes and schema.

## Testing Approach

- Route tests for sign-in, invites, verification, reset, role enforcement, and 2FA flows.
- Security tests for session cookies and access control failures.

## Affected Areas

- `functions/api/auth/`
- `functions/admin/_middleware.ts`
- `functions/_shared/auth*`
- `migrations/`
- auth UI pages/components.

## Production Readiness

| Category | Coverage |
|---|---|
| **Org-scoping** | D1 databases are environment-specific (local/worktool, preview, production). Roles are defined per org; the auth schema supports multi-org via `organization_id` on users table. System-scoped queries use `WHERE organization_id = ?`. |
| **Audit events** | Every auth mutation (sign-in, invite creation, role change, 2FA enrollment, password reset) writes an `audit_events` table row with `actor_id`, `target`, `action`, `timestamp`, and `ip_address`. Multi-statement mutations wrapped in D1 batch/transaction. |
| **Secret references** | All secrets (Resend API key, session secret, TOTP issuer secret) are Cloudflare Pages secrets or D1-managed hashes — never in code. Auth tokens and OTP values are hashed before storage; raw values never logged. |
| **Signed commands** | Invite tokens and password reset tokens are signed, TTL-limited (24h for invites, 1h for resets), and single-use. Agents operate via authenticated session — no raw shell. |
| **Quotas** | Rate limiting on auth endpoints (5 attempts per email per 15min). Invite token generation limited to admin role. Session revocation invalidates active tokens on role change. |
| **Migration idempotency** | D1 migrations use `CREATE TABLE IF NOT EXISTS` and additive `ALTER TABLE` only. Each migration has a unique timestamp prefix. Rollback SQL documented per migration. |
| **Runbooks** | Owner bootstrap documented in `docs/admin-manual.md`. Auth recovery (forgot password flow, admin-revoked session) covered in troubleshooting section. Deployment requires D1 migration run documented in CI workflow. |
