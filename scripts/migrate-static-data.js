// One-time seed: copies the real regions/opportunities that used to live in
// data/regions.js and data/opportunities.js into Sanity, so switching the
// public site over to the CRM's data doesn't blank it out. Safe to re-run —
// uses deterministic _ids and createOrReplace, so it's idempotent.
//
// Usage: node --env-file=.env.local scripts/migrate-static-data.js
const { createClient } = require("@sanity/client");
const { regions } = require("../data/regions");
const { opportunities } = require("../data/opportunities");

if (!process.env.SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN === "your_sanity_token_here") {
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

const locale = (es, en) => ({ es, en });
const localeArray = (esArr, enArr) => (esArr || []).map((es, i) => ({ es, en: enArr?.[i] || "" }));

async function migrateRegions() {
  const idBySlug = {};
  for (const [index, r] of regions.entries()) {
    const _id = `region-${r.slug}`;
    idBySlug[r.slug] = _id;
    await client.createOrReplace({
      _id,
      _type: "region",
      name: locale(r.name_es, r.name_en),
      slug: { _type: "slug", current: r.slug },
      description: locale(r.description_es, r.description_en),
      advantages: localeArray(r.advantages_es, r.advantages_en),
      order: index,
    });
    console.log(`Region seeded: ${r.slug}`);
  }
  return idBySlug;
}

async function migrateOpportunities(regionIdBySlug) {
  for (const [index, op] of opportunities.entries()) {
    const _id = `opportunity-${op.slug}`;
    const regionId = regionIdBySlug[op.region];
    await client.createOrReplace({
      _id,
      _type: "opportunity",
      name: locale(op.name_es, op.name_en),
      slug: { _type: "slug", current: op.slug },
      featured: Boolean(op.featured),
      order: index,
      status: "disponible",
      ...(regionId ? { region: { _type: "reference", _ref: regionId } } : {}),
      city: locale(op.city_es, op.city_en),
      surface: op.surface,
      vocation: locale(op.vocation_es, op.vocation_en),
      availability: locale(op.availability_es, op.availability_en),
      advantages: localeArray(op.advantages_es, op.advantages_en),
      reasons: localeArray(op.reasons_es, op.reasons_en),
      developmentPotential: locale(op.developmentPotential_es, op.developmentPotential_en),
      distances: localeArray(op.distances_es, op.distances_en),
    });
    console.log(`Opportunity seeded: ${op.slug}`);
  }
}

async function main() {
  const regionIdBySlug = await migrateRegions();
  await migrateOpportunities(regionIdBySlug);
  console.log("Done. Note: hero/map images and tech sheet PDFs were NOT migrated (the old local");
  console.log("paths in data/opportunities.js don't correspond to real files) — upload real photos");
  console.log("for each property/region from the admin panel or Sanity Studio when ready.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
