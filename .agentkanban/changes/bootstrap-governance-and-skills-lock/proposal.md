# Proposal: Bootstrap Governance And Skills Lock

## Problem

The repository does not yet have a Git-backed project skeleton, implementation governance artifacts, or a reviewed skills inventory, so downstream work would be speculative and unauditable.

## Value

This task creates the trusted baseline for every later slice: repository bootstrap, runtime constraints, environment contracts, and a pinned project-scoped skills policy.

## Scope

- Initialize repository delivery contracts and baseline metadata.
- Record authoritative environment, branch, locale, and license decisions.
- Define the project-scoped skills review, pinning, and lock process.
- Create initial developer-facing docs for setup and governance expectations.

## Non-Scope

- Building Astro source code or Cloudflare resources.
- Implementing public pages, CMS, auth, or runtime endpoints.

## Constraints

- Must stay aligned with `PLAN.md` architecture and Agentic Kanban rules.
- Must remain fork-friendly and avoid global skill installation.

## Dependencies

- None.

## Assumptions

- `main` and `content-preview` remain the branch model.
- MIT, pnpm, Node 24 LTS, and `id`/`en` are still approved defaults.

## Risks

- Skill source review may uncover unsafe or irrelevant skills.
- Missing Git initialization could delay GitHub-specific automation.

## Success Criteria

- Repository bootstrap decisions are documented and testable.
- Skills policy, audit trail, and lock format are defined.
- Downstream tasks can rely on stable branch, runtime, and environment contracts.
