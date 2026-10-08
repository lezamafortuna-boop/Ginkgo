import { sanityClient } from "@/lib/sanity/client";
import { GENERIC_MESSAGE } from "@/lib/whatsapp";

const GENERIC_ES = GENERIC_MESSAGE.es;
const GENERIC_EN = GENERIC_MESSAGE.en;

const OPPORTUNITY_PATH_RE = /^\/(?:es\/oportunidades|en\/opportunities)\/([^/]+)\/?$/;
const REGION_PATH_RE = /^\/(?:es\/regiones|en\/regions)\/([^/]+)\/?$/;

// Builds the "Hola, me interesa recibir información sobre {X}." message the
// plan calls for, using whatever opportunity/region the visitor is looking
// at — falls back to a generic message everywhere else. Async because the
// name now comes from Sanity (the read client is safe to call from the
// browser — it's the public, tokenless CDN client) instead of the old
// static data files, so new properties/regions get contextual messages too.
export async function resolveWhatsappMessage(pathname) {
  const isSpanish = pathname.startsWith("/es");

  const oppMatch = pathname.match(OPPORTUNITY_PATH_RE);
  if (oppMatch) {
    const opportunity = await sanityClient
      .fetch(`*[_type == "opportunity" && slug.current == $slug][0]{ name }`, { slug: oppMatch[1] })
      .catch(() => null);
    if (opportunity) {
      const name = isSpanish ? opportunity.name.es : opportunity.name.en;
      return isSpanish
        ? `Hola, me interesa recibir información sobre ${name}.`
        : `Hi, I'd like more information about ${name}.`;
    }
  }

  const regionMatch = pathname.match(REGION_PATH_RE);
  if (regionMatch) {
    const region = await sanityClient
      .fetch(`*[_type == "region" && slug.current == $slug][0]{ name }`, { slug: regionMatch[1] })
      .catch(() => null);
    if (region) {
      const name = isSpanish ? region.name.es : region.name.en;
      return isSpanish
        ? `Hola, me interesa recibir información sobre ${name}.`
        : `Hi, I'd like more information about ${name}.`;
    }
  }

  return isSpanish ? GENERIC_ES : GENERIC_EN;
}

