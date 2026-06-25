---
title: SEO AI Discovery And Cleanup Ops
slug: seo-ai-discovery-and-cleanup-ops
lane: review
created: 2026-06-24T10:00:00+07:00
updated: 2026-06-25T21:00:00+07:00
description: Finish SEO and AI discovery artifacts, generate production-only discovery outputs, and add the media cleanup worker and restore process.
labels: []
priority: high
dependsOn: [cms-content-modeling-and-editor-experience, media-pipeline-and-r2-delivery]
change: .agentkanban/changes/seo-ai-discovery-and-cleanup-ops
spec: .agentkanban/specs/seo-ai-discovery-and-cleanup-ops/spec.md
parent: astro-sveltia-cloudflare-mvp
blockerResolved: true
---

## Conversation

### user

Plan and deliver SEO, AI discovery, and cleanup automation from `PLAN.md` phases 12 and 13.

### agent

Working in `task_011_seo-ai-discovery-and-cleanup-ops.md`. This backlog task hardens public discovery and media lifecycle operations after content and media delivery are stable.

### user

[comment: loop pass 1: verification passed on 2026-06-24T06:30:59.704Z]

### agent

**SWEEP BACKLOG → PLANNING** (2026-06-25)

**Readiness:** task_006 (CMS Content Modeling) ✅ done, task_007 (Media Pipeline) ✅ done. Both `dependsOn` cleared. `blocked-by` labels removed. `blockerResolved: true`. **Ready for planning.**

---

### Discovery — SEO, AI Discovery & Cleanup Ops

**Problem:** SEO helpers exist but canonical, hreflang, sitemap, RSS, JSON-LD, and breadcrumbs lack production hardening. No `llms.txt` exists. Draft and preview content may leak into discovery outputs. Media cleanup is manual — no automated lifecycle management.

**Outcome:** All discovery artifacts represent only published, production-safe content. Media cleanup runs safely with dry-run, quarantine, and delete modes. Restore procedures documented.

**Actors:** Build pipeline (generates artifacts), Cron worker (cleanup), Content editors (verify manifests), Admins (restore).

**Scope in:**
- Canonical URL hardening (ensure draft/preview excluded)
- Hreflang validation across all locale pairs
- Sitemap index excludes draft/preview content
- RSS feed generation (production content only)
- JSON-LD validation (Organization, Service, WebSite, BreadcrumbList)
- Internal linking analysis + validation
- `public/llms.txt` generation from published content
- Media manifest generation (enumerate all referenced R2 objects from content)
- Cleanup worker with modes: dry-run (report only), quarantine (move to `quarantine/` prefix), delete
- Grace period (30 days before quarantine → delete)
- Protected prefixes (e.g., `og/`, `logos/`, `favicon/`) never touched
- Cleanup report output (JSON) + notification
- Restore documentation (from quarantine back to live prefix)

**Scope out:**
- Automated link checking / broken link detection
- Search console integration
- A/B testing or personalization

**Testable acceptance criteria (per spec):**
1. Build generates sitemap, RSS, `llms.txt` → only published content included
2. Draft blog post with `draft: true` → excluded from all discovery outputs
3. Preview deployment → `noindex` header + excluded from sitemap
4. Cleanup worker dry-run → reports objects without deleting
5. Referenced media in published content → not quarantined/deleted
6. Orphaned media older than grace period → quarantined (not deleted)
7. Restore script moves object from quarantine back to live prefix

**Constraints:**
- Discovery outputs must never expose draft/preview/internal content
- Cleanup dry-run is the only allowed production mode for first deploy
- Protected prefixes hard-coded (not configurable)
- Grace period enforced client-side + server-side

**Affected code:**
- `src/lib/seo.ts` — canonical/hreflang/sitemap helpers
- `public/llms.txt` — generation script
- `scripts/generate-manifest.cjs` (new) — media manifest builder
- `functions/api/cleanup.ts` (new) — cleanup worker endpoint
- `docs/editor-guide.md` — cleanup + restore documentation
- `wrangler.jsonc` — cron trigger for cleanup worker

---

### Implementation Plan

**Approach:** SEO hardening extends existing `src/lib/seo.ts` helpers. Build-time scripts generate `llms.txt` and media manifest. Cleanup worker runs as a cron-triggered Pages Function. Restore documented in admin manual.

**Key decisions:**
- **Build-time generation** — sitemap, RSS, `llms.txt` generated at build via Astro integrations. No runtime overhead.
- **Media manifest** — `scripts/generate-manifest.cjs` reads all content entries, extracts `mediaReferences` fields, outputs JSON. Run at build.
- **Cleanup worker** — `functions/api/cleanup.ts` triggered by cron (wrangler.jsonc `triggers.crons`). Compares manifest against R2 bucket listing.
- **Dry-run default** — first production deployment runs in dry-report only. Operator must explicitly enable quarantine/delete via env var `CLEANUP_MODE=quarantine`.
- **Restore** — documented SQL + R2 copy commands in admin manual.
- **Rejected alternatives:** Cloudflare R2 lifecycle rules (no dry-run), S3 batch (complex setup).

**Data model:** No new D1 tables. Cleanup reports stored as JSON in R2 `reports/` prefix. Manifest stored at build as `dist/media-manifest.json`.

**Security model:**
- Cleanup worker credentials scoped to R2 buckets only
- `CLEANUP_MODE` env var controls mode (dry-run | quarantine | delete)
- Protected prefixes (`og/`, `logos/`, `favicon/`, `uploads/`) hard-coded
- Grace period (30 days) enforced via configurable `CLEANUP_GRACE_DAYS` env var

**Verification path:**
- `pnpm run build` → generates `dist/media-manifest.json` + `dist/llms.txt`
- `pnpm run validate:seo` (new) → validates discovery output integrity
- Cleanup dry-run → report with object count + size, no deletions
- Quarantine mode → objects moved to `quarantine/YYYY-MM-DD/` prefix
- Restore via R2 copy command: `wrangler r2 object copy`

**Risks & mitigations:**
- Build manifest out of sync with R2 → manifest rebuild triggered on publish
- Accidental deletion → dry-run default, quarantine before delete, restore docs
- Large R2 buckets → paginated listing with concurrency limits

**Spec-driven:** Change folder exists at `.agentkanban/changes/seo-ai-discovery-and-cleanup-ops/`. `design.md` updated with Production Readiness categories.

**Review Policy:** `high` priority → planning=**independent-agent**, implementation=**independent-agent**.

**Transition:** `lane: backlog → planning`
