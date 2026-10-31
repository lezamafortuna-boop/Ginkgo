"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// Google Maps touches the browser-only `google.maps` global as soon as it
// renders — ssr:false is safe here since PropertyForm is already a Client
// Component, so there's no server-render tree to conflict with.
const LocationPicker = dynamic(() => import("@/components/maps/LocationPicker"), {
  ssr: false,
  loading: () => <div className="h-80 w-full rounded-md border border-border bg-cream" />,
});

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";
const fieldsetClasses = "grid grid-cols-1 gap-4 md:grid-cols-2";

function Field({ label, children }) {
  return (
    <div>
      <label className={labelClasses}>{label}</label>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <Card className="mb-6">
      <h2 className="mb-5 font-serif text-lg font-semibold text-charcoal">{title}</h2>
      <div className={fieldsetClasses}>{children}</div>
    </Card>
  );
}

export default function PropertyForm({ mode, id, initialValues, regions }) {
  const router = useRouter();
  const [customFields, setCustomFields] = useState(initialValues?.customFields || []);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function addCustomField() {
    setCustomFields((f) => [...f, { label: "", value: "" }]);
  }

  function updateCustomField(index, key, value) {
    setCustomFields((f) => f.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function removeCustomField(index) {
    setCustomFields((f) => f.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.target);
    formData.set("customFields", JSON.stringify(customFields.filter((f) => f.label && f.value)));

    try {
      const res = await fetch(mode === "create" ? "/api/admin/properties" : `/api/admin/properties/${id}`, {
        method: mode === "create" ? "POST" : "PUT",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar la propiedad.");
      router.push("/admin/propiedades");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  }

  const v = initialValues || {};

  return (
    <form onSubmit={handleSubmit}>
      <Section title="Información general">
        <Field label="Nombre (Español)">
          <input name="name_es" required defaultValue={v.name_es} className={inputClasses} />
        </Field>
        <Field label="Nombre (English)">
          <input name="name_en" required defaultValue={v.name_en} className={inputClasses} />
        </Field>
        <Field label="Slug (URL)">
          <input
            name="slug"
            defaultValue={v.slug}
            placeholder="Se genera del nombre si se deja vacío"
            className={inputClasses}
          />
        </Field>
        <Field label="Región">
          <select name="region" defaultValue={v.regionId || ""} className={inputClasses}>
            <option value="">Sin región</option>
            {regions.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name?.es}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estado">
          <select name="status" defaultValue={v.status || "disponible"} className={inputClasses}>
            <option value="disponible">Disponible</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
            <option value="oculto">Oculto (no aparece en el sitio)</option>
          </select>
        </Field>
        <Field label="Superficie">
          <input name="surface" placeholder='Ej. "12 ha"' defaultValue={v.surface} className={inputClasses} />
        </Field>
        <Field label="Ciudad / región (ES)">
          <input name="city_es" defaultValue={v.city_es} className={inputClasses} />
        </Field>
        <Field label="Ciudad / región (EN)">
          <input name="city_en" defaultValue={v.city_en} className={inputClasses} />
        </Field>
        <Field label="Vocación (ES)">
          <input name="vocation_es" defaultValue={v.vocation_es} className={inputClasses} />
        </Field>
        <Field label="Vocación (EN)">
          <input name="vocation_en" defaultValue={v.vocation_en} className={inputClasses} />
        </Field>
        <Field label="Disponibilidad — texto libre (ES)">
          <input name="availability_es" defaultValue={v.availability_es} className={inputClasses} />
        </Field>
        <Field label="Disponibilidad — texto libre (EN)">
          <input name="availability_en" defaultValue={v.availability_en} className={inputClasses} />
        </Field>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            defaultChecked={v.featured}
            className="h-4 w-4"
          />
          <label htmlFor="featured" className="text-sm text-ink">
            Destacada en Home
          </label>
        </div>
        <Field label="Orden de despliegue">
          <input type="number" name="order" defaultValue={v.order ?? 0} className={inputClasses} />
        </Field>
      </Section>

      <Card className="mb-6">
        <h2 className="mb-5 font-serif text-lg font-semibold text-charcoal">Ubicación</h2>
        <LocationPicker initialLat={v.lat} initialLng={v.lng} />
        <div className="mt-5">
          <label className={labelClasses}>Precisión en el sitio público</label>
          <select
            name="locationPrecision"
            defaultValue={v.locationPrecision || "approximate"}
            className={inputClasses}
          >
            <option value="approximate">Aproximada (círculo de ~1.5 km; no se revela el punto exacto)</option>
            <option value="exact">Exacta (pin en el punto marcado)</option>
          </select>
          <p className="mt-2 text-xs text-muted">
            El punto exacto solo se ve en el CRM. En el mapa público, las ubicaciones aproximadas se
            desplazan y se muestran con un círculo.
          </p>
        </div>
      </Card>

      <Section title="Multimedia">
        <Field label="Imagen principal">
          <input type="file" name="image" accept="image/*" className={inputClasses} />
          {v.image && <p className="mt-2 text-xs text-muted">Ya tiene una imagen — sube otra para reemplazarla.</p>}
        </Field>
        <Field label="Galería (puedes seleccionar varias)">
          <input type="file" name="gallery" accept="image/*" multiple className={inputClasses} />
          {v.gallery?.length > 0 && (
            <p className="mt-2 text-xs text-muted">
              Ya tiene {v.gallery.length} imagen(es) — subir nuevas las reemplaza todas.
            </p>
          )}
        </Field>
      </Section>

      <Section title="Descripciones">
        <div className="md:col-span-2">
          <label className={labelClasses}>Descripción breve (ES)</label>
          <textarea
            name="briefDescription_es"
            rows={3}
            defaultValue={v.briefDescription_es}
            className={inputClasses}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClasses}>Descripción breve (EN)</label>
          <textarea
            name="briefDescription_en"
            rows={3}
            defaultValue={v.briefDescription_en}
            className={inputClasses}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClasses}>Descripción completa — potencial de desarrollo (ES)</label>
          <textarea
            name="developmentPotential_es"
            rows={6}
            defaultValue={v.developmentPotential_es}
            className={inputClasses}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClasses}>Descripción completa — potencial de desarrollo (EN)</label>
          <textarea
            name="developmentPotential_en"
            rows={6}
            defaultValue={v.developmentPotential_en}
            className={inputClasses}
          />
        </div>
      </Section>

      <Card className="mb-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-charcoal">Campos adicionales</h2>
          <Button type="button" variant="outline" onClick={addCustomField} className="px-4 py-2 text-xs">
            + Agregar campo
          </Button>
        </div>
        {customFields.length === 0 && (
          <p className="text-sm text-muted">Sin campos adicionales todavía.</p>
        )}
        <div className="space-y-3">
          {customFields.map((field, index) => (
            <div key={index} className="flex gap-3">
              <input
                placeholder="Nombre del campo"
                value={field.label}
                onChange={(e) => updateCustomField(index, "label", e.target.value)}
                className={inputClasses}
              />
              <input
                placeholder="Valor"
                value={field.value}
                onChange={(e) => updateCustomField(index, "value", e.target.value)}
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => removeCustomField(index)}
                className="shrink-0 rounded-md border border-border px-3 text-sm text-muted hover:border-red-400 hover:text-red-600"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Guardando..." : mode === "create" ? "Crear propiedad" : "Guardar cambios"}
        </Button>
        {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    </form>
  );
}
