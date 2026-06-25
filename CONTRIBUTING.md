# Contributing

We welcome contributions! This guide explains how to contribute to this template effectively.

## Code of Conduct

Be respectful, constructive, and inclusive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).

## Getting Started

1. **Fork** the repository
2. **Clone** your fork
3. **Install** dependencies: `pnpm install`
4. **Run** the dev server: `pnpm dev`

## Development Workflow

### Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — always deployable |
| `content-preview` | Editorial preview — Sveltia CMS publishes here |
| `feat/*` | Feature branches |
| `fix/*` | Bug fixes |
| `chore/*` | Maintenance, dependencies, docs |

### Making Changes

1. Create a branch from `main`: `git checkout -b feat/my-feature`
2. Make your changes
3. Run validation locally:
   ```bash
   pnpm run lint        # ESLint + Stylelint
   pnpm run type-check  # TypeScript check
   pnpm run validate:i18n  # Translation consistency
   pnpm run validate:cms   # CMS config validity
   pnpm run build       # Production build
   ```
4. Commit using conventional commits (see below)
5. Push and open a PR against `main`

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `chore:` — Maintenance, dependencies
- `docs:` — Documentation changes
- `refactor:` — Code restructuring
- `style:` — Formatting, lint fixes (no logic change)
- `test:` — Adding or fixing tests
- `perf:` — Performance improvement
- `ci:` — CI/CD changes
- `i18n:` — Translation updates

### PR Requirements

- ✅ All CI checks pass (lint, type-check, build, validation)
- ✅ At least one reviewer has approved
- ✅ No security vulnerabilities introduced
- ✅ No secrets committed
- ✅ Documentation updated if changing public API or setup steps

## Agentic Kanban

This project uses [Agentic Kanban](https://github.com/milzamsz/vscode-agentic-kanban) for issue management.

- Tasks are in `.agentkanban/tasks/`
- Design documents are in `.agentkanban/changes/`
- See `.agentkanban/INSTRUCTION.md` for workflow rules

## Release Process

1. Changes accumulate on `main`
2. When ready for release, update `CHANGELOG.md`
3. Tag the release: `git tag -a v0.1.0 -m "v0.1.0"`
4. Push the tag: `git push origin v0.1.0`
5. CI automatically builds, deploys, and creates a GitHub Release

## Need Help?

- Check `SETUP.md` for environment setup
- Check `docs/admin-manual.md` for operations
- Check `docs/editor-guide.md` for content editing
- Open a [discussion](https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter/discussions)