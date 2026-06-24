# Proposal: Auth Admin Access And 2FA

## Problem

The plan requires invite-only CMS access with Better Auth, D1, Resend, roles, and mandatory multi-factor auth, but no auth stack exists yet.

## Value

This slice protects the administrative surface and establishes the security model required for editorial access, invitations, and auditability.

## Scope

- Add Better Auth integration, D1-backed auth schema, migrations, and role model.
- Implement email verification, invite-only onboarding, password reset, and owner bootstrap.
- Add TOTP, email OTP fallback, backup codes, trusted device support, and session revocation.
- Protect `/admin` access using auth-aware middleware or guards.

## Non-Scope

- GitHub OAuth publishing flow.
- Public contact handling.

## Constraints

- No public signup.
- 2FA is mandatory for CMS-capable roles.

## Dependencies

- `cms-content-modeling-and-editor-experience`

## Assumptions

- D1 remains the auth persistence layer and Resend remains the transactional mail provider.

## Risks

- Poor session handling could undermine every protected route.
- Two-layer auth UX may confuse editors if flows are unclear.

## Success Criteria

- Only approved users can access `/admin`.
- Auth flows and 2FA controls are enforceable, testable, and environment-separated.
