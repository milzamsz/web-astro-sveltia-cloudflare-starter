# Proposal: Contact Intake Maps And Analytics

## Problem

The MVP promises a protected contact workflow, configurable map experience, and optional analytics providers, but these visitor-facing dynamic capabilities do not exist yet.

## Value

This slice enables lead capture and measurement while preserving privacy, anti-abuse controls, and preview-safe behavior.

## Scope

- Build the public contact form and configurable map presentation.
- Add Turnstile verification, validation, honeypot, rate limiting, duplicate protection, and D1 submission storage.
- Send business notifications and visitor confirmations through Resend.
- Implement the analytics adapter interface with GTM and Umami providers plus event taxonomy enforcement.

## Non-Scope

- Final cross-cutting security review.
- Media cleanup or publish automation.

## Constraints

- No PII in analytics.
- Contact submission behavior must degrade safely when anti-abuse checks fail.

## Dependencies

- `core-marketing-pages`
- `auth-admin-access-and-2fa`

## Assumptions

- Maps configuration comes from editable site settings defined by the CMS task.

## Risks

- Form abuse or duplicate submissions can create operational noise.
- Analytics drift can create privacy issues or invalid reporting.

## Success Criteria

- Visitors can submit protected inquiries and receive safe feedback.
- Analytics remain configuration-driven and privacy-respecting.
