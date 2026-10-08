"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </Card>
  );
}

export default function InsightForm({ mode, id, initialValues }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(mode === "create" ? "/api/admin/insights" : `/api/admin/insights/${id}`, {
        method: mode === "create" ? "POST" : "PUT",
        body: new FormData(e.target),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar el artículo.");
      router.push("/admin/insights");
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
        <Field label="Título (Español)">
          <input name="title_es" required defaultValue={v.title_es} className={inputClasses} />
        </Field>
        <Field label="Título (English)">
          <input name="title_en" required defaultValue={v.title_en} className={inputClasses} />
        </Field>
        <Field label="Categoría (Español)">
          <input name="category_es" defaultValue={v.category_es} placeholder="Ej. Mercado" className={inputClasses} />
        </Field>
        <Field label="Categoría (English)">
          <input name="category_en" defaultValue={v.category_en} placeholder="E.g. Market" className={inputClasses} />
        </Field>
        <Field label="Fecha de publicación">
          <input type="date" name="date" required defaultValue={v.date} className={inputClasses} />
        </Field>
        <Field label="Slug (URL)">
          <input
            name="slug"
            defaultValue={v.slug}
            placeholder="Se genera del título si se deja vacío"
            className={inputClasses}
          />
        </Field>
      </Section>

      <Section title="Contenido">
        <Field label="Resumen (ES)" full>
          <textarea name="excerpt_es" rows={3} defaultValue={v.excerpt_es} className={inputClasses} />
        </Field>
        <Field label="Resumen (EN)" full>
          <textarea name="excerpt_en" rows={3} defaultValue={v.excerpt_en} className={inputClasses} />
        </Field>
        <Field label="Artículo (ES) — deja una línea en blanco entre párrafos" full>
          <textarea name="content_es" rows={12} defaultValue={v.content_es} className={inputClasses} />
        </Field>
        <Field label="Article (EN) — leave a blank line between paragraphs" full>
          <textarea name="content_en" rows={12} defaultValue={v.content_en} className={inputClasses} />
        </Field>
      </Section>

      <Section title="Multimedia">
        <Field label="Imagen principal" full>
          <input type="file" name="image" accept="image/*" className={inputClasses} />
          {v.image && <p className="mt-2 text-xs text-muted">Ya tiene una imagen — sube otra para reemplazarla.</p>}
        </Field>
      </Section>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Guardando..." : mode === "create" ? "Publicar artículo" : "Guardar cambios"}
        </Button>
        {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    </form>
  );
}
