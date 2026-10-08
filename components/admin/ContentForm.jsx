"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

export default function ContentForm({ groups }) {
  const router = useRouter();
  const [activeId, setActiveId] = useState(groups[0].id);
  const [values, setValues] = useState(() => {
    const v = {};
    for (const g of groups) for (const s of g.slots) v[s.key] = { ...s.value };
    return v;
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function setValue(key, lang, text) {
    setStatus("idle");
    setValues((prev) => ({ ...prev, [key]: { ...prev[key], [lang]: text } }));
  }

  function restore(slot) {
    setStatus("idle");
    setValues((prev) => ({ ...prev, [slot.key]: { ...slot.original } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/contenido", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar el contenido.");
      setStatus("saved");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  }

  const group = groups.find((g) => g.id === activeId);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveId(g.id)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              g.id === activeId
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border bg-paper text-charcoal hover:border-brand-600"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <Card className="mb-6">
        <h2 className="mb-5 font-serif text-lg font-semibold text-charcoal">{group.label}</h2>
        <div className="space-y-6">
          {group.slots.map((slot) => {
            const Input = slot.multiline ? "textarea" : "input";
            const extra = slot.multiline ? { rows: 3 } : {};
            const changed =
              values[slot.key].es !== slot.original.es || values[slot.key].en !== slot.original.en;
            return (
              <div key={slot.key}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-charcoal">{slot.label}</span>
                  {changed && (
                    <button
                      type="button"
                      onClick={() => restore(slot)}
                      className="text-xs text-brand-600 hover:underline"
                    >
                      Restaurar original
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClasses}>Español</label>
                    <Input
                      {...extra}
                      value={values[slot.key].es}
                      onChange={(e) => setValue(slot.key, "es", e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>English</label>
                    <Input
                      {...extra}
                      value={values[slot.key].en}
                      onChange={(e) => setValue(slot.key, "en", e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {status === "error" && <p className="mb-4 text-sm text-red-600">{errorMessage}</p>}
      {status === "saved" && (
        <p className="mb-4 text-sm text-brand-700">Contenido guardado. Los cambios de todas las secciones ya están en el sitio.</p>
      )}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Guardando..." : "Guardar cambios"}
      </Button>
      <p className="mt-3 text-xs text-muted">Se guardan los textos de todas las pestañas a la vez.</p>
    </form>
  );
}
