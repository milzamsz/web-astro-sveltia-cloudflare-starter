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
| **Design** | Tailwind CSS v4 + monochrome **OKLCH** design tokens — responsive, accessible, dark-mode ready |
| **AI-ready** | `AGENTS.md` + `system/globals/` KB, three-tier architecture, `check:kpis` guardrail, convention-guard hook |

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

## 🤖 AI-Assisted Development

This starter is built to be operated by AI coding agents and to keep their output
**on-system**. The conventions are written once and enforced automatically.

**Three-tier architecture:** Components (`src/components/ui/**`) → Sections
(`src/components/sections/**`, single barrel) → Pages (`src/pages/**`). Compose
pages from sections. Live galleries at `/sections` and `/pages`; a machine-readable
catalog in `src/registry.json`.

**One source of truth for design:** OKLCH tokens in `src/styles/tokens/*.css` plus
the canonical knowledge base in `system/globals/` (colors, typography, spacing,
interaction, imagery, effects, responsiveness, accessibility).

**Guardrails:** `pnpm check:kpis` verifies design conventions (no hardcoded colors,
no Tailwind palette utilities, no deprecated imports, no stray `tailwind.config.*`,
images have alt). It runs in `pnpm lint` and is CI-friendly. A Cursor
`afterFileEdit` hook (`.cursor/hooks/guard-conventions.mjs`) warns in real time.

**Works with your tool:** the [AGENTS.md](AGENTS.md) standard plus per-tool configs.

| Path | Tool |
| --- | --- |
| `AGENTS.md` | Codex, Cursor, Jules, Gemini CLI, Zed, Aider, … |
| `DESIGN.md` | Bring-your-own-brand → tokens |
| `.cursor/rules/*.mdc`, `.cursor/hooks.json` | Cursor |
| `.github/copilot-instructions.md` | GitHub Copilot |
| `.windsurfrules` | Windsurf |
| `system/prompts/*` | Portable self-audit prompts (any chat tool) |

> **Try it:** open the repo in your agent and say *"Read AGENTS.md,
> then build me a pricing page from the existing sections."*

---

## 🗂️ Project Structure

```
├── src/                  # Astro source
│   ├── pages/            # Route pages (+ /sections, /pages showcases)
│   ├── components/       # UI tier (ui/) + Sections tier (sections/)
│   ├── layouts/          # Base + content layouts
│   ├── styles/tokens/    # OKLCH design tokens (colors/typography/spacing)
│   ├── i18n/             # Translation dictionaries
│   ├── lib/              # Utilities, helpers, analytics
│   ├── registry.json     # Machine-readable component/section/page catalog
│   └── content/          # Blog, docs, CMS collections
├── system/               # AI knowledge base (globals/) + audit prompts
├── scripts/check-kpis.mjs # Design-convention guardrail (source of truth)
├── .cursor/              # rules/ + hooks (convention guard)
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
pnpm run lint              # ESLint + Stylelint + TypeScript + check:kpis + validators
pnpm run check:kpis        # Design conventions (on-system guardrail)
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
