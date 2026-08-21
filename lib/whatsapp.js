import { opportunities } from "@/data/opportunities";
import { regions } from "@/data/regions";

const GENERIC_ES = "Hola, me interesa recibir información sobre las oportunidades de Ginkgo.";
const GENERIC_EN = "Hi, I'm interested in learning more about Ginkgo's opportunities.";

export const GENERIC_MESSAGE = { es: GENERIC_ES, en: GENERIC_EN };

const OPPORTUNITY_PATH_RE = /^\/(?:es\/oportunidades|en\/opportunities)\/([^/]+)\/?$/;
const REGION_PATH_RE = /^\/(?:es\/regiones|en\/regions)\/([^/]+)\/?$/;

// Builds the "Hola, me interesa recibir información sobre {X}." message the
// plan calls for, using whatever opportunity/region the visitor is looking
// at — falls back to a generic message everywhere else.
export function getContextualWhatsappMessage(pathname) {
  const isSpanish = pathname.startsWith("/es");

  const oppMatch = pathname.match(OPPORTUNITY_PATH_RE);
  if (oppMatch) {
    const opportunity = opportunities.find((op) => op.slug === oppMatch[1]);
    if (opportunity) {
      const name = isSpanish ? opportunity.name_es : opportunity.name_en;
      return isSpanish
        ? `Hola, me interesa recibir información sobre ${name}.`
        : `Hi, I'd like more information about ${name}.`;
    }
  }

  const regionMatch = pathname.match(REGION_PATH_RE);
  if (regionMatch) {
    const region = regions.find((r) => r.slug === regionMatch[1]);
    if (region) {
      const name = isSpanish ? region.name_es : region.name_en;
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
