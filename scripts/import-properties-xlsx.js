// One-time import of the client's property list (data/Propiedades111226.xlsx,
// 2026-11-12) into Sanity so the public and admin maps show real pins.
//
// ONLY PUBLIC FIELDS are imported: name, type/vocation, city, surface, region and
// coordinates. The spreadsheet's internal columns (owner/legal rep, exclusivity,
// alliance, price, price per m², commission, contract end, notes) are deliberately
// left out — Sanity feeds the public site.
//
// Coordinates were converted from the sheet (DMS like 20°43'53.6"N 100°26'26.9"W
// and decimal "N/O" forms) to signed decimal degrees. All pins are imported as
// locationPrecision "approximate", so the public map blurs them (lib/maps.js).
//
// SAFE TO RE-RUN:
//   - New properties use deterministic _ids (opportunity-<clave>) and
//     createIfNotExists, so an entry already edited in /admin/propiedades is kept.
//   - Rows that match a property already in Sanity (El Salitre, Boca de Tomates,
//     Cadereyta de Montes) only get coordinates/surface filled in when those are
//     still empty; their texts are never touched.
//
// Usage:
//   node --env-file=.env.local scripts/import-properties-xlsx.js --dry   (preview only)
//   node --env-file=.env.local scripts/import-properties-xlsx.js         (write)
//   node --env-file=.env.local scripts/import-properties-xlsx.js --hide  (set the imported
//        new properties to "oculto" — removes them from the public site, keeps them in the CRM)
const { createClient } = require("@sanity/client");

const DRY = process.argv.includes("--dry");
const HIDE = process.argv.includes("--hide");

const REGION = {
  srj: "region-santa-rosa-jauregui",
  qro: "region-queretaro",
  corr: "region-corregidora",
  marq: "region-el-marques",
  cad: "region-cadereyta",
  pv: "region-puerto-vallarta",
};

const LAND = { es: "Macrolote", en: "Land parcel" };

// key = the spreadsheet's CLAVE. `existing` = an _id already in Sanity that this
// row describes (fill-in only). Rows without coordinates in the sheet have none.
const PROPERTIES = [
  { key: "GINT001", es: "Macrolote Santa Rosa Jáuregui · 3 ha", en: "Santa Rosa Jáuregui Land Parcel · 3 ha", city: ["Querétaro, Qro.", "Querétaro, Qro."], vocation: LAND, surface: "3 ha", region: REGION.srj, coords: [20.731556, -100.440806] },
  { key: "GINT002", es: "Macrolote Santa Rosa Jáuregui · 1.29 ha", en: "Santa Rosa Jáuregui Land Parcel · 1.29 ha", city: ["Querétaro, Qro.", "Querétaro, Qro."], vocation: LAND, surface: "1.29 ha", region: REGION.srj, coords: [20.731556, -100.440806] },
  { key: "GINT003", existing: "opportunity-el-salitre", surface: "9,691 m²", coords: [20.661917, -100.430611] },
  { key: "GINT004", es: "Macrolote Aeropuerto, Colón", en: "Airport Area Land Parcel, Colón", city: ["Colón, Qro.", "Colón, Qro."], vocation: LAND, surface: "724 ha", region: null, coords: null },
  { key: "GINT005", es: "Macrolote San Miguel Tlaxcaltepec", en: "San Miguel Tlaxcaltepec Land Parcel", city: ["Amealco, Qro.", "Amealco, Qro."], vocation: LAND, surface: "22.68 ha", region: null, coords: [20.10851, -100.13254] },
  { key: "GINL001", es: "Local comercial Mirador", en: "Mirador Commercial Unit", city: ["El Marqués, Qro.", "El Marqués, Qro."], vocation: { es: "Comercial", en: "Commercial" }, surface: "149 m²", region: REGION.marq, coords: [20.5904049, -100.3353013] },
  { key: "GINR001", es: "Rancho Colón", en: "Colón Ranch", city: ["Colón, Qro.", "Colón, Qro."], vocation: { es: "Rancho", en: "Ranch" }, surface: "10.37 ha", region: null, coords: null },
  { key: "GINT006", es: "Macrolote Alfafayucan", en: "Alfafayucan Land Parcel", city: ["El Marqués, Qro.", "El Marqués, Qro."], vocation: LAND, surface: "73 ha", region: REGION.marq, coords: null },
  { key: "GINT007", es: "Macrolote Jilotepec", en: "Jilotepec Land Parcel", city: ["Jilotepec, Edo. Méx.", "Jilotepec, State of Mexico"], vocation: LAND, surface: "80 ha", region: null, coords: null },
  { key: "GINT008", existing: "opportunity-boca-de-tomates", surface: "5 ha", coords: [20.669906, -105.272761] },
  { key: "GINT009", es: "Macrolote Boca de Tomates · 16 ha", en: "Boca de Tomates Land Parcel · 16 ha", city: ["Puerto Vallarta, Jal.", "Puerto Vallarta, Jal."], vocation: LAND, surface: "16 ha", region: REGION.pv, coords: null },
  { key: "GINT010", es: "Macrolote Carlota", en: "Carlota Land Parcel", city: ["Corregidora, Qro.", "Corregidora, Qro."], vocation: LAND, surface: "20.42 ha", region: REGION.corr, coords: [20.564667, -100.433583] },
  { key: "GINT011", es: "Macrolote El Marqués", en: "El Marqués Land Parcel", city: ["El Marqués, Qro.", "El Marqués, Qro."], vocation: LAND, surface: "12 ha", region: REGION.marq, coords: [20.609361, -100.28025] },
  { key: "GINT012", existing: "opportunity-cadereyta-de-montes", surface: "5.65 ha", coords: [20.712222, -99.814639] },
  { key: "GINT013", es: "Naves industriales Apaseo el Grande", en: "Apaseo el Grande Industrial Warehouses", city: ["Apaseo el Grande, Gto.", "Apaseo el Grande, Gto."], vocation: { es: "Industrial", en: "Industrial" }, surface: "450 m² c/u", region: null, coords: null },
  { key: "GINT014", es: "Complejo industrial Parque Industrial Benito Juárez", en: "Benito Juárez Industrial Park Complex", city: ["Querétaro, Qro.", "Querétaro, Qro."], vocation: { es: "Industrial", en: "Industrial" }, surface: "1.41 ha", region: REGION.qro, coords: null },
  { key: "GINT015", es: "Macrolote El Jacal", en: "El Jacal Land Parcel", city: ["Corregidora, Qro.", "Corregidora, Qro."], vocation: LAND, surface: "1.5 ha", region: REGION.corr, coords: [20.556907, -100.43804] },
  { key: "GINT016", es: "Terreno Huertas La Joya", en: "Huertas La Joya Lot", city: ["Querétaro, Qro.", "Querétaro, Qro."], vocation: { es: "Terreno", en: "Lot" }, surface: "2,400 m²", region: REGION.qro, coords: [20.61825, -100.495194] },
  { key: "GINT017", es: "Macrolote Santa Rosa Jáuregui · 1.21 ha", en: "Santa Rosa Jáuregui Land Parcel · 1.21 ha", city: ["Querétaro, Qro.", "Querétaro, Qro."], vocation: LAND, surface: "1.21 ha", region: REGION.srj, coords: [20.721639, -100.439028] },
  { key: "GINT018", es: "Macrolote Corregidora", en: "Corregidora Land Parcel", city: ["Corregidora, Qro.", "Corregidora, Qro."], vocation: LAND, surface: "3.86 ha", region: REGION.corr, coords: [20.555306, -100.456] },
];

