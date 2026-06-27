import { describe, it, expect } from "vitest";
import { t, translations } from "../../i18n/ui";

describe("t()", () => {
  it("returns the English string for a known key", () => {
    expect(t("en", "nav.home")).toBe("Home");
  });

  it("returns the Indonesian string for a known key", () => {
    expect(t("id", "nav.home")).toBe("Beranda");
  });

  it("returns the key as fallback when missing", () => {
    expect(t("en", "nonexistent.key")).toBe("nonexistent.key");
  });

  it("returns blog.readMore in Indonesian", () => {
    expect(t("id", "blog.readMore")).toBe("Baca selengkapnya");
  });

  it("exposes both locale dictionaries", () => {
    expect(translations.en).toBeDefined();
    expect(translations.id).toBeDefined();
    expect(Object.keys(translations.en).length).toBeGreaterThan(0);
  });

  it("keeps EN and ID key sets in parity", () => {
    const enKeys = Object.keys(translations.en).sort();
    const idKeys = Object.keys(translations.id).sort();
    expect(idKeys).toEqual(enKeys);
  });
});
