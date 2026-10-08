"use client";

import { Fragment, useMemo, useState } from "react";
import { APIProvider, Map as GoogleMap, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { MEXICO_CENTER, APPROX_RADIUS_M } from "@/lib/maps";
import ApproxCircle from "./ApproxCircle";

const COPY = {
  es: {
    filterLabel: "Región",
    allRegions: "Todas las regiones",
    surface: "Superficie",
    vocation: "Vocación",
    viewProperty: "Ver propiedad",
    whatsapp: "Preguntar por WhatsApp",
    empty: "No hay propiedades con ubicación registrada todavía.",
    approximate: "Ubicación aproximada",
    whatsappMessage: (name) => `Hola, me interesa recibir información sobre ${name}.`,
    propertyHref: (slug) => `/es/oportunidades/${slug}`,
  },
  en: {
    filterLabel: "Region",
    allRegions: "All regions",
    surface: "Surface",
    vocation: "Land use",
    viewProperty: "View property",
    whatsapp: "Ask on WhatsApp",
    empty: "No properties have a registered location yet.",
    approximate: "Approximate location",
    whatsappMessage: (name) => `Hi, I'd like more information about ${name}.`,
    propertyHref: (slug) => `/en/opportunities/${slug}`,
  },
};

export default function PublicPropertyMap({ properties, locale = "es", whatsappNumber }) {
  const t = COPY[locale] ?? COPY.es;
  const nameKey = locale === "en" ? "name_en" : "name_es";
  const vocationKey = locale === "en" ? "vocation_en" : "vocation_es";
  const briefKey = locale === "en" ? "briefDescription_en" : "briefDescription_es";
  const regionNameKey = locale === "en" ? "regionName_en" : "regionName_es";

  const regions = useMemo(() => {
    const set = new Map();
    for (const p of properties) {
      if (p.region) set.set(p.region, p[regionNameKey] || p.region);
    }
    return Array.from(set.entries());
  }, [properties, regionNameKey]);

  const [regionFilter, setRegionFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = regionFilter ? properties.filter((p) => p.region === regionFilter) : properties;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return (
      <p className="rounded-md border border-border bg-cream p-6 text-sm text-muted">
        El mapa interactivo no está disponible por el momento.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      <div className="order-2 lg:order-1">
        {regions.length > 1 && (
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="mb-4 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-charcoal"
          >
            <option value="">{t.allRegions}</option>
            {regions.map(([slug, name]) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
        )}

        {filtered.length === 0 ? (
          <p className="text-sm text-muted">{t.empty}</p>
        ) : (
          <ul className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {filtered.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${
                    selected?.slug === p.slug
                      ? "border-brand-600 bg-brand-50"
                      : "border-border bg-paper hover:border-brand-400"
                  }`}
                >
                  <p className="font-serif font-semibold text-charcoal">{p[nameKey]}</p>
                  <p className="mt-1 text-xs text-muted">
                    {t.surface}: {p.surface}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="order-1 h-[420px] overflow-hidden rounded-lg border border-border lg:order-2 lg:h-[560px]">
        <APIProvider apiKey={apiKey}>
          <GoogleMap defaultCenter={MEXICO_CENTER} defaultZoom={5} gestureHandling="greedy">
            {filtered.map((p) => (
              <Fragment key={p.slug}>
                <Marker
                  position={{ lat: p.coordinates.lat, lng: p.coordinates.lng }}
                  onClick={() => setSelected(p)}
                />
                {p.approximate && (
                  <ApproxCircle
                    center={{ lat: p.coordinates.lat, lng: p.coordinates.lng }}
                    radius={APPROX_RADIUS_M}
                  />
                )}
              </Fragment>
            ))}

            {selected && (
              <InfoWindow
                position={{ lat: selected.coordinates.lat, lng: selected.coordinates.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="max-w-[220px] p-1">
                  <p className="font-semibold text-charcoal">{selected[nameKey]}</p>
                  <p className="mt-1 text-xs text-ink">
                    {t.surface}: {selected.surface}
                  </p>
                  <p className="text-xs text-ink">
                    {t.vocation}: {selected[vocationKey]}
                  </p>
                  {selected.approximate && (
                    <p className="text-xs italic text-muted">{t.approximate}</p>
                  )}
                  {selected[briefKey] && (
                    <p className="mt-2 text-xs text-ink">{selected[briefKey]}</p>
                  )}
                  <div className="mt-3 flex flex-col gap-2">
                    <a
                      href={t.propertyHref(selected.slug)}
                      className="text-xs font-semibold text-brand-600 hover:underline"
                    >
                      {t.viewProperty}
                    </a>
                    <a
                      href={buildWhatsappUrl(whatsappNumber, t.whatsappMessage(selected[nameKey]))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#25D366] hover:underline"
                    >
                      {t.whatsapp}
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </APIProvider>
      </div>
    </div>
  );
}
