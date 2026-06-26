---
title: Cloudflare Pages
description: Deploying to Cloudflare Pages and managing your live site.
sidebar:
  order: 1
---

## Automatic Deployments

Every push to `main` triggers a Cloudflare Pages deployment via GitHub Actions. The CI pipeline also runs linting, type checking, and security scans before building.

The `release.yml` workflow handles production deployments from version tags.

## Preview Deployments

Pushes to `content-preview` deploy to a preview environment, allowing content editors to review changes before publishing to production.

## Manual Deployment

```bash
pnpm build

# Deploy via wrangler
npx wrangler pages deploy dist --branch=main

# Or via Cloudflare Dashboard
# Project: astro-sveltia-cloudflare
```

## Required Secrets

Set these in your Cloudflare Pages dashboard or GitHub repository:

| Secret | Purpose |
| --- | --- |
| `CF_API_TOKEN` | Cloudflare API token for deployments |
| `CF_ACCOUNT_ID` | Your Cloudflare account ID |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile CAPTCHA site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile CAPTCHA secret key |
| `PUBLIC_SITE_URL` | Canonical URL of your site |

## Branch Configuration

- **`main`** — Production builds
- **`content-preview`** — Draft/preview builds from CMS
- **Feature branches** — Preview builds triggered from pull requests
