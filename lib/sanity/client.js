import { createClient } from "@sanity/client";

// Public, CDN-backed read client — safe to import from server or client
// components. No token: only published documents are ever visible through it.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
});
