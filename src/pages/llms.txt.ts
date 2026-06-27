import type { APIRoute } from "astro";
import { siteConfig } from "../config/site.config";

export const prerender = true;

interface LlmLink {
  label: string;
  path: string;
  description: string;
}

const corePages: LlmLink[] = [
  { label: "Home", path: "/", description: "Production-ready marketing homepage." },
  { label: "About", path: "/about", description: "Project background and overview." },
  { label: "Services", path: "/services", description: "Service offerings." },
  { label: "Pricing", path: "/pricing", description: "Plans and pricing tiers." },
  { label: "Contact", path: "/contact", description: "Contact form and details." },
  { label: "Blog", path: "/blog", description: "Articles and updates." },
  { label: "Documentation", path: "/docs", description: "Setup and usage guides." },
];

const stack: LlmLink[] = [
  { label: "Astro", path: "https://astro.build", description: "Static site generator for fast content sites." },
  { label: "Sveltia CMS", path: "https://github.com/sveltia/sveltia-cms", description: "Git-based content editing in the browser." },
  { label: "Cloudflare Pages", path: "https://pages.cloudflare.com", description: "Edge deployment with D1 and R2 storage." },
];

export const GET: APIRoute = () => {
  const base = siteConfig.url.replace(/\/$/, "");
  const toUrl = (path: string) =>
    path.startsWith("http") ? path : `${base}${path}`;
  const section = (links: LlmLink[]) =>
    links
      .map((l) => `- [${l.label}](${toUrl(l.path)}): ${l.description}`)
      .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}. Ships with light/dark theming, i18n (English and Indonesian), blog, documentation, and SEO defaults.

## Core Pages

${section(corePages)}

## Stack

${section(stack)}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
