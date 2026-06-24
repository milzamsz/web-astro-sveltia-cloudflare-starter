"use strict";

// validate-cms-config.cjs
// Run validation of Sveltia CMS config against repository content schemas.
// Ensures every CMS collection maps to a valid content collection and locale pairing.
// Usage: node scripts/validate-cms-config.cjs

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const errors = [];
const warnings = [];

function check(label, condition, detail) {
  if (!condition) errors.push(`${label}: ${detail}`);
}

function warn(label, detail) {
  warnings.push(`${label}: ${detail}`);
}

// 1. Validate config.yml exists
const configPath = path.join(ROOT, 'public/admin/config.yml');
check('config.yml', fs.existsSync(configPath), 'Missing public/admin/config.yml');

// 2. Validate settings.yml and navigation.yml exist
const settingsPath = path.join(ROOT, 'src/content/settings.yml');
const navPath = path.join(ROOT, 'src/content/navigation.yml');
check('settings.yml', fs.existsSync(settingsPath), 'Missing src/content/settings.yml');
check('navigation.yml', fs.existsSync(navPath), 'Missing src/content/navigation.yml');

// 3. Validate content folders exist and have files
const folders = [
  'src/content/pages',
  'src/content/services',
  'src/content/blog',
  'src/content/docs',
  'public/admin',
];
folders.forEach(f => {
  const fullPath = path.join(ROOT, f);
  check(`Folder ${f}`, fs.existsSync(fullPath), `Missing folder: ${f}`);
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath).filter(fn => !fn.startsWith('.'));
    if (files.length === 0) warn(`Folder ${f}`, 'Folder is empty');
  }
});

// 4. Validate config.yml has expected collection names
if (fs.existsSync(configPath)) {
  const configContent = fs.readFileSync(configPath, 'utf8');
  const collectionNames = [];
  const lines = configContent.split('\n');
  let inCollections = false;
  let collectionsIndent = -1;
  for (const line of lines) {
    if (line.trim().startsWith('collections:')) {
      inCollections = true;
      collectionsIndent = line.search(/\S/);
      continue;
    }
    if (inCollections) {
      const indent = line.search(/\S/);
      // Exit if we're back to root level
      if (line.trim() && indent <= collectionsIndent && !line.trim().startsWith('#') && !line.trim().startsWith('-')) {
        break;
      }
      // Only match top-level collections (indent == collectionsIndent + 2)
      if (line.trim().startsWith('- name:') && indent === collectionsIndent + 2) {
        const name = line.split(':')[1].trim();
        collectionNames.push(name);
      }
      if (line.trim().startsWith('#')) continue;
    }
  }

  const expected = [
    'pages-id', 'pages-en',
    'services-id', 'services-en',
    'blog-id', 'blog-en',
    'docs',
    'settings',
  ];

  expected.forEach(name => {
    check(`Collection ${name}`, collectionNames.includes(name),
      `Missing collection '${name}' in config.yml`);
  });

  // Warn about unexpected collections
  collectionNames.forEach(name => {
    if (!expected.includes(name)) {
      warn(`Collection ${name}`, `Unexpected collection '${name}' in config.yml`);
    }
  });

  // 5. Check for secrets in config
  const secretPatterns = [
    /(?:password|secret|token|api[_-]?key|credential)\s*:/i,
    /(?:ghp_|gho_|ghu_|ghs_|ghr_)/,
  ];
  lines.forEach((line, i) => {
    secretPatterns.forEach(pattern => {
      if (pattern.test(line)) {
        warn('SECRET-CHECK', `Line ${i + 1}: potential secret detected: ${line.trim().substring(0, 60)}`);
      }
    });
  });
}

// 6. Validate content schemas match collections
const contentConfigPath = path.join(ROOT, 'src/content.config.ts');
if (fs.existsSync(contentConfigPath)) {
  const contentContent = fs.readFileSync(contentConfigPath, 'utf8');
  // Check for key schema fields referenced in CMS config
  const hasLocale = contentContent.includes('locale: z.enum');
  const hasSlug = contentContent.includes('slug: z.string');
  const hasTranslationKey = contentContent.includes('translationKey: z.string');
  const hasDraft = contentContent.includes('draft: z.boolean');

  check('content schema: locale', hasLocale, 'Missing locale field definition in content.config.ts');
  check('content schema: slug', hasSlug, 'Missing slug field in content collections');
  check('content schema: translationKey', hasTranslationKey, 'Missing translationKey in content schemas');
}

// Report
console.log('');
console.log('CMS Config Validation Report');
console.log('============================');
console.log(`Errors: ${errors.length}  |  Warnings: ${warnings.length}`);
console.log('');

if (errors.length > 0) {
  console.log('ERRORS:');
  errors.forEach(e => console.log(`  ✗  ${e}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('WARNINGS:');
  warnings.forEach(w => console.log(`  ⚠  ${w}`));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('  ✅  All checks passed');
}

process.exit(errors.length > 0 ? 1 : 0);