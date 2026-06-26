---
title: Internationalization
description: Multi-language support patterns and translation workflows.
sidebar:
  order: 2
---

## How It Works

The i18n system is built on three layers:

1. **Astro's built-in i18n** — locale routing with `[locale]` dynamic segments
2. **Content collection locale fields** — each content entry declares its locale
3. **Translation key pairs** — matching content across locales via `translationKey`

## Adding a New Locale

Extend the supported locales in `src/lib/site-config.ts`:

```typescript
export type Locale = "id" | "en";
```

Update the arrays for other supported locales:

```typescript
locales: ["en", "id"] as const,
localeLabels: { en: "English", id: "Indonesia" } as const,
```

## UI Translations

UI strings live in `src/i18n/ui.ts`:

```typescript
export const UI = {
  en: { "nav.home": "Home", "nav.about": "About" },
  id: { "nav.home": "Beranda", "nav.about": "Tentang" },
} as const;
```

Access them in templates with the `t()` helper:

```astro
<p>{t(locale, "nav.home")}</p>
```

## Content Translation

For content entries (pages, services), use the `translationKey` field to pair Indonesian and English versions. The CMS shows both version in one view, making it easy to keep them in sync.
