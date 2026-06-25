/**
 * llms.txt generator — builds public/llms.txt from content entries.
 * Run after build. Only includes published (non-draft) content.
 *
 * Usage: node scripts/generate-llms-txt.cjs
 * Output: dist/llms.txt (overwrites public/llms.txt placeholder)
 */

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "src", "content");
const OUTPUT_FILE = path.join(__dirname, "..", "dist", "llms.txt");
const SITE_URL = "https://web-astro-sveltia-cloudflare-starter.pages.dev";

const LOCALE_LABELS = {
  id: "Indonesia",
  en: "English",
};

function walkDir(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        files.push(...walkDir(fullPath));
      } else if (entry.name.endsWith(".md") && !entry.name.startsWith("_")) {
        files.push(fullPath);
      }
    }
  } catch {
    // Directory might not exist
  }
  return files;
}

function parseFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+([\s\S]*)$/);
    if (!match) return null;

    const frontmatter = {};
    let currentKey = null;
    let currentIndent = 0;
    const lines = match[1].split("\n");

    for (const line of lines) {
      // Skip empty lines and array items
      if (!line.trim() || line.trim().startsWith("- ")) continue;

      const keyMatch = line.match(/^(\s*)([\w-]+):\s*(.*)$/);
      if (keyMatch) {
        const indent = keyMatch[1].length;
        const key = keyMatch[2].trim();
        const value = keyMatch[3].trim();

        if (indent === 0) {
          currentKey = key;
          currentIndent = 0;
          if (value) {
            frontmatter[currentKey] = value.replace(/^["']|["']$/g, "");
          } else {
            frontmatter[currentKey] = "";
          }
        }
      }
    }

    return {
      frontmatter,
      body: match[2].trim().substring(0, 200),
      path: filePath,
    };
  } catch {
    return null;
  }
}

function main() {
  console.log("Generating llms.txt...");

  const files = walkDir(CONTENT_DIR);
  const pages = [];
  const services = [];
  const blogPosts = [];

  for (const file of files) {
    const parsed = parseFrontmatter(file);
    if (!parsed) {
      console.log("  Skipping (no frontmatter):", path.basename(file));
      continue;
    }

    const fm = parsed.frontmatter;
    const locale = fm.locale || "id";
    const slug = fm.slug || path.basename(file, ".md").replace(/_en$/, "");

    // Log for debugging
    console.log(`  File: ${path.basename(file)} locale=${locale} slug=${slug} draft=${fm.draft || "false"} title=${(fm.title || "").substring(0, 30)}`);

    // Skip draft content
    if (fm.draft === "true" || fm.draft === true) continue;
    if (fm.publishState === "draft") continue;

    const relative = path.relative(CONTENT_DIR, file);
    const isBlog = relative.startsWith("blog");

    const localePrefix = locale !== "en" ? `/${locale}` : "";
    let url;
    if (isBlog) {
      url = `${SITE_URL}${localePrefix}/blog/${slug}`;
    } else if (relative.startsWith("services")) {
      url = `${SITE_URL}${localePrefix}/services/${slug}`;
    } else {
      url = `${SITE_URL}${localePrefix}/${slug}`;
    }

    const entry = {
      title: fm.title || "Untitled",
      description: fm.description || "",
      url,
      locale: LOCALE_LABELS[locale] || locale,
    };

    if (isBlog) blogPosts.push(entry);
    else if (relative.startsWith("services")) services.push(entry);
    else pages.push(entry);
  }

  // Build llms.txt content
  const lines = [];
  lines.push("# Astro Sveltia Cloudflare");
  lines.push("");
  lines.push("> Multilingual marketing website boilerplate.");
  lines.push("");

  if (pages.length) {
    lines.push("## Pages");
    for (const p of pages) {
      lines.push(`- [${p.title} (${p.locale})](${p.url}): ${p.description}`);
    }
    lines.push("");
  }

  if (services.length) {
    lines.push("## Services");
    for (const s of services) {
      lines.push(`- [${s.title} (${s.locale})](${s.url}): ${s.description}`);
    }
    lines.push("");
  }

  if (blogPosts.length) {
    lines.push("## Blog Posts");
    for (const b of blogPosts) {
      lines.push(`- [${b.title} (${b.locale})](${b.url}): ${b.description}`);
    }
    lines.push("");
  }

  lines.push("---");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Content entries scanned: ${files.length}`);
  lines.push("");

  const output = lines.join("\n");
  fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
  console.log(`llms.txt generated: ${output.length} bytes`);
  console.log(`Output: ${OUTPUT_FILE}`);
  console.log(`  Pages: ${pages.length}`);
  console.log(`  Services: ${services.length}`);
  console.log(`  Blog posts: ${blogPosts.length}`);
}

main();
