## Project Snapshot

- Repository now contains an Astro app, governance docs, Agentic Kanban scaffolding, and implementation docs.
- `.git/` is absent, so GitHub-backed workflows in `PLAN.md` are not yet bootstrapped.
- `PLAN.md` remains the roadmap source, while `TECHNICAL.md` and `ARCHITECTURE.md` hold current implementation truth.

## Delivery Conventions

- Use the Standard workflow: `backlog -> planning -> in-progress -> review -> done`.
- Keep one implementation task in `in-progress` at a time unless the board policy changes.
- Treat `PLAN.md` phases as milestones, but implement as vertical slices with explicit dependencies.
- Prefer spec-driven tasks with shared capability specs under `.agentkanban/specs/` and per-task change folders under `.agentkanban/changes/`.

## Current Planning Decisions

- First approval batch is limited to bootstrap governance, Astro foundation, and i18n because they unblock every downstream slice.
- Public Git-backed content, preview publishing, and CMS auth remain blocked until repository bootstrap, content modeling, and auth contracts exist.
- Working behavior to preserve now includes the Astro static shell, i18n routing, SEO helper baseline, and `validate:i18n` command.

## Active Tasks Status (2026-06-24)

- **task_006 (CMS Content Modeling)** — `done` ✅ (Sveltia config, collections, validation, editor docs)
- **task_007 (Media Pipeline & R2 Delivery)** — `review` (R2 bindings, image presets, `<Img>`, OG metadata)
- **task_008 (Auth Admin Access & 2FA)** — `review` (D1 schema, auth endpoints, middleware, admin docs; 2FA enrollment outstanding)

**Still blocked:**
- 009 (Preview/Publish): blocked by 007 + 008
- 010 (Contact/Maps): blocked by 008
- 011 (SEO/Cleanup): one of two deps (006) done, still needs 007
- 012 (Security/Release): blocked by 009 + 010 + 011

## task_007 Implementation (2026-06-24) — REVIEW

**Delivered:**
- `wrangler.jsonc` — R2 bucket + D1 bindings
- `src/lib/images.ts` — 5 image presets, URL builders, srcset generation
- `src/components/Img.astro` — responsive image component
- `public/admin/config.yml` — R2 media library config
- `src/lib/seo.ts` — extended with og:image support
- `docs/editor-guide.md` — media workflow documentation

**Outstanding:**
- End-to-end R2 upload test (requires deployed Cloudflare Pages)
- Preset enforcement test (requires active Cloudflare Image Transformations)

## task_008 Implementation (2026-06-24) — REVIEW

**Delivered:**
- `migrations/001_auth.sql` — D1 schema (7 tables, indexes, seed roles)
- `functions/api/auth/sign-in.ts` — sign-in endpoint with rate limiting
- `functions/api/auth/sign-up.ts` — invite-only registration
- `functions/admin/_middleware.ts` — session + role + 2FA check
- `functions/_shared/auth.ts` — Better Auth setup + email templates
- `docs/admin-manual.md` — setup guide, recovery procedures

**Outstanding:**
- 2FA enrollment/verification routes (TOTP, email OTP fallback)
- Backup codes generation
- Session revocation on role change
- End-to-end testing (requires deployed Cloudflare Pages + D1 + Resend)
- Better Auth D1 adapter (requires Kysely adapter or custom)

**Status:** `lane: done` ✅ — Production-readiness audit PASS. Change folder archived. Unblocks tasks 007 and 008.

## Downstream Tasks Now Unblocked

With task_006 done:
- **task_007 (Media Pipeline & R2 Delivery)** — `dependsOn: [cms-content-modeling-and-editor-experience]` — NOW READY
- **task_008 (Auth Admin Access & 2FA)** — `dependsOn: [cms-content-modeling-and-editor-experience]` — NOW READY
- **task_011 (SEO AI Discovery & Cleanup)** — ONE of two blocked-by cleared (006 done, still needs 007)

**Status:** `lane: review` — waiting for human gate (`review → done`)

## Known Gaps

- No Git repository is present yet.
- No automated test suite exists yet.
- task_006 custom styling deferred to design pass.
- Starlight docs content not yet created (folder empty — expected).
