# Setup Guide

## Prerequisites

| Requirement | Version         |
|-------------|-----------------|
| Node.js     | 24 LTS          |
| pnpm        | 8.15.0+         |
| Git         | Latest          |
| Cloudflare  | wrangler CLI    |

## Quick Start

```bash
# 1. Clone and install
pnpm install

# 2. Start the development server
pnpm dev
```

## Environment Classes

| Class      | Purpose                     | D1? | R2? | Resend? | Turnstile? |
|------------|-----------------------------|-----|-----|---------|------------|
| `local`    | Development                 | opt | opt | opt     | opt        |
| `preview`  | Staging / content review    | yes | yes | yes     | yes        |
| `production` | Live site                | yes | yes | yes     | yes        |

## Environment Variables

See `.env.example` for the full list.

## Branch Strategy

| Branch                        | Use                         | Auto-deploy |
|-------------------------------|-----------------------------|-------------|
| `main`                        | Production                  | Pages       |
| `content-preview`             | Editorial preview           | Pages       |
| `feat/*`, `fix/*`, `chore/*`  | Development branches        | —           |

## Skill Governance

This project uses reviewed, pinned skills. See `.agent-skills.lock.md` for the current lock.

> **Important:** Skills are reviewed before installation, pinned to exact commits, and validated during CI. Do not add skills outside the lock file.
