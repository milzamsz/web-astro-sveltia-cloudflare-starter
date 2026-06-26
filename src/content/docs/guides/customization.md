---
title: Customization
description: Tailoring the starter to your needs.
sidebar:
  order: 3
---

## Branding

Update the site-wide identity in `src/lib/site-config.ts`:

```typescript
export const SITE_CONFIG = {
  name: "Your Brand",
  description: "Your tagline",
  url: "https://your-domain.com",
  defaultLocale: "en",
  locales: ["en", "id"],
  localeLabels: { en: "English", id: "Indonesia" },
  localePrefixes: { en: "en", id: "id" },
};
```

## CMS Configuration

Edit `public/admin/config.yml` to customise collections, fields, and widgets. The CMS config must stay in sync with the content schemas defined in `src/content.config.ts`.

## Adding Pages

1. Create a Markdown file in `src/content/pages/`:

```markdown
---
title: My Page
slug: my-page
locale: id
description: A new page.
---
## Content here
```

2. Add it to the navigation in `src/content/navigation.yml`
3. Create the locale route in `src/pages/[locale]/` if it needs a unique layout

## Updating the Hero

The homepage Hero component lives in `src/components/Hero.astro` and pulls its data from the first section defined in `src/content/pages/index.md`.
