# Project Governance

## Branch Strategy

- **main** — Production branch. All merges to `main` trigger a Cloudflare Pages deployment.
- **content-preview** — Editorial preview branch. Protected preview deployments used by Sveltia CMS for content review.
- **feat/\*, fix/\*, chore/\*** — Development branches. PRs target `main`.

## Environment Separation

All environments (local, preview, production) use separate Cloudflare resources:
- Separate D1 databases
- Separate R2 buckets
- Separate Turnstile site keys and secret keys
- Separate Resend API keys (if per-environment sending is needed)

Secrets are never committed. Use Cloudflare Pages secrets for preview/production and `.env.local` for local.

## Domain Assumptions

- **Primary locale:** Indonesian (`id`)
- **Secondary locale:** English (`en`)
- **Deployment target:** Cloudflare Pages + Pages Functions + D1 + R2 + Workers
- **Content source of truth:** Git repository (Markdown, MDX, YAML files)
- **CMS:** Sveltia CMS (browser-based editor, writes to GitHub)
- **Auth:** Better Auth (email/password + mandatory 2FA), backed by D1
- **Email:** Resend (transactional emails, contact notifications)
- **Bot protection:** Cloudflare Turnstile
- **Package manager:** pnpm

## Release Cadence

- Initial MVP: single release containing all core phases
- Post-MVP: continuous delivery via PRs into `main`
