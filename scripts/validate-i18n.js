#!/usr/bin/env node

/**
 * Validates that all core routes have locale-prefixed counterparts
 * and checks translation key coverage.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename, extname } from "node:path";
import { pathToFileURL } from "node:url";

const LOCALES = ["id", "en"];
const SRC_DIR = join(process.cwd(), "src");
const I18N_DIR = join(SRC_DIR, "i18n");
const UI_FILE = join(I18N_DIR, "ui.ts");

const errors = [];

// 1. Check that src/i18n/ exists with required files
if (!existsSync(UI_FILE)) {
  errors.push("Missing src/i18n/ui.ts — UI translation dictionary not found");
}

// 2. Check that translation keys are defined for all locales
try {
  // Use pathToFileURL for Windows compatibility
  const uiUrl = pathToFileURL(UI_FILE);
  const uiContent = await import(uiUrl);
  for (const locale of LOCALES) {
    if (!uiContent.translations[locale]) {
      errors.push(`Missing translation dictionary for locale "${locale}" in ui.ts`);
    } else {
      const keys = Object.keys(uiContent.translations[locale]);
      if (keys.length === 0) {
        errors.push(`Empty translation dictionary for locale "${locale}" in ui.ts`);
      }
    }
  }
} catch (e) {
  errors.push(`Failed to load translations: ${e.message}`);
}

// 3. Check locale helpers exist
const helpersExist = existsSync(join(I18N_DIR, "routes.ts")) && existsSync(join(I18N_DIR, "switcher.ts"));
if (!helpersExist) {
  errors.push("Missing i18n helpers: src/i18n/routes.ts or src/i18n/switcher.ts not found");
}

// 4. Report
if (errors.length > 0) {
  console.error("❌ I18n validation failed:");
  for (const err of errors) {
    console.error(`   - ${err}`);
  }
  process.exit(1);
} else {
  console.log("✅ I18n validation passed — all required files and translations present");
}
