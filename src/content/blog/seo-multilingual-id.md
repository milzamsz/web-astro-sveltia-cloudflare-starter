---
title: "SEO untuk Situs Multilingual"
description: "Praktik terbaik SEO teknis untuk situs dengan beberapa bahasa."
locale: "id"
publishDate: 2026-06-22
draft: false
tags:
  - seo
  - i18n
  - performance
author: "Admin"
translationKey: "seo-guide"
---

## Mengapa SEO Penting untuk Situs Multilingual

Mesin pencari membutuhkan sinyal yang jelas tentang bahasa dan targeting regional. Situs multilingual yang terstruktur dengan baik dapat peringkat di beberapa negara secara bersamaan.

## Tag Hreflang

Hreflang memberi tahu Google versi bahasa mana dari halaman yang harus ditampilkan:

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="id" href="https://example.com/id/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Starter ini menyertakan pembuatan hreflang otomatis melalui fungsi `hreflangLinks()` di `src/lib/seo.ts`.

## URL Canonical

Setiap halaman harus memiliki URL canonical yang merujuk ke dirinya sendiri:

```typescript
export function canonicalUrl(locale: Locale, path: string): string {
  const prefix = localePrefix(locale);
  const normalized = path.replace(/\/$/, "");
  return `${SITE_CONFIG.url}${prefix}${normalized || ""}`;
}
```

## Data Terstruktur (JSON-LD)

Gunakan `jsonLdWebSite()` untuk halaman utama dan `jsonLdBlogPost()` untuk artikel:

```typescript
const websiteJsonLd = jsonLdWebSite({
  title: "Situs Saya",
  description: "Deskripsi situs",
  locale: "id",
  url: "https://example.com/id",
});
```

## Pertimbangan Performa

- **Pembangkitan statis**: Halaman dibangun sebelumnya, memastikan waktu muat yang cepat
- **Pengiriman CDN**: Jaringan global Cloudflare menyimpan konten di edge
- **Core Web Vitals**: Arsitektur zero-JS Astro membantu mencapai skor yang baik
