# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | ✅ Yes (template)  |

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, report them privately via:

1. **GitHub Security Advisory** (preferred): Go to the Security tab → "Report a vulnerability"
2. **Email**: security@[your-domain].com (if configured)

We will acknowledge receipt within 48 hours and provide a status update within 5 business days.

## Security Measures in This Template

### Authentication & Authorization
- **Better Auth** with Argon2id password hashing (configurable, falls back to bcrypt in production)
- **Mandatory 2FA (TOTP)** for all admin/editor roles
- **Backup codes** for 2FA recovery
- **Session management** with secure cookies, HttpOnly, SameSite=Strict
- **Rate limiting** on auth endpoints (5 attempts/15min per email)

### Content Security Policy
- Enforced via `public/_headers` at the Cloudflare edge
- Allows Sveltia CMS CDN, Turnstile, and configured analytics providers
- `frame-ancestors 'none'` prevents clickjacking
- `form-action 'self'` restricts form submissions

### API Security
- All admin/preview routes protected by middleware (`functions/admin/_middleware.ts`, `functions/preview/_middleware.ts`)
- Role-based access control (admin, publisher, reviewer, editor)
- Turnstile CAPTCHA on public contact form
- Input validation via Zod schemas

### Data Protection
- **D1 (SQLite at edge)** — data never leaves Cloudflare network
- **R2** — encrypted at rest, S3-compatible API
- **Environment variables** — all secrets via Cloudflare Pages secrets or `.dev.vars` (gitignored)
- **No secrets in code** — enforced by secret scanning in CI

### Dependency Security
- **Dependabot** weekly checks for vulnerable dependencies
- **Dependency Review** on every PR (fails on moderate+ severity)
- **License compliance** — only permissive licenses allowed
- **Secret scanning** via trufflehog on every push

### Infrastructure
- **Cloudflare Pages** — DDoS protection, WAF, automatic TLS
- **Wrangler** — secrets never logged in build output
- **Preview deployments** on `content-preview` branch (password-protected via auth)

## Responsible Disclosure Timeline

| Step | Timeline |
|------|----------|
| Acknowledgment | 48 hours |
| Initial assessment | 5 business days |
| Fix development | 30 days (critical), 90 days (moderate) |
| Disclosure coordination | Before fix deployment |

## Scope

This policy applies to:
- The template codebase itself
- Generated projects using this template (users should adapt to their context)

This policy does NOT cover:
- User-deployed infrastructure (Cloudflare account settings, DNS, etc.)
- Third-party services (Resend, Turnstile, etc.) — report to their security teams