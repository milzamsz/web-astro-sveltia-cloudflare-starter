---
title: "Getting Started with Astro + Sveltia CMS"
description: "A step-by-step guide to building a multilingual site with Astro and Sveltia CMS."
locale: "en"
publishDate: 2026-06-25
draft: false
tags:
  - astro
  - sveltia
  - tutorial
  - cms
author: "Admin"
translationKey: "getting-started"
---

## Why This Stack?

Building a multilingual marketing website requires a combination of tools that work well together. **Astro** provides the static site generation, **Sveltia CMS** offers a Git-based content management interface, and **Cloudflare Pages** handles global deployment.

## Setting Up Content Collections

Content collections are the backbone of your site. Define a schema in `src/content.config.ts`:

```typescript
const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(["id", "en"]),
    publishDate: z.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Admin"),
    translationKey: z.string().optional(),
  }),
});
```

## Creating Your First Post

Create a new Markdown file in `src/content/blog/`:

```markdown
---
title: "My First Post"
description: "A short description"
locale: "en"
publishDate: 2026-06-25
draft: false
tags:
  - tutorial
author: "Admin"
---

## Content Here

Write your post content using **Markdown**.
```

## Multilingual Content

Use the `translationKey` field to pair content across locales:

- `welcome.md` (Indonesian)
- `welcome_en.md` (English) — or use the `locale` field within the same folder

The `translationKey` field ensures the CMS shows both versions together for easy editing.

## Previewing Drafts

Draft posts are excluded from production builds. To preview:

1. Set `draft: true` in the frontmatter
2. Push to the `content-preview` branch
3. Cloudflare Pages deploys a preview environment

## Going Further

- Customize the [Tailwind CSS](https://tailwindcss.com) theme in `src/styles/global.css`
- Add new sections to pages via the CMS
- Set up analytics with GTM or Umami via the site settings
