---
title: "Memulai dengan Astro + Sveltia CMS"
description: "Panduan langkah demi langkah untuk membangun situs multilingual dengan Astro dan Sveltia CMS."
locale: "id"
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

## Mengapa Stack Ini?

Membangun situs web marketing multilingual membutuhkan kombinasi alat yang bekerja sama dengan baik. **Astro** menyediakan pembangkitan situs statis, **Sveltia CMS** menawarkan antarmuka manajemen konten berbasis Git, dan **Cloudflare Pages** menangani deployment global.

## Menyiapkan Koleksi Konten

Koleksi konten adalah tulang punggung situs Anda. Definisikan skema di `src/content.config.ts`:

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

## Membuat Posting Pertama

Buat file Markdown baru di `src/content/blog/`:

```markdown
---
title: "Posting Pertama Saya"
description: "Deskripsi singkat"
locale: "id"
publishDate: 2026-06-25
draft: false
tags:
  - tutorial
author: "Admin"
---

## Konten di Sini

Tulis konten posting Anda menggunakan **Markdown**.
```

## Konten Multilingual

Gunakan field `translationKey` untuk memasangkan konten antar bahasa:

- `selamat-datang.md` (Indonesia)
- `welcome.md` (Inggris)

Field `translationKey` memastikan CMS menampilkan kedua versi bersamaan untuk diedit dengan mudah.
