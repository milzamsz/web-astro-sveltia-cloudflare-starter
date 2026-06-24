# Proposal: Preview Publish And Editorial Ops

## Problem

The MVP requires a branch-based editorial workflow with protected preview and controlled publishing, but no preview orchestration exists.

## Value

This slice delivers the editorial review loop that lets content be drafted safely before affecting production.

## Scope

- Define `content-preview` workflow behavior and protected preview access.
- Add build status, publish, and discard endpoints with role enforcement.
- Add preview UI indicators, conflict detection, and audit events.
- Add end-to-end verification for draft, review, publish, and discard flows.

## Non-Scope

- Underlying auth stack creation.
- Core CMS collection design.

## Constraints

- Editors can draft but not publish.
- Production must remain unchanged until publish succeeds.

## Dependencies

- `media-pipeline-and-r2-delivery`
- `auth-admin-access-and-2fa`

## Assumptions

- GitHub remains the content backend and preview branch storage mechanism.

## Risks

- Merge conflict handling can disrupt publishing.
- Preview environment mistakes can leak production integrations.

## Success Criteria

- Draft content is visible only in protected preview.
- Publishers can promote approved content to production through auditable server-side controls.
