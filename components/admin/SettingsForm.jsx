"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";
const hintClasses = "mt-1 text-xs text-muted";

function Field({ label, hint, full, children }) {
  return (
    <div className={full ? "md:col-span-2" : undefined}>
      <label className={labelClasses}>{label}</label>
      {children}
      {hint && <p className={hintClasses}>{hint}</p>}
    </div>
  );
}

export default function SettingsForm({ initialValues }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const v = initialValues;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/configuracion", { method: "PUT", body: new FormData(e.target) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar la configuración.");
      setStatus("saved");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <h2 className="mb-5 font-serif text-lg font-semibold text-charcoal">Datos de contacto</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label="Número de WhatsApp"
            hint="Solo dígitos con código de país, p. ej. 524425088204. Se usa en los botones de WhatsApp."
          >
            <input name="whatsappNumber" required defaultValue={v.whatsappNumber} className={inputClasses} />
          </Field>
          <Field label="Teléfono para mostrar" hint="Cómo se ve en el sitio, p. ej. +52 442 508 8204.">
            <input name="phoneDisplay" required defaultValue={v.phoneDisplay} className={inputClasses} />
          </Field>
          <Field
            label="Correo de contacto"
            hint="Aquí llegan los avisos de nuevos leads y es el correo que se muestra al público."
            full
          >
            <input name="email" type="email" required defaultValue={v.email} className={inputClasses} />
          </Field>
          <Field label="Dirección (opcional)" full>
            <textarea name="address" rows={2} defaultValue={v.address} className={inputClasses} />
          </Field>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="mb-5 font-serif text-lg font-semibold text-charcoal">Redes sociales</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Instagram (URL)" hint="Déjalo vacío para ocultarlo del sitio.">
            <input name="instagramUrl" defaultValue={v.instagramUrl} placeholder="https://www.instagram.com/..." className={inputClasses} />
          </Field>
          <Field label="LinkedIn (URL)" hint="Déjalo vacío para ocultarlo del sitio.">
            <input name="linkedinUrl" defaultValue={v.linkedinUrl} placeholder="https://www.linkedin.com/company/..." className={inputClasses} />
          </Field>
        </div>
      </Card>

      {status === "error" && <p className="mb-4 text-sm text-red-600">{errorMessage}</p>}
      {status === "saved" && <p className="mb-4 text-sm text-brand-700">Configuración guardada. Ya se ve en el sitio.</p>}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Guardando..." : "Guardar cambios"}
      </Button>
    </form>
  );
}
