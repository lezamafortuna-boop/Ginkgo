"use client";

import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";
import ApproxCircle from "./ApproxCircle";
import { APPROX_RADIUS_M } from "@/lib/maps";

const NOTE = {
  es: "Ubicación aproximada.",
  en: "Approximate location.",
};

// Single-property map for the detail pages (plan §6.4). Expects coordinates
// that already went through toPublicMapPoint, so approximate ones are blurred.
export default function PropertyLocationMap({ coordinates, approximate, name, locale = "es" }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey || !coordinates) return null;

  return (
    <div>
      <div className="h-80 w-full">
        <APIProvider apiKey={apiKey}>
          <GoogleMap
            defaultCenter={coordinates}
            defaultZoom={approximate ? 13 : 15}
            gestureHandling="cooperative"
            aria-label={name}
          >
            <Marker position={coordinates} title={name} />
            {approximate && <ApproxCircle center={coordinates} radius={APPROX_RADIUS_M} />}
          </GoogleMap>
        </APIProvider>
      </div>
      {approximate && (
        <p className="border-t border-border bg-cream px-8 py-2 text-xs text-muted">{NOTE[locale] ?? NOTE.es}</p>
      )}
    </div>
  );
}
