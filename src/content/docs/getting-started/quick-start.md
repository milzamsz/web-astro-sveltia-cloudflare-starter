---
title: Quick Start
description: Get the project running locally in minutes.
sidebar:
  order: 2
---

## Prerequisites

- **Node.js 24+** (use [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm))
- **pnpm 8.15+** (`corepack enable && corepack prepare pnpm@8.15.0 --activate`)
- **Cloudflare Account** (free tier works)

## Clone & Install

```bash
git clone https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter.git
cd web-astro-sveltia-cloudflare-starter
pnpm install
```

## Environment Setup

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` with your local values:

```ini
# Required for local dev
TURNSTILE_SITE_KEY=your-turnstile-site-key
PUBLIC_SITE_URL=http://localhost:4321

# Optional: Sveltia CMS auth
# SVELTIA_BACKEND_REPO=your-org/your-repo
# SVELTIA_BASE_URL=http://localhost:4321
# SVELTIA_AUTH_ENDPOINT=auth
```

## Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:4321` — Indonesian is the default locale at `/` and `/id/`, English at `/en/`.

## Build for Production

```bash
pnpm build
```

The output is in `dist/` — ready for Cloudflare Pages deployment.
