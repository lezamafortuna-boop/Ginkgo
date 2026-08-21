// Regions Ginkgo operates in, per the Phase 1 brief. Approximate coverage —
// exact property locations stay private per opportunity (see data/opportunities.js).
export const regions = [
  {
    slug: "queretaro",
    name_es: "Querétaro",
    name_en: "Querétaro",
    heroImage: "/regions/queretaro/hero.jpg",
    description_es:
      "Capital del estado y uno de los polos de desarrollo más consolidados del Bajío, con crecimiento industrial y aeroespacial sostenido, infraestructura urbana madura y fuerte demanda habitacional y comercial.",
    description_en:
      "The state capital and one of the most consolidated development hubs in the Bajío, with sustained industrial and aerospace growth, mature urban infrastructure, and strong residential and commercial demand.",
    advantages_es: [
      "Corredor industrial y aeroespacial consolidado",
      "Infraestructura urbana y vial madura",
      "Alta demanda habitacional y comercial",
      "Conectividad directa a la carretera 57"
    ],
    advantages_en: [
      "Consolidated industrial and aerospace corridor",
      "Mature urban and road infrastructure",
      "High residential and commercial demand",
      "Direct connectivity to Highway 57"
    ],
    mapImage: "/regions/queretaro/map.jpg"
  },

  {
    slug: "corregidora",
    name_es: "Corregidora",
    name_en: "Corregidora",
    heroImage: "/regions/corregidora/hero.jpg",
    description_es:
      "Municipio al sur de la capital con una de las expansiones residenciales y comerciales más dinámicas de la zona metropolitana, impulsada por vialidades nuevas y un poder adquisitivo en crecimiento.",
    description_en:
      "A municipality south of the state capital with one of the most dynamic residential and commercial expansions in the metro area, driven by new roadways and rising purchasing power.",
    advantages_es: [
      "Expansión residencial y comercial acelerada",
      "Poder adquisitivo en crecimiento",
      "Nueva infraestructura vial",
      "Cercanía a la zona metropolitana de Querétaro"
    ],
    advantages_en: [
      "Accelerated residential and commercial expansion",
      "Growing purchasing power",
      "New road infrastructure",
      "Proximity to the Querétaro metro area"
    ],
    mapImage: "/regions/corregidora/map.jpg"
  },

  {
    slug: "el-marques",
    name_es: "El Marqués",
    name_en: "El Marqués",
    heroImage: "/regions/el-marques/hero.jpg",
    description_es:
      "Uno de los corredores industriales y logísticos más importantes del país, con parques industriales consolidados, uso de suelo industrial ya aprobado y alta demanda de naves y desarrollos logísticos.",
    description_en:
      "One of the country's most important industrial and logistics corridors, with consolidated industrial parks, already-approved industrial land use, and high demand for industrial and logistics developments.",
    advantages_es: [
      "Parques industriales consolidados",
      "Uso de suelo industrial ya aprobado",
      "Corredor logístico estratégico",
      "Alta demanda de naves industriales"
    ],
    advantages_en: [
      "Consolidated industrial parks",
      "Industrial land use already approved",
      "Strategic logistics corridor",
      "High demand for industrial buildings"
    ],
    mapImage: "/regions/el-marques/map.jpg"
  },

  {
    slug: "santa-rosa-jauregui",
    name_es: "Santa Rosa Jáuregui",
    name_en: "Santa Rosa Jáuregui",
    heroImage: "/regions/santa-rosa-jauregui/hero.jpg",
    description_es:
      "Delegación al norte de la capital que concentra hoy la mayor expansión urbana de la ciudad, con terrenos de mayor escala disponibles y un horizonte claro de plusvalía conforme avanza el crecimiento.",
    description_en:
      "A delegation north of the state capital that today concentrates the city's strongest urban expansion, with larger-scale land available and a clear appreciation horizon as growth advances.",
    advantages_es: [
      "Mayor expansión urbana de la ciudad",
      "Terrenos de mayor escala disponibles",
      "Vocación mixta habitacional y comercial",
      "Plusvalía proyectada a mediano plazo"
    ],
    advantages_en: [
      "Strongest urban expansion in the city",
      "Larger-scale land available",
      "Mixed residential and commercial vocation",
      "Projected mid-term appreciation"
    ],
    mapImage: "/regions/santa-rosa-jauregui/map.jpg"
  },

  {
    slug: "pedro-escobedo",
    name_es: "Pedro Escobedo",
    name_en: "Pedro Escobedo",
    heroImage: "/regions/pedro-escobedo/hero.jpg",
    description_es:
      "Municipio al oriente del estado, con vocación agroindustrial consolidada y una demanda creciente de desarrollos logísticos y habitacionales gracias a su cercanía con los principales corredores carreteros.",
    description_en:
      "A municipality east of the state, with a consolidated agro-industrial vocation and growing demand for logistics and residential developments thanks to its proximity to the main highway corridors.",
    advantages_es: [
      "Vocación agroindustrial consolidada",
      "Demanda creciente de desarrollos logísticos",
      "Cercanía a corredores carreteros principales",
      "Costo de suelo competitivo"
    ],
    advantages_en: [
      "Consolidated agro-industrial vocation",
      "Growing demand for logistics developments",
      "Proximity to main highway corridors",
      "Competitive land cost"
    ],
    mapImage: "/regions/pedro-escobedo/map.jpg"
  },

  {
    slug: "cadereyta",
    name_es: "Cadereyta de Montes",
    name_en: "Cadereyta de Montes",
    heroImage: "/regions/cadereyta/hero.jpg",
    description_es:
      "Puerta de entrada a la Sierra Gorda queretana, con un perfil más rural y turístico. Representa oportunidades de banco de tierra y desarrollo a más largo plazo conforme la región gana infraestructura y visibilidad.",
    description_en:
      "The gateway to Querétaro's Sierra Gorda, with a more rural and tourism-oriented profile. It represents land-banking and longer-term development opportunities as the region gains infrastructure and visibility.",
    advantages_es: [
      "Puerta de entrada a la Sierra Gorda",
      "Potencial turístico y ecoturístico",
      "Oportunidades de banco de tierra",
      "Costo de suelo de entrada accesible"
    ],
    advantages_en: [
      "Gateway to the Sierra Gorda",
      "Tourism and ecotourism potential",
      "Land-banking opportunities",
      "Accessible entry land cost"
    ],
    mapImage: "/regions/cadereyta/map.jpg"
  },

  {
    slug: "puerto-vallarta",
    name_es: "Puerto Vallarta",
    name_en: "Puerto Vallarta",
    heroImage: "/regions/puerto-vallarta/hero.jpg",
    description_es:
      "Uno de los destinos turísticos más consolidados del Pacífico mexicano, con fuerte demanda de desarrollo hotelero, residencial vacacional y usos mixtos ligados al turismo internacional.",
    description_en:
      "One of the most established tourist destinations on the Mexican Pacific coast, with strong demand for hotel development, vacation residential projects, and mixed uses tied to international tourism.",
    advantages_es: [
      "Destino turístico internacional consolidado",
      "Alta demanda hotelera y vacacional",
      "Plusvalía sostenida en el mercado turístico",
      "Conectividad aérea internacional"
    ],
    advantages_en: [
      "Established international tourist destination",
      "High hotel and vacation-rental demand",
      "Sustained appreciation in the tourism market",
      "International air connectivity"
    ],
    mapImage: "/regions/puerto-vallarta/map.jpg"
  }
];
