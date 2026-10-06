"use client";

import dynamic from "next/dynamic";

// Google Maps components touch the browser-only `google.maps` global as soon
// as they render, which crashes Next.js's server-side prerendering — this
// wrapper is the client-only boundary that skips SSR for the map itself.
const PublicPropertyMap = dynamic(() => import("./PublicPropertyMap"), {
  ssr: false,
  loading: () => <div className="h-[420px] rounded-lg border border-border bg-cream lg:h-[560px]" />,
});

export default PublicPropertyMap;
