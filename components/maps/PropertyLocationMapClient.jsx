"use client";

import dynamic from "next/dynamic";

// google.maps is browser-only, so skip SSR for the map itself.
const PropertyLocationMap = dynamic(() => import("./PropertyLocationMap"), {
  ssr: false,
  loading: () => <div className="h-80 w-full bg-cream" />,
});

export default PropertyLocationMap;
