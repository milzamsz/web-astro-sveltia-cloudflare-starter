# Design: Bootstrap Governance And Skills Lock

## Architecture

Create the repository baseline as documentation and configuration artifacts first, then use those artifacts to gate all implementation work.

## Components And Boundaries

- Repo bootstrap files: package manager, Node version, license, ignore rules, and Git conventions.
- Governance docs: README, deployment assumptions, skills lock, and technical notes.
- Skills policy: reviewed, pinned, project-scoped entries under `.agents/skills/` with a lock manifest.

## Interfaces And Contracts

- `.agent-skills.lock.md` is the source of truth for reviewed skill sources.
- Setup docs must specify required secrets, environments, and Cloudflare/GitHub prerequisites.
- Branch contract is `main` for production and `content-preview` for editorial preview.

## Data Flow

Human-approved architecture decisions become repo docs, then inform implementation tasks, CI, and deployment later.

## Storage And Migrations

- No application database yet.
- Reserve migration directory naming and environment separation rules for later tasks.

## Security Model

- No secret material committed.
- Skills are reviewed before installation, pinned to exact commits, and verified in CI later.

## Error And Failure Handling

- If a required decision cannot be validated, document it as a blocker rather than inventing runtime behavior.

## Environment Behavior

- Local: docs and config only.
- Preview/production: no runtime changes yet, but contracts must define separate resources.

## Backward Compatibility

- No existing implementation to preserve.

## Rollback Strategy

- Revert bootstrap artifacts independently if later decisions change.

## Testing Approach

- Validate documentation completeness against `PLAN.md`.
- Add future scripts for environment and skills verification.

## Affected Areas

- Root docs and metadata.
- `.agents/skills/`
- `.agent-skills.lock.md`
- future package/runtime config files.
