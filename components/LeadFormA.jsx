"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";
import { getUtmParams, submitLead } from "@/lib/leadClient";

const COPY = {
  es: {
    interestedIn: "Propiedad de interés:",
    name: "Nombre",
    lastName: "Apellido",
    email: "Correo",
    phone: "Teléfono / WhatsApp",
    profile: "¿Qué tipo de perfil tienes?",
    profileOptions: ["Inversionista", "Desarrollador", "Empresa", "Broker / asesor inmobiliario", "Otro"],
    interested: "¿Qué información te interesa recibir?",
    interestOptions: [
      "Información general",
      "Ubicación",
      "Características de la propiedad",
      "Potencial de desarrollo",
      "Precio / condiciones comerciales",
      "Ficha técnica",
      "Quiero hablar con un asesor",
    ],
    message: "Comentarios / mensaje adicional (opcional)",
    submit: "Solicitar información",
    sending: "Enviando...",
    success:
      "Gracias por tu interés. Hemos recibido tu solicitud y un asesor de Ginkgo se pondrá en contacto contigo.",
    error: "Hubo un problema al enviar tu solicitud. Inténtalo de nuevo o escríbenos directamente.",
  },
  en: {
    interestedIn: "Property of interest:",
    name: "Name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone / WhatsApp",
    profile: "What's your profile?",
    profileOptions: ["Investor", "Developer", "Company", "Broker / real estate advisor", "Other"],
    interested: "What information would you like to receive?",
    interestOptions: [
      "General information",
      "Location",
      "Property characteristics",
      "Development potential",
      "Price / commercial terms",
      "Technical sheet",
      "I want to speak with an advisor",
    ],
    message: "Additional comments (optional)",
    submit: "Request information",
    sending: "Sending...",
    success: "Thank you for your interest. We've received your request and a Ginkgo advisor will reach out.",
    error: "There was a problem sending your request. Please try again or email us directly.",
  },
};

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-4 py-3 text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

export default function LeadFormA({ locale = "es", propertyName, propertySlug, id = "lead-a" }) {
  const t = COPY[locale] ?? COPY.es;
  const pathname = usePathname();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("website")) return; // honeypot

    setStatus("sending");
    formData.set("formType", "property_info");
    formData.set("propertyName", propertyName || "");
    formData.set("propertySlug", propertySlug || "");
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
    <form id={id} onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {propertyName && (
        <p className="rounded-md bg-brand-50 px-4 py-3 text-sm text-brand-700">
          <strong>{t.interestedIn}</strong> {propertyName}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
      </div>

      <div>
        <label className={labelClasses}>{t.profile}</label>
        <select name="profile" className={inputClasses} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {t.profileOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>{t.interested}</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {t.interestOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" name="infoRequested" value={opt} className="h-4 w-4" />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClasses}>{t.message}</label>
        <textarea name="message" rows={3} maxLength={2000} className={inputClasses} />
      </div>

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </Button>
      {status === "success" && <p className="text-sm text-brand-700">{t.success}</p>}
      {status === "error" && <p className="text-sm text-red-600">{errorMessage || t.error}</p>}
    </form>
  );
}
