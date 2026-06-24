# astro-sveltia-cloudflare

> Multilingual marketing website boilerplate with Astro, Sveltia CMS, and Cloudflare Pages.

## Features

- **Static-first** Astro site with TypeScript
- **Bilingual** — Indonesian (`id`) and English (`en`) with URL prefix routing
- **Sveltia CMS** — browser-based content editing at `/admin`
- **Cloudflare Pages** — global edge deployment
- **Cloudflare D1** — user, session, 2FA, and contact data
- **Cloudflare R2** — media and file storage
- **Cloudflare Turnstile** — bot protection for contact form
- **Better Auth** — email/password + mandatory 2FA
- **Resend** — transactional email
- **SEO** — semantic HTML, JSON-LD, sitemap, RSS, hreflang

## Quick Start

```bash
pnpm install
pnpm dev
```

See [SETUP.md](SETUP.md) for full setup instructions.

## Core Pages

| Page           | Description                          |
|----------------|--------------------------------------|
| `/`            | Homepage with hero and CTA           |
| `/about`       | About / company info                 |
| `/services`    | Service listing + detail pages       |
| `/pricing`     | Pricing tiers                        |
| `/contact`     | Contact form + Google Maps           |
| `/blog`        | Multilingual blog                    |
| `/docs`        | Starlight documentation portal       |

## Development

| Command           | Description               |
|-------------------|---------------------------|
| `pnpm dev`        | Start dev server          |
| `pnpm build`      | Build for production      |
| `pnpm preview`    | Preview production build  |
| `pnpm lint`       | Run linting               |

## Project Structure

```
astro-sveltia-cloudflare/
├── src/
│   ├── content/           # Blog, docs, collections
│   ├── layouts/           # Shared page layouts
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page routes
│   ├── i18n/              # Translation dictionaries
│   └── lib/               # Utilities, helpers
├── public/                # Static assets
├── functions/             # Cloudflare Pages Functions
└── .agentkanban/          # Agentic Kanban board
```

## Deployment

See [PLAN.md](PLAN.md) for architecture details.

1. Push to `main` — auto-deploys to production
2. Push to `content-preview` — auto-deploys protected preview
3. Use `/admin` in preview to edit content, then merge to `main`

## License

MIT
