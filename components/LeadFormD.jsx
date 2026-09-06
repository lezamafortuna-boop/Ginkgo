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
    reason: "Motivo del contacto",
    reasonOptions: [
      "Quiero invertir",
      "Soy desarrollador",
      "Tengo una propiedad",
      "Busco una propiedad",
      "Alianza comercial",
      "Servicios inmobiliarios",
      "Otro",
    ],
    message: "Mensaje",
    submit: "Enviar mensaje",
    sending: "Enviando...",
    success: "Gracias. Hemos recibido tu mensaje y te contactaremos pronto.",
    error: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente.",
  },
  en: {
    name: "Name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone / WhatsApp",
    reason: "Reason for contact",
    reasonOptions: [
      "I want to invest",
      "I'm a developer",
      "I have a property",
      "I'm looking for a property",
      "Business partnership",
      "Real estate services",
      "Other",
    ],
    message: "Message",
    submit: "Send message",
    sending: "Sending...",
    success: "Thank you. We've received your message and will be in touch soon.",
    error: "There was a problem sending your message. Please try again or email us directly.",
  },
};

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-4 py-3 text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

export default function LeadFormD({ locale = "es", id = "lead-d" }) {
  const t = COPY[locale] ?? COPY.es;
  const pathname = usePathname();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("website")) return;

    setStatus("sending");
    formData.set("formType", "general");
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
        <label className={labelClasses}>{t.reason}</label>
        <select name="contactReason" className={inputClasses} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {t.reasonOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>{t.message}</label>
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
