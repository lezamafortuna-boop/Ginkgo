// One-time seed: copies the articles that used to live in data/insights.js into
// Sanity so the public Insights section isn't empty once it reads from the CRM.
//
// SAFE TO RE-RUN: uses createIfNotExists with deterministic _ids, so an article
// that already exists (and may have been edited in /admin/insights) is never
// overwritten. (The older migrate-static-data.js uses createOrReplace — don't
// re-run that one now that admins are editing regions/properties.)
//
// Usage:
//   node --env-file=.env.local scripts/migrate-insights.js --dry   (preview only)
//   node --env-file=.env.local scripts/migrate-insights.js         (write)
const { createClient } = require("@sanity/client");
const { insights } = require("../data/insights");

const DRY = process.argv.includes("--dry");

const MONTH_NUMBER = {
  enero: "01", febrero: "02", marzo: "03", abril: "04", mayo: "05", junio: "06",
  julio: "07", agosto: "08", septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12",
};

// "Julio 2026" -> "2026-07-01"
function toIsoDate(dateEs) {
  const [monthName, year] = (dateEs || "").trim().toLowerCase().split(/\s+/);
  const month = MONTH_NUMBER[monthName];
  if (!month || !/^\d{4}$/.test(year || "")) {
    throw new Error(`Cannot parse date "${dateEs}" — expected e.g. "Julio 2026".`);
  }
  return `${year}-${month}-01`;
}

function buildDoc(article) {
  return {
    _id: `insight-${article.slug}`,
    _type: "insight",
    title: { es: article.title_es, en: article.title_en },
    slug: { _type: "slug", current: article.slug },
    category: { es: article.category_es, en: article.category_en },
    date: toIsoDate(article.date_es),
    excerpt: { es: article.excerpt_es, en: article.excerpt_en },
    content: { es: article.content_es, en: article.content_en },
    // No image: the files referenced by data/insights.js (public/insights/*)
    // were never added to the project. Upload one from /admin/insights.
  };
}

async function main() {
  const docs = insights.map(buildDoc);

  if (DRY) {
    for (const d of docs) console.log(`[dry] would create ${d._id} — ${d.title.es} (${d.date})`);
    return;
  }

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

  for (const d of docs) {
    const existed = await client.getDocument(d._id);
    await client.createIfNotExists(d);
    console.log(`${existed ? "kept (already exists)" : "created"}: ${d._id}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
