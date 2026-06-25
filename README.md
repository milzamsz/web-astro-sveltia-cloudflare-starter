# 🌐 Astro + Sveltia CMS + Cloudflare

> A production-ready, multilingual marketing website template with **Astro 7**, **Sveltia CMS**, and **Cloudflare Pages**.

[![CI](https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter/actions/workflows/ci.yml)
[![Deploy](https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter/actions/workflows/release.yml/badge.svg)](https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

| Category | Details |
|----------|---------|
| **Framework** | Astro 7 with TypeScript — static-first, zero-JS by default |
| **Content** | Sveltia CMS at `/admin` — browser-based editing, preview workflow |
| **i18n** | Bilingual (English + Indonesian) with URL prefix routing |
| **Hosting** | Cloudflare Pages — global edge with auto-deploy |
| **Database** | Cloudflare D1 — auth, sessions, 2FA, contact data |
| **Storage** | Cloudflare R2 — media and file storage |
| **Auth** | Better Auth — email/password + mandatory TOTP 2FA + backup codes |
| **Security** | CSP headers, Turnstile CAPTCHA, rate limiting, secret scanning |
| **Email** | Resend — transactional email for contact form & auth |
| **SEO** | Semantic HTML, JSON-LD, sitemap, RSS, hreflang, LLMs.txt |
| **CI/CD** | GitHub Actions — lint, build, validate, deploy, dependabot |
| **Design** | Tailwind CSS v4 — responsive, accessible, dark-mode ready |

---

## 🚀 Quick Start

```bash
git clone https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter.git
cd web-astro-sveltia-cloudflare-starter
pnpm install
pnpm dev
```

Open **http://localhost:4321** — you're up and running.

> **New here?** See [SETUP.md](SETUP.md) for the full deployment walkthrough.

---

## 📖 Documentation

| Document | Audience | Purpose |
|----------|----------|---------|
| [SETUP.md](SETUP.md) | **Developers** | Complete setup guide from clone to production deploy |
| [CONTRIBUTING.md](CONTRIBUTING.md) | **Contributors** | Development workflow, conventional commits, PR rules |
| [SECURITY.md](SECURITY.md) | **Everyone** | Vulnerability reporting and security measures |
| [CHANGELOG.md](CHANGELOG.md) | **Everyone** | Version history and release notes |
| [ARCHITECTURE.md](ARCHITECTURE.md) | **Developers** | System architecture and data flow |
| [docs/admin-manual.md](docs/admin-manual.md) | **Admins** | Bootstrap, user management, 2FA recovery, backups |
| [docs/editor-guide.md](docs/editor-guide.md) | **Editors** | Content editing, preview, and publishing workflow |
| [TECHNICAL.md](TECHNICAL.md) | **Developers** | Implementation details and design decisions |
| [GOVERNANCE.md](GOVERNANCE.md) | **Maintainers** | Project governance and decision-making |

---

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│  Cloudflare  │────▶│   Astro 7    │
│              │     │  Pages CDN   │     │  (Static)    │
└─────────────┘     └──────────────┘     └──────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         ┌────────┐  ┌────────┐  ┌──────────┐
         │  D1   │  │  R2   │  │  Pages   │
         │ (SQL) │  │(Files)│  │Functions │
         └────────┘  └────────┘  └──────────┘
                                     │
                           ┌─────────┼─────────┐
                           ▼         ▼         ▼
                     ┌────────┐ ┌────────┐ ┌────────┐
                     │ Auth   │ │ CMS    │ │ Contact│
                     │ (B.A.) │ │(Sveltia)│ │+ Email │
                     └────────┘ └────────┘ └────────┘
```

**Key design decisions:**
- **Static-first**: Pages are pre-rendered at build time for maximum performance
- **Edge functions**: Authentication, form handling, and CMS API run as Cloudflare Pages Functions
- **D1 at edge**: SQLite-compatible database co-located with each deployment
- **Preview workflow**: Content editors work on `content-preview` branch; approved content is merged to `main`

---

## 🗂️ Project Structure

```
├── src/                  # Astro source
│   ├── pages/            # Route pages
│   ├── components/       # Reusable UI (Hero, FAQ, CTA, etc.)
│   ├── layouts/          # Base layout
│   ├── i18n/             # Translation dictionaries
│   ├── lib/              # Utilities, helpers, analytics
│   └── content/          # Blog, docs, CMS collections
├── functions/            # Cloudflare Pages Functions
│   ├── api/              # API endpoints (auth, cms, contact)
│   ├── admin/            # Admin middleware
│   └── preview/          # Preview middleware
├── public/               # Static assets
│   ├── _headers          # CSP + security headers
│   └── admin/            # Sveltia CMS loader
├── migrations/           # D1 SQL migrations
├── scripts/              # Build scripts
├── .github/workflows/    # CI/CD automation
├── docs/                 # User and admin documentation
└── .agentkanban/         # Agentic Kanban board
```

---

## 🔒 Security

| Layer | Protection |
|-------|-----------|
| **Edge** | CSP via `_headers`, X-Frame-Options, HSTS, Permissions-Policy |
| **Auth** | Argon2id password hashing, mandatory TOTP 2FA, rate limiting |
| **API** | Session validation, role-based access, CSRF protections |
| **Forms** | Turnstile CAPTCHA on contact form |
| **CI/CD** | Secret scanning (trufflehog), dependency review, Dependabot |
| **Infra** | Cloudflare WAF, DDoS protection, automatic TLS |

---

## 🧪 Validation

```bash
pnpm run lint              # ESLint + Stylelint + TypeScript
pnpm run validate:i18n     # Translation consistency
pnpm run validate:cms      # CMS configuration
pnpm run validate:secrets  # Secret hygiene check
pnpm run build             # Production build
```

---

## 🚢 Deployment

### Branch Flow

```
main ───────▶ Production (auto-deploy)
                │
content-preview ──▶ Preview (auto-deploy, auth-protected)
                │
feat/* ───────▶ CI only
```

### Triggering a Release

```bash
git tag -a v0.1.0 -m "v0.1.0"
git push origin v0.1.0
```

CI builds, deploys to Pages, and creates a GitHub Release with changelog.

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development workflow, conventional commits, and PR requirements.

---

## 📄 License

MIT © [milzamsz](https://github.com/milzamsz)
