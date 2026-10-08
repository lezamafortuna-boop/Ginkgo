"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";
import { getUtmParams, submitLead } from "@/lib/leadClient";

const COPY = {
  es: {
    name: "Nombre",
    lastName: "Apellido",
    email: "Correo",
    phone: "Teléfono / WhatsApp",
    company: "Empresa (opcional)",
    lookingFor: "¿Qué estás buscando?",
    lookingForOptions: [
      "Terreno para desarrollo",
      "Macrolote",
      "Oportunidad de inversión",
      "Propiedad turística",
      "Propiedad comercial",
      "Propiedad industrial",
      "Otro",
    ],
    region: "Ubicación / región de interés",
    surface: "Superficie aproximada",
    developmentType: "Tipo de desarrollo que busca",
    budget: "Presupuesto aproximado (opcional)",
    horizon: "Horizonte de compra",
    horizonOptions: ["Inmediato", "3–6 meses", "6–12 meses", "Más de 12 meses", "Aún explorando"],
    comments: "Comentarios adicionales (opcional)",
    submit: "Encontrar oportunidades",
    sending: "Enviando...",
    success: "Gracias. Hemos recibido tu búsqueda y te contactaremos con oportunidades alineadas.",
    error: "Hubo un problema al enviar tu solicitud. Inténtalo de nuevo o escríbenos directamente.",
  },
  en: {
    name: "Name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone / WhatsApp",
    company: "Company (optional)",
    lookingFor: "What are you looking for?",
    lookingForOptions: [
      "Land for development",
      "Macrolote",
      "Investment opportunity",
      "Tourism property",
      "Commercial property",
      "Industrial property",
      "Other",
    ],
    region: "Location / region of interest",
    surface: "Approximate surface",
    developmentType: "Type of development you're seeking",
    budget: "Approximate budget (optional)",
    horizon: "Purchase horizon",
    horizonOptions: ["Immediate", "3–6 months", "6–12 months", "More than 12 months", "Still exploring"],
    comments: "Additional comments (optional)",
    submit: "Find opportunities",
    sending: "Sending...",
    success: "Thank you. We've received your search and will reach out with aligned opportunities.",
    error: "There was a problem sending your request. Please try again or email us directly.",
  },
};

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-4 py-3 text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

export default function LeadFormC({ locale = "es", id = "lead-c" }) {
  const t = COPY[locale] ?? COPY.es;
  const pathname = usePathname();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("website")) return;

    setStatus("sending");
    formData.set("formType", "search_property");
    formData.set("locale", locale);
    formData.set("sourcePage", pathname || "");
    const { utmSource, utmCampaign } = getUtmParams();
    formData.set("utmSource", utmSource);
    formData.set("utmCampaign", utmCampaign);

    try {
      await submitLead(formData);
      setStatus("success");
      e.target.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className={labelClasses}>{t.name}</label>
        <input name="name" required maxLength={120} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.lastName}</label>
        <input name="lastName" required maxLength={120} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.email}</label>
        <input name="email" type="email" required maxLength={200} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.phone}</label>
        <input name="phone" type="tel" required maxLength={40} className={inputClasses} />
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>{t.company}</label>
        <input name="company" maxLength={120} className={inputClasses} />
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>{t.lookingFor}</label>
        <select name="lookingFor" className={inputClasses} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {t.lookingForOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>{t.region}</label>
        <input name="regionOfInterest" maxLength={120} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.surface}</label>
        <input name="surfaceNeeded" maxLength={60} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.developmentType}</label>
        <input name="developmentType" maxLength={120} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.budget}</label>
        <input name="budget" maxLength={60} className={inputClasses} />
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>{t.horizon}</label>
        <select name="purchaseHorizon" className={inputClasses} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {t.horizonOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>{t.comments}</label>
        <textarea name="message" rows={3} maxLength={2000} className={inputClasses} />
      </div>

      <div className="md:col-span-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </Button>
        {status === "success" && <p className="mt-4 text-sm text-brand-700">{t.success}</p>}
        {status === "error" && <p className="mt-4 text-sm text-red-600">{errorMessage || t.error}</p>}
      </div>
    </form>
  );
}
