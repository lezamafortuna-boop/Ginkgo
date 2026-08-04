import { regions } from "@/data/regions";
import { insights } from "@/data/insights";
import { opportunities } from "@/data/opportunities";

const BASE_URL = "https://ginkgomx.com";

const staticRoutes = [
  ["/es", "/en"],
  ["/es/oportunidades", "/en/opportunities"],
  ["/es/servicios", "/en/services"],
  ["/es/nosotros", "/en/about"],
  ["/es/contacto", "/en/contact"],
  ["/es/insights", "/en/insights"],
  ["/es/regiones", "/en/regions"],
  ["/es/privacidad", "/en/privacy"],
  ["/es/cookies", "/en/cookies"],
];

export default function sitemap() {
  const entries = [];

  for (const [es, en] of staticRoutes) {
    entries.push({
      url: `${BASE_URL}${es}`,
      alternates: { languages: { "es-MX": `${BASE_URL}${es}`, "en-US": `${BASE_URL}${en}` } },
    });
    entries.push({
      url: `${BASE_URL}${en}`,
      alternates: { languages: { "es-MX": `${BASE_URL}${es}`, "en-US": `${BASE_URL}${en}` } },
    });
  }

  for (const region of regions) {
    entries.push({ url: `${BASE_URL}/es/regiones/${region.slug}` });
    entries.push({ url: `${BASE_URL}/en/regions/${region.slug}` });
  }

  for (const opportunity of opportunities) {
    entries.push({ url: `${BASE_URL}/es/oportunidades/${opportunity.slug}` });
    entries.push({ url: `${BASE_URL}/en/opportunities/${opportunity.slug}` });
  }

  for (const insight of insights) {
    entries.push({ url: `${BASE_URL}/es/insights/${insight.slug}` });
    entries.push({ url: `${BASE_URL}/en/insights/${insight.slug}` });
  }

  return entries;
}
