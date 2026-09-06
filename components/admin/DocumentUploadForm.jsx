"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

const TYPE_OPTIONS = [
  { value: "tech_sheet", label: "Ficha técnica" },
  { value: "plan", label: "Plano" },
  { value: "legal", label: "Legal" },
  { value: "presentation", label: "Presentación" },
  { value: "other", label: "Otro" },
];

export default function DocumentUploadForm({ properties, regions }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/admin/documents", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo subir el documento.");
      router.push("/admin/documentos");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={labelClasses}>Nombre del documento</label>
          <input name="title" required maxLength={150} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Tipo</label>
          <select name="type" defaultValue="other" className={inputClasses}>
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Propiedad asociada (opcional)</label>
          <select name="property" defaultValue="" className={inputClasses}>
            <option value="">Ninguna</option>
            {properties.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name?.es}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Región asociada (opcional)</label>
          <select name="region" defaultValue="" className={inputClasses}>
            <option value="">Ninguna</option>
            {regions.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name?.es}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelClasses}>Archivo</label>
          <input type="file" name="file" required className={inputClasses} />
        </div>

        <div className="md:col-span-2 flex items-center gap-4">
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Subiendo..." : "Subir documento"}
          </Button>
          {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      </form>
    </Card>
  );
}
