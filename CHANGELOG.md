# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- CSP and security headers via `public/_headers`
- GitHub Actions CI workflow (lint, type-check, build, validation)
- GitHub Actions preview deploy workflow
- GitHub Actions release workflow with auto-tagging
- Dependabot configuration for weekly dependency checks
- Dependency review action on PRs (fails on moderate+ severity)
- Secret scanning via trufflehog in CI
- Skills verification workflow
- SECURITY.md — vulnerability reporting policy
- CONTRIBUTING.md — development guidelines
- CHANGELOG.md — this file

### Changed
- README.md — comprehensive rewrite with architecture, features, deployment, and troubleshooting
- SETUP.md — expanded with Cloudflare, GitHub secrets, D1, R2, and full deployment walkthrough

## [0.0.1] — 2026-06-24

### Added
- Initial project scaffolding
- Astro 7 with TypeScript
- Tailwind CSS v4
- Bilingual content (English / Indonesian)
- Sveltia CMS at `/admin`
- Cloudflare Pages hosting
- Cloudflare D1 database (auth, sessions, 2FA, contacts)
- Cloudflare R2 media storage
- Cloudflare Turnstile bot protection
- Better Auth with email/password + mandatory TOTP 2FA
- Email OTP login option
- Backup codes for 2FA recovery
- Session management with secure cookies
- Admin role-based access control (admin, publisher, reviewer, editor)
- Preview/publish workflow (content-preview branch)
- Build status polling in CMS
- Contact form with Turnstile + D1 storage + Resend emails
- R2 media cleanup worker (dry-run, quarantine, delete)
- SEO: canonical, hreflang, JSON-LD, Open Graph, sitemap, RSS
- LLMs.txt for AI discoverability
- Media manifest for R2 cleanup
- Analytics adapter (GTM, Umami, none)
- Multilingual i18n routing with prefix-based locale URLs
- Responsive image presets
- Admin manual and editor guide documentation