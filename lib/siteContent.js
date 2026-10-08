import { cache } from "react";
import { sanityClient } from "@/lib/sanity/client";
import { SLOT_BY_KEY } from "@/lib/siteContentCatalog";

export const CONTENT_DOC_ID = "siteContent";

// key -> { es, en } with only the texts an admin has overridden.
export const getContentOverrides = cache(async () => {
  try {
    const doc = await sanityClient.fetch(`*[_type == "siteContent" && _id == $id][0]{ texts }`, { id: CONTENT_DOC_ID });
    const map = {};
    for (const entry of doc?.texts || []) {
      if (entry?.key) map[entry.key] = { es: entry.es || "", en: entry.en || "" };
    }
    return map;
  } catch (error) {
    console.error("getContentOverrides failed, using original texts:", error);
    return {};
  }
});

// Server-only. Usage: const t = await getSiteText(); t("home.hero.title", "es")
// Returns the admin's text if there is one, otherwise the original from the catalog.
export async function getSiteText() {
  const overrides = await getContentOverrides();
  return function t(key, locale) {
    const lang = locale === "en" ? "en" : "es";
    const slot = SLOT_BY_KEY[key];
    if (!slot) throw new Error(`Unknown site text key: ${key}`);
    return overrides[key]?.[lang]?.trim() || slot[lang];
  };
}
