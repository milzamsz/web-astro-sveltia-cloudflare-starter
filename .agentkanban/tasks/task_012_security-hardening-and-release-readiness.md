---
title: Security Hardening And Release Readiness
slug: security-hardening-and-release-readiness
lane: planning
created: 2026-06-24T10:00:00+07:00
updated: 2026-06-26T01:35:00+07:00
description: Complete cross-cutting security hardening, CI/CD, release automation, deployment docs, and final production-readiness checks.
labels: []
priority: critical
dependsOn: [preview-publish-and-editorial-ops, contact-intake-maps-and-analytics, seo-ai-discovery-and-cleanup-ops]
change: .agentkanban/changes/security-hardening-and-release-readiness
spec: .agentkanban/specs/security-hardening-and-release-readiness/spec.md
parent: astro-sveltia-cloudflare-mvp
blockerResolved: true
---

## Conversation

### user

Plan and deliver the final hardening, CI/CD, documentation, and release slice from `PLAN.md` phases 14 and 15.

### agent

Working in `task_012_security-hardening-and-release-readiness.md`. This backlog task closes the loop with verification, operational docs, and release packaging once the feature slices are complete.

### user

[comment: loop pass 1: verification passed on 2026-06-24T06:30:59.769Z]

### agent

**SWEEP BACKLOG → PLANNING** (2026-06-26)

**Readiness:** task_009 (Preview/Publish) ✅ done, task_010 (Contact/Maps) ✅ done, task_011 (SEO/Cleanup) ✅ done. All `dependsOn` cleared. `blocked-by` labels removed. `blockerResolved: true`. **Ready for planning.**

---

### Discovery — Security Hardening & Release Readiness

**Problem:** Feature slices are complete but no cross-cutting security hardening exists: no CSP headers, no CI/CD workflows, no Dependabot, no secret scanning, no release process, no deployment guide. A new team cloning this repo today could not deploy without maintainer-only knowledge.

**Outcome:** The repository becomes a self-documenting, forkable template with automated quality gates, security baseline, and clear deployment/recovery docs. A new team can go from clone → deploy in minutes.

**Actors:** Developers (forking + deploying), Editors (admin guide), Admins (deployment + recovery), CI (automated quality gates).

**Scope in:**
- **Security hardening:** CSP headers (Content-Security-Policy via `_headers` or `wrangler.jsonc`), secure cookie flags verified, CSRF protections for POST endpoints, open-redirect checks in auth middleware, role-bypass tests
- **CI/CD workflows:** GitHub Actions — `CI` (lint + build + type-check + validate:i18n + validate:cms), `preview` (deploy to Cloudflare Pages on PR), `release` (tag + deploy), `dependency-review` (Dependabot + reviewdog), `secret-scanning` (trufflehog or gitleaks)
- **Documentation:** README overhaul, `SETUP.md` (quick-start), `TECHNICAL.md` (architecture), `docs/editor-guide.md` (CMS workflow), `docs/admin-manual.md` (deployment + recovery), `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, deployment walkthrough
- **Agentic Kanban:** skills verification workflow, evidence export for lint/test/build/behavior
- **Release:** versioned tag, release notes, template publication checklist

**Scope out:**
- Penetration testing or external security audit
- Load testing
- Multi-region deployment

**Testable acceptance criteria (per spec):**
1. Security regression check: protected routes (admin, preview) fail closed; public routes serve with CSP headers
2. CI workflow: `pnpm run build` + `pnpm run lint` + `pnpm validate:cms` exit 0 on every push
3. Dependabot configured and alerting on vulnerabilities
4. Secret scanning configured and blocking committed secrets
5. README guides a new user from clone → `pnpm dev` → first deploy in under 30 min
6. `docs/admin-manual.md` covers bootstrap, user management, 2FA recovery, database backup, and cleanup restore
7. Release tag created with changelog and template checklist

**Constraints:**
- All credentials external to Git (secrets via Cloudflare Pages or `.dev.vars`)
- CSP must allow Sveltia CMS CDN, Turnstile, analytics providers, and OpenStreetMap
- CI must not require paid GitHub plan features
- Docs must be maintenance-friendly (single source of truth in code)

**Affected code:**
- `public/_headers` (new) — CSP + security headers
- `.github/workflows/ci.yml` (new)
- `.github/workflows/preview.yml` (new)
- `.github/workflows/release.yml` (new)
- `.github/dependabot.yml` (new)
- `README.md` — full rewrite
- `SETUP.md` (new) — quick-start guide
- `CONTRIBUTING.md` (new)
- `SECURITY.md` (new)
- `CHANGELOG.md` (new)
- `docs/admin-manual.md` — update with deployment + recovery
- `scripts/validate-secrets.cjs` (new) — secret hygiene check

---

### Implementation Plan

**Approach:** Security hardening via static `_headers` file (Cloudflare Pages computes CSP). CI/CD via standard GitHub Actions templates. Documentation as Markdown in repo root plus `docs/`. Release via GitHub Releases with `CHANGELOG.md` tracking.

**Key decisions:**
- **`_headers` for CSP** — Cloudflare Pages supports `_headers` for static route-based header injection. Simpler than middleware for security headers.
- **GitHub Actions** — `actions/checkout` + `pnpm/action-setup` + standard matrix. No third-party CI runners needed.
- **Dependabot** — built-in GitHub, zero config beyond `.github/dependabot.yml`
- **Secret scanning** — `trufflehog` via GitHub Actions workflow. Scans for secrets on push, blocks PRs with findings.
- **CSP policy** — `default-src 'self'`; `script-src 'self' 'unsafe-inline' cdn.jsdelivr.net challenges.cloudflare.com umami.example.com googletagmanager.com`; `style-src 'self' 'unsafe-inline'`; `frame-src challenges.cloudflare.com www.openstreetmap.org`; `connect-src 'self' api.resend.com api.github.com challenges.cloudflare.com`
- **Rejected alternatives:** Netlify `_headers` (locked to Netlify), middleware-based CSP (more complex, error-prone), Renovate (more setup than Dependabot for this scale).

**Data model:** No new D1 tables. No migrations.

**Security model:**
- CSP enforced at edge via `_headers` — no runtime overhead
- All auth endpoints already fail closed (verified in task 008)
- CI runs security lint on every push
- Dependabot alerts on vulnerable deps automatically
- Secret scanning committed secrets will fail CI

**Verification path:**
- `pnpm run build && pnpm run lint && pnpm validate:cms` — all pass
- `curl -I https://site.pages.dev | grep content-security-policy` — CSP header present
- `Dependabot` alert on first vulnerable dep detected
- `README` walkthrough: clone → `pnpm install` → `pnpm dev` → opens browser at localhost

**Risks & mitigations:**
- CSP too restrictive blocks CMS or analytics → test before deploying; use report-only mode initially
- CI secrets exposed → GitHub Actions secrets for deploy tokens, never in workflow files
- Docs out of sync with code → CI checks doc freshness via `validate:cms` and `validate:i18n` as proxies

**Spec-driven:** Change folder exists at `.agentkanban/changes/security-hardening-and-release-readiness/`. `design.md` requires Production Readiness section (see below).

**Review Policy:** `critical` priority → planning=**independent-agent**, implementation=**independent-agent+human**. Requires independent-agent planning review before `planning → in-progress`. `review → done` also needs independent-agent + human sign-off.

**Transition:** `lane: backlog → planning`
