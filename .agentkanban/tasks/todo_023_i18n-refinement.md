# Iteration 1

## JSON Translation Files
- [x] Create `src/i18n/en.json` — migrate all existing keys from `ui.ts` into JSON; add all new keys listed below in English
- [x] Create `src/i18n/id.json` — same structure as `en.json`; translate all keys into Indonesian

## New Translation Keys to Add

### Blog
- [x] `blog.readMore` (EN: "Read more", ID: "Baca selengkapnya")
- [x] `blog.publishedOn` (EN: "Published on", ID: "Diterbitkan pada")
- [x] `blog.updatedOn` (EN: "Updated on", ID: "Diperbarui pada")
- [x] `blog.minuteRead` (EN: "min read", ID: "menit baca")
- [x] `blog.minutesRead` (EN: "{n} min read", ID: "{n} menit baca")
- [x] `blog.share` (EN: "Share", ID: "Bagikan")
- [x] `blog.shareVia` (EN: "Share via", ID: "Bagikan melalui")
- [x] `blog.copyLink` (EN: "Copy link", ID: "Salin tautan")
- [x] `blog.copied` (EN: "Copied!", ID: "Tersalin!")
- [x] `blog.tags` (EN: "Tags", ID: "Tag")
- [x] `blog.toc` (EN: "Table of Contents", ID: "Daftar Isi")
- [x] `blog.relatedPosts` (EN: "Related Posts", ID: "Artikel Terkait")
- [x] `blog.noResults` (EN: "No posts found", ID: "Tidak ada artikel ditemukan")
- [x] `blog.filterByTag` (EN: "Filter by tag", ID: "Filter berdasarkan tag")
- [x] `blog.allPosts` (EN: "All Posts", ID: "Semua Artikel")

### Navigation
- [x] `nav.search` (EN: "Search", ID: "Cari")
- [x] `nav.openSearch` (EN: "Open search", ID: "Buka pencarian")
- [x] `nav.toggleMenu` (EN: "Toggle menu", ID: "Buka/tutup menu")
- [x] `nav.openMenu` (EN: "Open menu", ID: "Buka menu")
- [x] `nav.closeMenu` (EN: "Close menu", ID: "Tutup menu")
- [x] `nav.darkMode` (EN: "Switch to dark mode", ID: "Beralih ke mode gelap")
- [x] `nav.lightMode` (EN: "Switch to light mode", ID: "Beralih ke mode terang")

### Services
- [x] `services.learnMore` (EN: "Learn more", ID: "Pelajari lebih lanjut")
- [x] `services.viewAll` (EN: "View all services", ID: "Lihat semua layanan")
- [x] `services.priceRange` (EN: "Price range", ID: "Kisaran harga")
- [x] `services.features` (EN: "Features", ID: "Fitur")
- [x] `services.tags` (EN: "Related to", ID: "Terkait dengan")

### Forms
- [x] `form.submit` (EN: "Send message", ID: "Kirim pesan")
- [x] `form.sending` (EN: "Sending...", ID: "Mengirim...")
- [x] `form.success` (EN: "Message sent successfully!", ID: "Pesan berhasil dikirim!")
- [x] `form.error` (EN: "Failed to send. Please try again.", ID: "Gagal mengirim. Silakan coba lagi.")
- [x] `form.required` (EN: "Required", ID: "Wajib diisi")
- [x] `form.namePlaceholder` (EN: "Your name", ID: "Nama Anda")
- [x] `form.emailPlaceholder` (EN: "your@email.com", ID: "anda@email.com")
- [x] `form.messagePlaceholder` (EN: "How can we help?", ID: "Bagaimana kami bisa membantu?")

### General / Accessibility
- [x] `aria.skipToContent` (EN: "Skip to main content", ID: "Lewati ke konten utama")
- [x] `aria.closeModal` (EN: "Close dialog", ID: "Tutup dialog")
- [x] `aria.searchButton` (EN: "Search site", ID: "Cari di situs")
- [x] `pagination.prev` (EN: "Previous", ID: "Sebelumnya")
- [x] `pagination.next` (EN: "Next", ID: "Berikutnya")
- [x] `pagination.page` (EN: "Page", ID: "Halaman")
- [x] `pagination.of` (EN: "of", ID: "dari")
- [x] `search.placeholder` (EN: "Search posts, pages...", ID: "Cari artikel, halaman...")
- [x] `search.noResults` (EN: "No results found", ID: "Tidak ada hasil ditemukan")
- [x] `search.loading` (EN: "Loading results...", ID: "Memuat hasil...")

## i18n Loader Update
- [x] Update `src/i18n/ui.ts` (or `src/i18n/index.ts`) to import from `./en.json` and `./id.json`
- [x] Merge JSON into existing `translations` object
- [x] Keep `t(locale, key)` function signature unchanged
- [x] Add TypeScript types for all new keys (or use `Record<string, string>`)

## Validation Script
- [x] Update `scripts/validate-i18n.js` to check that all keys in `en.json` exist in `id.json`
- [x] Script should exit with non-zero code on missing keys
- [x] `pnpm run validate:i18n` must pass in CI

## Component Audit
- [x] Audit `Header.astro` — all strings use `t()` calls
- [x] Audit `Footer.astro` — copyright, nav labels use `t()`
- [x] Audit `SearchModal.astro` — placeholder, no-results use `t()`
- [x] Audit `BlogCard.astro` — date, readMore, readingTime use `t()`
- [x] Audit `ArticleHero.astro` — all labels use `t()`
- [x] Audit `TableOfContents.astro` — heading uses `t()`
- [x] Audit `ShareButtons.astro` — all button labels use `t()`
- [x] Audit `ServiceCard.astro` — CTA, labels use `t()`
- [x] Audit `Pagination.astro` — prev/next/page/of use `t()`

## Verification
- [x] `pnpm run validate:i18n` — exits 0, no missing keys
- [x] `astro check` — no TypeScript errors
- [x] Switch site to `/id/` locale — all UI strings in Indonesian
- [x] Switch back to `/` (EN) — all UI strings in English
