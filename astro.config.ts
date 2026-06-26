import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://example.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "id"],
    prefixDefaultLocale: true,
  },
  integrations: [
    starlight({
      title: "Documentation",
      editLink: {
        baseUrl: "https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter/edit/main",
      },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/milzamsz/web-astro-sveltia-cloudflare-starter" },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Overview", slug: "getting-started/overview" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
            { label: "Project Structure", slug: "getting-started/project-structure" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Content Management", slug: "guides/content-management" },
            { label: "Internationalization", slug: "guides/internationalization" },
            { label: "Customization", slug: "guides/customization" },
          ],
        },
        {
          label: "Deployment",
          items: [
            { label: "Cloudflare Pages", slug: "deployment/cloudflare-pages" },
            { label: "Environment Variables", slug: "deployment/environment-variables" },
          ],
        },
      ],
    }),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          id: "id-ID",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "directory",
  },
});