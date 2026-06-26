---
title: Content Management
description: How to manage content with Sveltia CMS.
sidebar:
  order: 1
---

## Accessing the CMS

Visit `/admin` on your deployed site or local dev server.

The admin interface uses [Sveltia CMS](https://sveltia.github.io/sveltia-cms/) — a lightweight, Git-based CMS that commits content changes directly to your repository.

## Content Collections

The CMS manages four content types:

| Collection | Description | Files |
| --- | --- | --- |
| **Pages** | Marketing pages (about, contact, pricing…) | `src/content/pages/*.md` and `*_en.md` |
| **Services** | Service offerings with pricing | `src/content/services/*.md` and `*_en.md` |
| **Blog** | Articles and news posts | `src/content/blog/*.md` |
| **Docs** | Documentation pages | Managed via Starlight |

## Locale Convention

- **Indonesian** (default): `<slug>.md` — e.g. `about.md`
- **English**: `<slug>_en.md` — e.g. `about_en.md`

The `locale` frontmatter field determines which language the content belongs to.

## Publish States

Each entry has a `publishState` field:

- **Published**: Visible in production
- **Draft**: Hidden from production, visible in preview builds
- **Archived**: Hidden everywhere

Content editors can preview drafts via the `content-preview` branch, which deploys to a separate Cloudflare Pages preview URL.
