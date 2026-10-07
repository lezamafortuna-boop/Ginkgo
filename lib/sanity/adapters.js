// Maps a Sanity `opportunity` document (nested {es,en} locale objects,
// dereferenced asset URLs) onto the flat `_es`/`_en` shape the existing
// public JSX (originally written against data/opportunities.js) already
// expects — lets the CRM's data replace the static file without rewriting
// every page that reads an opportunity.
export function toLegacyOpportunity(doc) {
  if (!doc) return null;

  const pick = (obj, key) => obj?.[key] ?? "";
  const pickArray = (arr, key) => (arr || []).map((item) => item?.[key] ?? "");

  return {
    id: doc._id,
    slug: doc.slug,
    region: doc.region?.slug,
    regionName_es: pick(doc.region?.name, "es"),
    regionName_en: pick(doc.region?.name, "en"),
    featured: Boolean(doc.featured),
    status: doc.status,

    name_es: pick(doc.name, "es"),
    name_en: pick(doc.name, "en"),

    heroImage: doc.image?.url || "",
    image: doc.image?.url || "",
    gallery: (doc.gallery || []).map((img) => img.url).filter(Boolean),

    city_es: pick(doc.city, "es"),
    city_en: pick(doc.city, "en"),

    surface: doc.surface || "",

    vocation_es: pick(doc.vocation, "es"),
    vocation_en: pick(doc.vocation, "en"),

    briefDescription_es: pick(doc.briefDescription, "es"),
    briefDescription_en: pick(doc.briefDescription, "en"),

    availability_es: pick(doc.availability, "es"),
    availability_en: pick(doc.availability, "en"),

    advantages_es: pickArray(doc.advantages, "es"),
    advantages_en: pickArray(doc.advantages, "en"),

    reasons_es: pickArray(doc.reasons, "es"),
    reasons_en: pickArray(doc.reasons, "en"),

    developmentPotential_es: pick(doc.developmentPotential, "es"),
    developmentPotential_en: pick(doc.developmentPotential, "en"),

    techSheet: doc.techSheet?.url || "",

    mapImage: doc.mapImage?.url || "",

    distances_es: pickArray(doc.distances, "es"),
    distances_en: pickArray(doc.distances, "en"),

    coordinates: doc.coordinates || null,
    locationPrecision: doc.locationPrecision || "approximate",
    documents: doc.documents || [],
    customFields: doc.customFields || [],
  };
}

// Maps a Sanity `opportunity` document onto the flat field names
// PropertyForm's inputs use (see components/admin/PropertyForm.jsx).
export function toPropertyFormValues(doc) {
  if (!doc) return null;

  const pick = (obj, key) => obj?.[key] ?? "";

  return {
    name_es: pick(doc.name, "es"),
    name_en: pick(doc.name, "en"),
    slug: doc.slug || "",
    regionId: doc.region?._id || "",
    status: doc.status || "disponible",
    surface: doc.surface || "",
    city_es: pick(doc.city, "es"),
    city_en: pick(doc.city, "en"),
    vocation_es: pick(doc.vocation, "es"),
    vocation_en: pick(doc.vocation, "en"),
    availability_es: pick(doc.availability, "es"),
    availability_en: pick(doc.availability, "en"),
    featured: Boolean(doc.featured),
    order: doc.order ?? 0,
    lat: doc.coordinates?.lat ?? "",
    lng: doc.coordinates?.lng ?? "",
    locationPrecision: doc.locationPrecision || "approximate",
    image: doc.image?.url || "",
    gallery: (doc.gallery || []).map((img) => img.url).filter(Boolean),
    briefDescription_es: pick(doc.briefDescription, "es"),
    briefDescription_en: pick(doc.briefDescription, "en"),
    developmentPotential_es: pick(doc.developmentPotential, "es"),
    developmentPotential_en: pick(doc.developmentPotential, "en"),
    customFields: doc.customFields || [],
  };
}

// Maps a Sanity `region` document onto the flat `_es`/`_en` shape the
// existing public JSX (StrategicRegionsES/EN, region detail pages) expects.
export function toLegacyRegion(doc) {
  if (!doc) return null;

  const pick = (obj, key) => obj?.[key] ?? "";
  const pickArray = (arr, key) => (arr || []).map((item) => item?.[key] ?? "");

  return {
    id: doc._id,
    slug: doc.slug,
    name_es: pick(doc.name, "es"),
    name_en: pick(doc.name, "en"),
    description_es: pick(doc.description, "es"),
    description_en: pick(doc.description, "en"),
    advantages_es: pickArray(doc.advantages, "es"),
    advantages_en: pickArray(doc.advantages, "en"),
    heroImage: doc.heroImage?.url || "",
    mapImage: doc.mapImage?.url || "",
    order: doc.order ?? 0,
  };
}

// Maps a Sanity `region` document onto RegionForm's flat field names.
export function toRegionFormValues(doc) {
  if (!doc) return null;

  const pick = (obj, key) => obj?.[key] ?? "";

  return {
    name_es: pick(doc.name, "es"),
    name_en: pick(doc.name, "en"),
    slug: doc.slug || "",
    description_es: pick(doc.description, "es"),
    description_en: pick(doc.description, "en"),
    order: doc.order ?? 0,
    heroImage: doc.heroImage?.url || "",
    mapImage: doc.mapImage?.url || "",
    advantages: (doc.advantages || []).map((a) => ({ es: a.es || "", en: a.en || "" })),
  };
}
