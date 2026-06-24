# Design: Preview Publish And Editorial Ops

## Architecture

Use `content-preview` as the draft branch, protected preview middleware for reviewer access, and Pages Functions endpoints to inspect status, publish to `main`, or discard draft changes.

## Components And Boundaries

- Preview middleware and banner UI.
- Shared GitHub integration utilities for branch state, merge, discard, and conflict checks.
- Publish/discard/build-status endpoints with role enforcement and audit events.
- End-to-end workflow tests spanning CMS edits through publish outcomes.

## Interfaces And Contracts

- Editors can save drafts to `content-preview`.
- Reviewers and publishers access protected preview through authenticated routes only.
- Publish requires successful preview status, valid role, and a clean merge/conflict state.

## Data Flow

CMS commits to preview branch; Cloudflare preview build runs; reviewers inspect preview; publishers call the publish endpoint to merge to `main`.

## Storage And Migrations

- D1 records audit events and possibly draft workflow metadata as needed.

## Security Model

- Preview access is authenticated and noindexed.
- Publish and discard endpoints require elevated roles and fail closed.

## Error And Failure Handling

- Conflicts and failed preview builds block publish with actionable errors.
- Discard actions require confirmation semantics and audit logging.

## Environment Behavior

- Preview uses isolated resources and disabled or sandboxed analytics/contact effects where required.

## Backward Compatibility

- Workflow supports later enhancements such as scheduled publish without changing branch ownership.

## Rollback Strategy

- Publishing operations rely on explicit branch state and reversible Git operations documented operationally.

## Testing Approach

- Integration tests for branch state and endpoint guards.
- E2E coverage for draft save, preview review, publish, and discard.

## Affected Areas

- `functions/api/cms/`
- `functions/preview/_middleware.ts`
- `functions/_shared/github.ts`
- preview UI components.
