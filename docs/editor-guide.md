# Editor Guide — Managing Content with Sveltia CMS

This guide is for content editors who manage the site through the browser-based CMS at `/admin`.

---

## Getting Started

1. **Open `/admin`** while logged into your GitHub account that has access to the repository.
2. **Authorize with GitHub** — Sveltia needs write access to the repository to save your changes.
3. Once authorized, you'll see the CMS dashboard with all content collections.

> **Note:** Access to `/admin` is protected by authentication and role-based permissions. If you cannot access the CMS, contact your technical admin.

---

## Content Collections

The CMS organizes content into collections. Each collection corresponds to a section of the website.

| Collection | What It Manages | Locale |
|---|---|---|
| Pages (Indonesia) | Public pages in Indonesian | `id` |
| Pages (English) | Public pages in English | `en` |
| Services (Indonesia) | Service offerings in Indonesian | `id` |
| Services (English) | Service offerings in English | `en` |
| Blog (Indonesia) | Blog posts in Indonesian | `id` |
| Blog (English) | Blog posts in English | `en` |
| Documentation | Technical documentation (metadata only) | — |
| Settings | Global site settings | — |
| Navigation | Header and footer menus | — |

### Working with Locales

The site supports **Indonesian** (default) and **English**.

- Each locale has separate content entries.
- To create a page in both languages:
  1. Create the Indonesian version first (Pages → Indonesia).
  2. Note the **Translation Key** value.
  3. Switch to Pages → English and create the English version.
  4. Use the **same Translation Key** value to link them.

### Key Fields

- **Slug**: The URL path segment (e.g., `about` for `/about`). Keep it lowercase, use hyphens for spaces.
- **Translation Key**: Links content across locales. Indonesian and English versions of the same page should share the same key.
- **Publish State**: Controls visibility (`Published` = visible, `Draft` = hidden from listings, `Archived` = retired). Note that full publish control is managed at build time.
- **Draft** (blog only): When checked, the post will not appear in production builds.

---

## Managing Pages

Pages include: About, Contact, Pricing, Privacy Policy, Terms & Conditions.

**Page sections** — Pages can contain content sections that are rendered as visual blocks:

- **Hero**: Large title + content block at the top of the page.
- **CTA**: Call-to-action section with title and content.
- **Features**: Grid of feature items (each with title, description, optional icon).
- **FAQ**: Frequently asked questions section.
- **Trust**: Trust signals or badges section.

To add sections:
1. In the page editor, find the **Sections** field.
2. Click **Add** to add a new section.
3. Choose the section **Type**.
4. Fill in the fields for that section type.

### Legal Pages

Privacy Policy and Terms & Conditions are marked as "Legal Page" in the CMS. This controls their display behavior (e.g., they may appear in the footer but not main navigation).

---

## Managing Services

Services include offerings like Web Development, Cloud Deployment, etc.

Each service has:
- **Title** and **Description**
- **Slug**: URL path segment
- **Features**: A list of bullet points describing the service
- **Price Range**: Optional pricing information (displayed on the services page)
- **Order**: Controls display order (lower numbers appear first)

---

## Managing Blog Posts

Blog posts support:
- **Title** and **Description**
- **Publish Date**: Controls the post date
- **Draft**: Toggle to exclude from production (posts are hidden when draft is checked)
- **Tags**: Organize posts by topic
- **Author**: Display name for the post author

### Image Support

Images in blog posts should use the markdown image syntax:
```markdown
![Alt text](/path/to/image.jpg)
```

When the media pipeline (task 007) is complete, images will be uploadable through the CMS media library and stored in R2.

---

## Settings

The **Settings** section configures global site behavior:

- **Site Name** and **Description**: Used in meta tags and page titles.
- **Site URL**: The production URL (used for canonical links).
- **Analytics Provider**: Choose between Google Tag Manager, Umami, or none.
- **Map Coordinates**: Default center point for the contact page map.
- **Organization Info**: Name and email for structured data.

### Navigation

The **Navigation** settings control:
- **Header Items**: Links shown in the top navigation bar.
- **Footer Items**: Links shown in the page footer.

Each navigation item has:
- **Label**: The visible text.
- **URL**: The link destination (use locale-prefixed paths, e.g., `/en/services`).
- **Locale**: Which language this item appears for (`id`, `en`, or `both`).

---

## Media Uploads

Media files (images, documents) are stored in Cloudflare R2, not in the Git repository. This keeps the repository lightweight.

### Uploading

1. Open the CMS media library from the sidebar.
2. **Upload** — Click the upload button and select files.
3. **Supported types:** JPEG, PNG, WebP, GIF, SVG.
4. **Max file size:** 10 MB per file.
5. **Path convention:** Files are stored under `uploads/{year}/{month}/{slug}/` automatically.

### Using Images in Content

- **Page hero images:** Use the `hero` image field in the page settings. Optimized to 1920×800.
- **OG images (social sharing):** The system uses a 1200×630 preset for Open Graph images.
- **Blog featured images:** Add via the `image` field. Displayed as 600×400 cards.
- **Thumbnails:** Auto-generated at 150×150.

### Image Transformation Presets

All public images are served through approved transformation presets. This ensures consistent sizing and fast loading:

| Preset | Size | Usage |
|---|---|---|
| `hero` | 1920×800 | Full-width hero banners |
| `og` | 1200×630 | Social media sharing cards |
| `card` | 600×400 | Blog and service listing cards |
| `thumb` | 150×150 | Thumbnails and avatars |
| `full` | Original | Full-resolution download (rare) |

> **Note:** Custom width/height parameters are not supported for security and performance reasons. If you need a different size, contact the development team to add a new preset.

### Replacing Media

To replace an existing image:
1. **Delete** the old image from the media library.
2. **Upload** the new image with the same filename.
3. **Update** any content references if the filename changed.

### Deleting Media

- Media deletion removes the file from R2 storage.
- Ensure no published content references the file before deleting.
- Deleted files cannot be recovered from the CMS — contact a technical admin if accidental deletion occurs.

---

## Draft and Preview Workflow

1. **Save a draft** — Changes are saved to the repository but may not appear on the live site.
2. **Preview** — If preview deployment is configured, you can review changes in a protected preview environment before publishing.
3. **Publish** — Once approved, content changes are merged to the production branch and deployed automatically.

> **See also:** The preview/publish workflow (task 009) adds branch-based draft isolation and protected preview access.

---

## Best Practices

- **Always add a Translation Key** when creating content in both languages.
- **Use descriptive Slugs** that match the page title (e.g., `our-services` for "Our Services").
- **Preview before publishing** — Check how your content looks on both desktop and mobile.
- **Keep descriptions concise** — They are used in meta tags, search results, and social sharing.
- **Use consistent image sizes** — For featured/hero images, use 1200×630px for optimal social sharing.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Can't see `/admin` | The admin page redirects if not authenticated. Make sure you have a valid session. |
| Can't save changes | Check your GitHub OAuth authorization. You need write access to the repository. |
| Content not appearing on site | The production build runs after changes merge to `main`. Wait for the deployment to complete. |
| Translation Key error | Make sure the key is the same in both locale versions. Keys are case-sensitive. |
| Image not uploading | Check file size and type limits. If the media pipeline is not yet deployed, images fall back to Git storage. |

---

## Further Reading

- [Sveltia CMS Documentation](https://github.com/sveltia/sveltia-cms)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Technical Documentation](./TECHNICAL.md) (for operators and developers)
