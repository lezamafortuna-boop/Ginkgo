import { sanityClient } from "@/lib/sanity/client";

const GENERIC_ES = "Hola, me interesa recibir información sobre las oportunidades de Ginkgo.";
const GENERIC_EN = "Hi, I'm interested in learning more about Ginkgo's opportunities.";

export const GENERIC_MESSAGE = { es: GENERIC_ES, en: GENERIC_EN };

const OPPORTUNITY_PATH_RE = /^\/(?:es\/oportunidades|en\/opportunities)\/([^/]+)\/?$/;
const REGION_PATH_RE = /^\/(?:es\/regiones|en\/regions)\/([^/]+)\/?$/;

// Builds the "Hola, me interesa recibir información sobre {X}." message the
// plan calls for, using whatever opportunity/region the visitor is looking
// at — falls back to a generic message everywhere else. Async because the
// name now comes from Sanity (the read client is safe to call from the
// browser — it's the public, tokenless CDN client) instead of the old
// static data files, so new properties/regions get contextual messages too.
export async function getContextualWhatsappMessage(pathname) {
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

export function buildWhatsappUrl(phoneDigits, message) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}
