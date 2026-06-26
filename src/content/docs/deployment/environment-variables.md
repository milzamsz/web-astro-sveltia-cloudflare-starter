---
title: Environment Variables
description: Environment configuration for local dev and production.
sidebar:
  order: 2
---

## Local Development

Environment variables for local development are stored in `.dev.vars`:

```ini
# Turnstile CAPTCHA (required)
TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Site URL (required)
PUBLIC_SITE_URL=http://localhost:4321

# Sveltia CMS backend (optional for local dev)
SVELTIA_BACKEND_REPO=your-org/your-repo
SVELTIA_BASE_URL=http://localhost:4321
```

## Production

Production secrets are configured via Cloudflare Pages environment variables:

1. Go to **Cloudflare Dashboard > Pages > your-project > Settings > Environment variables**
2. Add the same variables with production values
3. For preview environments, add them as **Preview** variables too

## Secrets Validation

The `validate:secrets` script checks that all required variables are present at build time:

```bash
pnpm run validate:secrets
```

This runs automatically during CI and will fail the build if secrets are missing.

## Branch-Specific Config

Use Cloudflare Pages' branch-specific environment variables to differentiate between `main` (production) and `content-preview` (staging) environments.
