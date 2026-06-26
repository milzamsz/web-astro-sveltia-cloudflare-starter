---
title: Project Structure
description: How the project is organised and where to find key files.
sidebar:
  order: 3
---

```
.
├── public/
│   ├── admin/               # Sveltia CMS admin interface
│   │   ├── config.yml       # CMS collection and widget definitions
│   │   └── index.html       # CMS entry point
│   ├── _headers             # Cloudflare Pages headers (security, CORS)
│   ├── llms.txt             # AI-friendly LLM context file
│   └── robots.txt           # Search engine crawl rules
├── src/
│   ├── components/          # Reusable Astro components (Hero, CTA, FAQ…)
│   ├── content/             # Content collections (blog, docs, pages, services)
│   ├── functions/           # Cloudflare Functions (API routes)
│   ├── i18n/                # Internationalisation utilities (routes, switcher, UI)
│   ├── layouts/             # Base layout with SEO, analytics, navigation
│   ├── lib/                 # Shared libraries (analytics, images, SEO, site config)
│   ├── pages/               # Astro pages with locale routing
│   ├── styles/              # Global CSS and Tailwind layers
│   └── content.config.ts    # Content collection schemas
├── .github/workflows/       # CI/CD workflows
├── astro.config.ts          # Astro + Starlight + integrations config
├── wrangler.jsonc           # Cloudflare Workers / Pages config
└── package.json
```

## Key Patterns

- **Locale routing**: Pages in `src/pages/[locale]/` for translated content. Shared routes (e.g. login, admin) at the root.
- **Content collections**: Markdown files in `src/content/` with locale-suffixed filenames (`_en.md`).
- **CMS config**: `public/admin/config.yml` drives the Sveltia CMS UI — matches the content collection schemas.
