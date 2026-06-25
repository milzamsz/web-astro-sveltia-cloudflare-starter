import fs from 'node:fs';
import { parse } from 'devalue';

try {
  const content = fs.readFileSync('c:/Workspace/templates/astro-sveltia-cloudflare/.astro/data-store.json', 'utf8');
  // devalue.parse is used for standard devalue serialization.
  // Let's see if we can parse it.
  const data = parse(content);
  console.log('Keys in data store:', Array.from(data.keys()));
  const pages = data.get('pages');
  console.log('Pages entries count:', pages.size);
  for (const [key, val] of pages.entries()) {
    console.log(`Page Key: ${key}`);
    console.log(`  locale: ${val.data.locale}`);
    console.log(`  slug: ${val.data.slug}`);
    console.log(`  filePath: ${val.filePath}`);
  }
} catch (err) {
  console.error(err);
}
