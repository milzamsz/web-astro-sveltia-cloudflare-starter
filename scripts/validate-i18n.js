#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SRC_DIR = join(process.cwd(), "src");
const I18N_DIR = join(SRC_DIR, "i18n");
const EN_FILE = join(I18N_DIR, "en.json");
const ID_FILE = join(I18N_DIR, "id.json");

const errors = [];

if (!existsSync(EN_FILE)) {
  errors.push("Missing src/i18n/en.json — English translation file not found");
}
if (!existsSync(ID_FILE)) {
  errors.push("Missing src/i18n/id.json — Indonesian translation file not found");
}

let en = {};
let id = {};
try {
  en = JSON.parse(readFileSync(EN_FILE, "utf8"));
  id = JSON.parse(readFileSync(ID_FILE, "utf8"));
} catch (error) {
  errors.push(`Failed to load translation JSON: ${error.message}`);
}

const enKeys = Object.keys(en);
const idKeys = Object.keys(id);
for (const key of enKeys) {
  if (!(key in id)) {
    errors.push(`Missing Indonesian translation key: ${key}`);
  }
}
for (const key of idKeys) {
  if (!(key in en)) {
    errors.push(`Extra Indonesian translation key missing from English source: ${key}`);
  }
}

const helpersExist = existsSync(join(I18N_DIR, "routes.ts")) && existsSync(join(I18N_DIR, "switcher.ts")) && existsSync(join(I18N_DIR, "ui.ts"));
if (!helpersExist) {
  errors.push("Missing i18n helpers: src/i18n/routes.ts, src/i18n/switcher.ts, or src/i18n/ui.ts not found");
}

if (errors.length > 0) {
  console.error("❌ I18n validation failed:");
  for (const err of errors) {
    console.error(`   - ${err}`);
  }
  process.exit(1);
} else {
  console.log("✅ I18n validation passed — JSON translation files are in sync");
}
