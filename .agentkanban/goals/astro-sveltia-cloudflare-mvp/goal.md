# Goal: Astro Sveltia Cloudflare MVP

## Objective

Deliver a production-ready, multilingual Astro boilerplate for Cloudflare Pages that includes marketing pages, blog, docs, Sveltia CMS, Git-backed preview publishing, Better Auth, D1, R2, Turnstile-protected contact flows, analytics, SEO, cleanup automation, CI, and operational documentation.

## Success Criteria

- The repository contains implementation, tests, documentation, and deployment automation covering all MVP items in `PLAN.md`.
- Every non-trivial delivery slice is tracked as a spec-driven Agentic Kanban task with dependencies and evidence requirements.
- Release readiness can be proven through lint, test, build, and behavior evidence before the final `review -> done` gate.

## Constraints

- Follow the Standard Agentic Kanban workflow with explicit plan approval before implementation.
- Preserve `PLAN.md` as the source of truth unless a later approved spec intentionally narrows or clarifies scope.
- Keep the repo fork-friendly and static-first while using Cloudflare-native services for dynamic capabilities.

## Decomposition

1. Bootstrap governance, repository contracts, and skills lock.
2. Build Astro foundation and the shared design system.
3. Establish bilingual routing and locale validation.
4. Deliver public marketing, content, CMS, and media systems.
5. Secure admin access, preview publishing, and contact workflows.
6. Finish discovery, cleanup automation, hardening, CI/CD, and release docs.
