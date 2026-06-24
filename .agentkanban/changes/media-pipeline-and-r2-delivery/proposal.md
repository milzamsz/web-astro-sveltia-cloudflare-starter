# Proposal: Media Pipeline And R2 Delivery

## Problem

The MVP requires binary assets to live outside Git, but the repo has no R2 media model, no responsive image strategy, and no transformation safety guardrails.

## Value

This slice enables editor-friendly media management while keeping the repository lightweight and production-safe.

## Scope

- Define dev, preview, and production R2 bucket contracts and asset domain expectations.
- Configure Sveltia media integration for R2-hosted uploads.
- Add responsive image helpers, transformation presets, and OG media strategy.
- Add file size/type limits and media governance rules.

## Non-Scope

- Media cleanup cron automation.
- Preview publishing logic.

## Constraints

- Media must not be stored in Git.
- Arbitrary transformation abuse must be blocked.

## Dependencies

- `cms-content-modeling-and-editor-experience`

## Assumptions

- Cloudflare Image Transformations remain the optimization mechanism.

## Risks

- Mis-scoped credentials can expose buckets.
- Poor preset design can cause runaway image variants and quota waste.

## Success Criteria

- Editors can upload and reference media through the CMS model.
- Public pages can render controlled, optimized image variants from R2.
