---
title: Contact Intake Maps And Analytics
slug: contact-intake-maps-and-analytics
lane: review
created: 2026-06-24T10:00:00+07:00
updated: 2026-06-25T19:00:00+07:00
description: Deliver the public contact flow, map configuration, Turnstile protection, submission handling, and analytics adapter behavior.
labels: []
priority: high
dependsOn: [auth-admin-access-and-2fa]
change: .agentkanban/changes/contact-intake-maps-and-analytics
spec: .agentkanban/specs/contact-intake-maps-and-analytics/spec.md
parent: astro-sveltia-cloudflare-mvp
blockerResolved: true
---

## Conversation

### user

Plan and deliver contact, maps, Turnstile, and analytics capabilities from `PLAN.md` phases 10 and 11.

### agent

Working in `task_010_contact-intake-maps-and-analytics.md`. This backlog task combines the visitor inquiry flow with typed analytics and abuse protections once public pages and admin auth exist.

### user

[comment: loop pass 1: verification passed on 2026-06-24T06:30:59.633Z]

### agent

**IMPLEMENTATION COMPLETE — advanced to `review`** (2026-06-25)

**Tasks completed:**
- [x] **Contact page UI** — Full form with name/email/subject/message fields, honeypot, Turnstile widget, accessible error/success states, localization
- [x] **Map section** — OpenStreetMap iframe embed with configurable lat/lng/zoom from CMS settings, accessible text fallback
- [x] **Contact API endpoint** — `POST /api/contact` with validation, honeypot, Turnstile verification, rate limiting (5/15min per IP hash), duplicate detection (same email+message within 1h)
- [x] **D1 persistence** — `migrations/002_contact.sql` creates `contact_submissions` table with ip_hash (SHA256), turnstile_score
- [x] **Email notifications** — Business notification + visitor confirmation via Resend (fire-and-forget)
- [x] **Turnstile helper** — `functions/_shared/turnstile.ts` with `verifyTurnstile()` and `hashIP()`
- [x] **Analytics adapter** — `src/lib/analytics/index.ts` with `initAnalytics()`, `trackEvent()`, typed event taxonomy, GTM + Umami providers
- [x] **Preview sandbox** — Analytics disabled via adapter; contact API returns early if `SVELTIA_BACKEND_BRANCH=content-preview`

**Verification:**
```
pnpm run build — Build: 24 pages, Complete ✅
POST /api/contact — {"ok":true,"id":"b0ddecc8-7020-4d20-a222-a58f19c6cad3"} ✅
D1 Migration — 4 queries executed, contact_submissions table created ✅
```

**Remaining (requires env setup):**
- Turnstile site key / secret key (currently using test keys)
- RESEND_API_KEY for email delivery
- Settings content (map lat/lng, analytics provider) configurable via CMS

**Transition:** `lane: in-progress → review`
