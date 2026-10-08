import { cache } from "react";
import { sanityClient } from "@/lib/sanity/client";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/contact";

export const SETTINGS_DOC_ID = "siteSettings";

// Values used when the admin hasn't saved Configuración yet (or a required
// field is blank), so the public site never ends up without a way to reach us.
export const CONTACT_DEFAULTS = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDisplay: WHATSAPP_DISPLAY,
  email: CONTACT_EMAIL,
  instagramUrl: INSTAGRAM_URL,
  linkedinUrl: LINKEDIN_URL,
  address: "",
};

// Turns the raw Sanity document into what the site uses. Required fields fall
// back to the defaults; the optional ones (Instagram, LinkedIn, address) are
// only defaulted when no settings document exists at all — once an admin has
// saved, leaving one empty means "don't show it".
export function resolveContactSettings(doc) {
  if (!doc) return { ...CONTACT_DEFAULTS };
  const clean = (v) => (typeof v === "string" ? v.trim() : "");
  return {
    whatsappNumber: clean(doc.whatsappNumber) || CONTACT_DEFAULTS.whatsappNumber,
    whatsappDisplay: clean(doc.phoneDisplay) || CONTACT_DEFAULTS.whatsappDisplay,
    email: clean(doc.email) || CONTACT_DEFAULTS.email,
    instagramUrl: clean(doc.instagramUrl),
    linkedinUrl: clean(doc.linkedinUrl),
    address: clean(doc.address),
  };
}

// Server-only. Deduplicated per request, so layout + page can both call it.
export const getContactSettings = cache(async () => {
  try {
    const doc = await sanityClient.fetch(`*[_type == "siteSettings" && _id == $id][0]`, { id: SETTINGS_DOC_ID });
    return resolveContactSettings(doc);
  } catch (error) {
    console.error("getContactSettings failed, using defaults:", error);
    return { ...CONTACT_DEFAULTS };
  }
});

// "https://www.instagram.com/ginkgomex?igsh=..." -> "@ginkgomex"
export function instagramHandle(url) {
  const match = (url || "").match(/instagram\.com\/([^/?#]+)/i);
  return match ? `@${match[1]}` : "Instagram";
}
