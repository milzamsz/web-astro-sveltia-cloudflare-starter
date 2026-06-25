# Setup Guide

Complete setup, deployment, and operations guide for the Astro + Sveltia CMS + Cloudflare template.

---

## Prerequisites

| Requirement | Version         | Notes                            |
|-------------|-----------------|----------------------------------|
| Node.js     | 24 LTS          | Use `fnm`, `nvm`, or `volta`     |
| pnpm        | 8.15.0+         | `corepack enable && corepack prepare pnpm@8.15.0 --activate` |
| Git         | Latest          |                                  |
| Cloudflare  | wrangler CLI    | `npm i -g wrangler`              |

---

## Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter.git
cd web-astro-sveltia-cloudflare-starter

# 2. Install dependencies
pnpm install

# 3. Set up local environment variables
cp .dev.vars.example .dev.vars  # or create manually
# Edit .dev.vars with your local values

# 4. Run local D1 (if testing auth)
wrangler d1 execute DB --local --file migrations/001_auth.sql
wrangler d1 execute DB --local --file migrations/002_contact.sql

# 5. Start dev server
pnpm dev
```

Open `http://localhost:4321` — you should see the homepage.

---

## Environment Variables

### Required (All Environments)

| Variable | Description | Example |
|----------|-------------|---------|
| `SESSION_SECRET` | 32+ char secret for session encryption | `openssl rand -base64 32` |
| `TOTP_ISSUER` | Name shown in authenticator apps | `MyApp` |

### Required (Preview / Production Only)

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | Resend API key for transactional email | `re_...` |
| `R2_ACCESS_KEY_ID` | R2 S3-compatible access key ID | `...` |
| `R2_SECRET_ACCESS_KEY` | R2 S3-compatible secret access key | `...` |
| `R2_BUCKET_NAME` | R2 bucket name | `my-bucket` |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key | `0x4AAA...` |
| `PUBLIC_SITE_URL` | Production site URL | `https://example.com` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (public) | `0x4AAA...` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `ANALYTICS_PROVIDER` | `gtm` \| `umami` \| `none` | `none` |
| `ANALYTICS_ID` | Measurement ID (GTM) or site ID (Umami) | — |
| `PUBLIC_ENABLE_PREVIEW` | Enable preview features | `false` |

---

## Cloudflare Setup

### 1. Create Cloudflare Account

- Sign up at [dash.cloudflare.com](https://dash.cloudflare.com)
- Note your **Account ID** (right sidebar)

### 2. Create D1 Database

```bash
# Production
wrangler d1 create astro-sveltia-db

# Preview
wrangler d1 create astro-sveltia-db-preview
```

Note the database IDs and add to `wrangler.jsonc`.

### 3. Run Migrations

```bash
# Production
wrangler d1 execute astro-sveltia-db --file migrations/001_auth.sql --env production
wrangler d1 execute astro-sveltia-db --file migrations/002_contact.sql --env production

# Preview
wrangler d1 execute astro-sveltia-db-preview --file migrations/001_auth.sql --env preview
wrangler d1 execute astro-sveltia-db-preview --file migrations/002_contact.sql --env preview
```

### 4. Create R2 Bucket

```bash
# Production
wrangler r2 bucket create astro-sveltia-media

# Preview
wrangler r2 bucket create astro-sveltia-media-preview
```

### 5. Configure Secrets in Cloudflare Pages

Go to **Pages → Your Project → Settings → Environment variables**

Add these as **Secrets** (encrypted):

| Secret | Environment |
|--------|-------------|
| `SESSION_SECRET` | Production, Preview |
| `TOTP_ISSUER` | Production, Preview |
| `RESEND_API_KEY` | Production, Preview |
| `R2_ACCESS_KEY_ID` | Production, Preview |
| `R2_SECRET_ACCESS_KEY` | Production, Preview |
| `R2_BUCKET_NAME` | Production, Preview |
| `TURNSTILE_SECRET_KEY` | Production, Preview |

Add these as **Variables** (not encrypted):

| Variable | Value |
|----------|-------|
| `PUBLIC_SITE_URL` | `https://your-domain.pages.dev` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Your Turnstile site key |
| `ANALYTICS_PROVIDER` | `gtm` / `umami` / `none` |
| `ANALYTICS_ID` | Your analytics ID |
| `PUBLIC_ENABLE_PREVIEW` | `true` (preview only) |

---

## GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|--------|-------------|
| `CF_API_TOKEN` | Cloudflare API token with Pages edit permissions |
| `CF_ACCOUNT_ID` | Your Cloudflare Account ID |

---

## Turnstile Setup

1. Go to [dash.cloudflare.com → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Add a site → get **Site Key** and **Secret Key**
3. Add domains: `localhost`, `*.pages.dev`, your custom domain
4. Add keys to environment variables above

---

## Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Create API key → add as `RESEND_API_KEY`
4. Update `functions/api/contact.ts` sender email if needed

---

## Branch Strategy & Deployment

| Branch | Purpose | Auto-Deploy | Environment |
|--------|---------|-------------|-------------|
| `main` | Production | ✅ Cloudflare Pages (production) | Production |
| `content-preview` | Editorial review | ✅ Cloudflare Pages (preview) | Preview |
| `feat/*`, `fix/*` | Development | ❌ | Local |

### Deployment Flow

```bash
# 1. Develop on feature branch
git checkout -b feat/my-feature

# 2. Push and open PR → CI runs (lint, build, validate)
git push origin feat/my-feature

# 3. Merge to main → auto-deploys to production
git checkout main
git merge feat/my-feature
git push origin main

# 4. For content edits: push to content-preview
git checkout content-preview
git merge main
git push origin content-preview
# → Deploys to preview, editors use /admin there

# 5. When content approved: merge preview → main
git checkout main
git merge content-preview
git push origin main
```

### Local Preview Build

```bash
pnpm run build
pnpm run preview  # serves dist/ at localhost:4321
```

---

## First Admin User (Bootstrap)

After first production deploy:

```bash
curl -X POST https://your-site.pages.dev/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"StrongPass123!"}'
```

Then visit `/login`, sign in, and you'll be prompted to enroll 2FA.

---

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm run build` | Production build |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run all linters |
| `pnpm run type-check` | TypeScript check |
| `pnpm run validate:i18n` | Validate translations |
| `pnpm run validate:cms` | Validate CMS config |
| `pnpm run format` | Prettier format |
| `pnpm run format:check` | Check formatting |

---

## Troubleshooting

### "Table not found" in local dev

```bash
# Use the shared D1 path for wrangler pages dev
wrangler pages dev --path .wrangler/state/v3/d1/
```

### Auth sign-in returns 500 locally

The dev mode uses a simplified password check. For production-like local testing, add bcrypt:
```bash
pnpm add -D bcryptjs
# Then update functions/api/auth/sign-in.ts to use bcrypt
```

### Turnstile fails on localhost

Ensure `localhost` is in your Turnstile site's allowed domains.

### CMS not loading in preview

Check that `public/admin/config.yml` has `branch: content-preview` and the preview deployment succeeded.

### D1 migrations fail

```bash
# Check migration status
wrangler d1 execute astro-sveltia-db --command "SELECT * FROM migrations" --env production

# Re-run specific migration
wrangler d1 execute astro-sveltia-db --file migrations/001_auth.sql --env production
```

---

## Next Steps

- Read `docs/admin-manual.md` for admin operations
- Read `docs/editor-guide.md` for content editing workflow
- Customize `src/i18n/ui.ts` for your translations
- Update `src/lib/site-config.ts` with your site details
- Configure analytics in `src/lib/analytics/index.ts`
