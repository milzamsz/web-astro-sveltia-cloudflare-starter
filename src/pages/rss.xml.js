import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");
  const publishedPosts = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime());

  return rss({
    title: "Astro Sveltia Cloudflare Blog",
    description: "Articles about web development, multilingual sites, and the modern stack.",
    site: new URL(context.site).origin,
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.id}`,
      pubDate: post.data.publishDate,
      categories: post.data.tags,
    })),
    customData: `<language>en</language>`,
  });
}