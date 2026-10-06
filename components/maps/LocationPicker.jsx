"use client";

import { useCallback, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

// Querétaro city center — a sensible default so a brand-new property starts
// somewhere in Ginkgo's actual coverage area instead of null island.
const DEFAULT_CENTER = { lat: 20.5888, lng: -100.3899 };

export default function LocationPicker({ initialLat, initialLng }) {
  const hasInitial = initialLat != null && initialLat !== "" && initialLng != null && initialLng !== "";
  const [position, setPosition] = useState(
    hasInitial ? { lat: Number(initialLat), lng: Number(initialLng) } : DEFAULT_CENTER
  );

  const handleDragEnd = useCallback((e) => {
    if (!e.latLng) return;
    setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }, []);

  const handleMapClick = useCallback((e) => {
    if (!e.detail.latLng) return;
    setPosition({ lat: e.detail.latLng.lat, lng: e.detail.latLng.lng });
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return (
      <>
        <input type="hidden" name="lat" value={position.lat} readOnly />
        <input type="hidden" name="lng" value={position.lng} readOnly />
        <p className="rounded-md border border-border bg-cream p-4 text-sm text-muted">
          Falta configurar NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para usar el mapa. Mientras tanto, la
          ubicación se mantiene en su último valor guardado.
        </p>
      </>
    );
  }

  return (
    <div>
      <input type="hidden" name="lat" value={position.lat} readOnly />
      <input type="hidden" name="lng" value={position.lng} readOnly />
      <APIProvider apiKey={apiKey}>
        <div className="h-80 w-full overflow-hidden rounded-md border border-border">
          <Map
            defaultCenter={position}
            defaultZoom={hasInitial ? 14 : 7}
            gestureHandling="greedy"
            onClick={handleMapClick}
          >
            <Marker position={position} draggable onDragEnd={handleDragEnd} />
          </Map>
        </div>
      </APIProvider>
      <p className="mt-2 text-xs text-muted">
        Arrastra el marcador o haz clic en el mapa para ajustar la ubicación — Lat:{" "}
        {position.lat.toFixed(6)}, Lng: {position.lng.toFixed(6)}
      </p>
    </div>
  );
}
