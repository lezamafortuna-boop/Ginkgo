"use client";

import { useState } from "react";
import Link from "next/link";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { MEXICO_CENTER, isValidCoordinates } from "@/lib/maps";

const STATUS_LABELS = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};

export default function AdminPropertiesMap({ properties: all }) {
  const properties = all.filter((p) => isValidCoordinates(p.coordinates));
  const invalidCount = all.length - properties.length;
  const [selected, setSelected] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return (
      <p className="rounded-md border border-border bg-cream p-6 text-sm text-muted">
        Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para ver el mapa.
      </p>
    );
  }

  if (properties.length === 0) {
    return (
      <p className="rounded-md border border-border bg-paper p-6 text-sm text-muted">
        Ninguna propiedad tiene coordenadas registradas todavía — agrégalas desde la edición de
        cada propiedad (sección Ubicación).
      </p>
    );
  }

  return (
    <div>
      {invalidCount > 0 && (
        <p className="mb-3 rounded-md border border-border bg-cream p-3 text-sm text-muted">
          {invalidCount} propiedad(es) tienen coordenadas inválidas y no se muestran — corrígelas desde la
          edición de cada propiedad.
        </p>
      )}
    <div className="h-[600px] overflow-hidden rounded-lg border border-border">
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={MEXICO_CENTER} defaultZoom={5} gestureHandling="greedy">
          {properties.map((p) => (
            <Marker
              key={p._id}
              position={{ lat: p.coordinates.lat, lng: p.coordinates.lng }}
              onClick={() => setSelected(p)}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ lat: selected.coordinates.lat, lng: selected.coordinates.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="max-w-[200px] p-1">
                <p className="font-semibold text-charcoal">{selected.name?.es}</p>
                <p className="mt-1 text-xs text-muted">{STATUS_LABELS[selected.status] || selected.status}</p>
                <Link
                  href={`/admin/propiedades/${selected._id}`}
                  className="mt-3 inline-block text-xs font-semibold text-brand-600 hover:underline"
                >
                  Editar propiedad
                </Link>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
    </div>
  );
}
