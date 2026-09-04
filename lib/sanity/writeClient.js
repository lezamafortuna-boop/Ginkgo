import "server-only";
import { createClient } from "@sanity/client";

// Server-only mutation client for the /admin panel — uses a token with write
// access, so `import "server-only"` above makes any accidental client-side
// import a build error instead of a leaked token.
if (!process.env.SANITY_WRITE_TOKEN) {
  console.warn(
    "SANITY_WRITE_TOKEN is not set — admin panel writes to Sanity will fail."
  );
}

export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});
