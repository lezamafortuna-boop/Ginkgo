"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";
const fieldsetClasses = "grid grid-cols-1 gap-4 md:grid-cols-2";

function Field({ label, children, full }) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
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

export default function RegionForm({ mode, id, initialValues }) {
  const router = useRouter();
  const [advantages, setAdvantages] = useState(initialValues?.advantages || []);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function addAdvantage() {
    setAdvantages((a) => [...a, { es: "", en: "" }]);
  }

  function updateAdvantage(index, key, value) {
    setAdvantages((a) => a.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  function removeAdvantage(index) {
    setAdvantages((a) => a.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.target);
    formData.set("advantages", JSON.stringify(advantages.filter((a) => a.es && a.en)));

    try {
      const res = await fetch(mode === "create" ? "/api/admin/regions" : `/api/admin/regions/${id}`, {
        method: mode === "create" ? "POST" : "PUT",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar la región.");
      router.push("/admin/regiones");
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
        <Field label="Orden de despliegue">
          <input type="number" name="order" defaultValue={v.order ?? 0} className={inputClasses} />
        </Field>
        <Field label="Descripción (ES)" full>
          <textarea name="description_es" rows={4} defaultValue={v.description_es} className={inputClasses} />
        </Field>
        <Field label="Descripción (EN)" full>
          <textarea name="description_en" rows={4} defaultValue={v.description_en} className={inputClasses} />
        </Field>
      </Section>

      <Section title="Multimedia">
        <Field label="Imagen principal">
          <input type="file" name="heroImage" accept="image/*" className={inputClasses} />
          {v.heroImage && <p className="mt-2 text-xs text-muted">Ya tiene una imagen — sube otra para reemplazarla.</p>}
        </Field>
        <Field label="Imagen de mapa">
          <input type="file" name="mapImage" accept="image/*" className={inputClasses} />
          {v.mapImage && <p className="mt-2 text-xs text-muted">Ya tiene una imagen — sube otra para reemplazarla.</p>}
        </Field>
      </Section>

      <Card className="mb-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-charcoal">Ventajas estratégicas</h2>
          <Button type="button" variant="outline" onClick={addAdvantage} className="px-4 py-2 text-xs">
            + Agregar ventaja
          </Button>
        </div>
        {advantages.length === 0 && <p className="text-sm text-muted">Sin ventajas todavía.</p>}
        <div className="space-y-3">
          {advantages.map((adv, index) => (
            <div key={index} className="flex gap-3">
              <input
                placeholder="Español"
                value={adv.es}
                onChange={(e) => updateAdvantage(index, "es", e.target.value)}
                className={inputClasses}
              />
              <input
                placeholder="English"
                value={adv.en}
                onChange={(e) => updateAdvantage(index, "en", e.target.value)}
                className={inputClasses}
              />
              <button
                type="button"
                onClick={() => removeAdvantage(index)}
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
          {status === "sending" ? "Guardando..." : mode === "create" ? "Crear región" : "Guardar cambios"}
        </Button>
        {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    </form>
  );
}