const ACCENTS = { á: "a", é: "e", í: "i", ó: "o", ú: "u", ü: "u", ñ: "n" };
const slugify = (v) =>
  v.toLowerCase().replace(/[áéíóúüñ]/g, (c) => ACCENTS[c]).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const geopoint = (c) => (c ? { _type: "geopoint", lat: c[0], lng: c[1] } : null);
const empty = { es: "", en: "" };

function buildDoc(p, index) {
  return {
    _id: `opportunity-${p.key.toLowerCase()}`,
    _type: "opportunity",
    name: { es: p.es, en: p.en },
    slug: { _type: "slug", current: slugify(p.es) },
    status: "disponible",
    featured: false,
    order: 10 + index,
    surface: p.surface,
    city: { es: p.city[0], en: p.city[1] },
    vocation: p.vocation,
    availability: empty,
    briefDescription: empty,
    developmentPotential: empty,
    region: p.region ? { _type: "reference", _ref: p.region } : null,
    coordinates: geopoint(p.coords),
    locationPrecision: "approximate",
  };
}

async function main() {
  const fresh = PROPERTIES.filter((p) => !p.existing);
  const docs = fresh.map(buildDoc);

  const slugs = docs.map((d) => d.slug.current);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length) throw new Error(`Duplicate slugs: ${dupes.join(", ")}`);

  if (!DRY && (!process.env.SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN === "your_sanity_token_here")) {
    console.error("SANITY_WRITE_TOKEN is not set to a real token in .env.local — aborting.");
    process.exit(1);
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_API_DATASET || "production",
    apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
  });

  if (HIDE) {
    for (const d of docs) {
      if (DRY) { console.log(`[dry] would hide ${d._id}`); continue; }
      if (await client.getDocument(d._id)) {
        await client.patch(d._id).set({ status: "oculto" }).commit();
        console.log(`hidden: ${d._id}`);
      }
    }
    return;
  }

  // Slugs already used by other documents would make two pages share a URL.
  const taken = await client.fetch(
    `*[_type == "opportunity" && slug.current in $slugs && !(_id in $ids)]{ _id, "slug": slug.current }`,
    { slugs, ids: docs.map((d) => d._id) }
  );
  if (taken.length) throw new Error(`Slug already used: ${JSON.stringify(taken)}`);

  for (const d of docs) {
    if (DRY) {
      console.log(`[dry] create ${d._id} — ${d.name.es} | ${d.surface} | ${d.coordinates ? `${d.coordinates.lat}, ${d.coordinates.lng}` : "no pin"}`);
      continue;
    }
    const existed = await client.getDocument(d._id);
    await client.createIfNotExists(d);
    console.log(`${existed ? "kept (already exists)" : "created"}: ${d._id} — ${d.name.es}`);
  }

  for (const p of PROPERTIES.filter((x) => x.existing)) {
    const current = await client.getDocument(p.existing);
    if (!current) { console.log(`skip ${p.key}: ${p.existing} not found`); continue; }
    const set = {};
    if (!current.coordinates && p.coords) set.coordinates = geopoint(p.coords);
    if (!current.surface && p.surface) set.surface = p.surface;
    if (!current.locationPrecision) set.locationPrecision = "approximate";
    if (!Object.keys(set).length) { console.log(`unchanged: ${p.existing}`); continue; }
    if (DRY) { console.log(`[dry] fill ${p.existing} (${p.key}): ${JSON.stringify(set)}`); continue; }
    await client.patch(p.existing).set(set).commit();
    console.log(`filled: ${p.existing} (${p.key}) ${Object.keys(set).join(", ")}`);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
