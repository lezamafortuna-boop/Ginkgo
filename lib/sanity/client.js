import { createClient } from "@sanity/client";

// Public read client — safe to import from server or client components. No
// token: only published documents are ever visible through it.
//
// useCdn is intentionally false. Sanity's CDN can keep serving an older copy of
// a query's result for a long time after an admin saves a change (tested: an
// edited article's old URL, the public list and the sitemap stayed stale for
// minutes), so the admin panel's "save -> it's on the site" promise would not
// hold. Pages are cached by Next.js anyway (revalidate = 60 plus revalidatePath
// on every admin save), so live reads add very little API traffic.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: false,
});
