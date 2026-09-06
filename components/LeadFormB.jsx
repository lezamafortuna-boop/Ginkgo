"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";
import { getUtmParams, submitLead } from "@/lib/leadClient";

const COPY = {
  es: {
    name: "Nombre",
    lastName: "Apellido",
    company: "Empresa (opcional)",
    email: "Correo",
    phone: "Teléfono / WhatsApp",
    state: "Estado",
    municipality: "Municipio / ciudad",
    zone: "Zona / localidad",
    surface: "Superficie aproximada",
    propertyType: "Tipo de propiedad",
    propertyTypeOptions: ["Terreno", "Macrolote", "Rancho / extensión territorial", "Propiedad para desarrollo", "Otro"],
    vocation: "Uso o vocación actual / potencial",
    vocationOptions: ["Habitacional", "Comercial", "Industrial", "Turístico", "Mixto", "Otro"],
    ownerRelation: "Situación de la propiedad",
    ownerRelationOptions: ["Propietario directo", "Representante del propietario", "Broker / asesor", "Otro"],
    desiredPrice: "Precio pretendido (opcional)",
    description: "Breve descripción de la propiedad",
    hasDocumentation: "¿Cuenta con documentación disponible?",
    attachment: "Adjuntar información / ficha / presentación (opcional)",
    disclaimer:
      "Este formulario no implica la aceptación automática de la propiedad — nuestro equipo la evaluará antes de dar seguimiento.",
    submit: "Enviar propiedad para evaluación",
    sending: "Enviando...",
    success:
      "Gracias por compartir tu propiedad con Ginkgo. Nuestro equipo revisará la información y, si se ajusta a nuestro perfil, te contactaremos.",
    error: "Hubo un problema al enviar tu propiedad. Inténtalo de nuevo o escríbenos directamente.",
  },
  en: {
    name: "Name",
    lastName: "Last name",
    company: "Company (optional)",
    email: "Email",
    phone: "Phone / WhatsApp",
    state: "State",
    municipality: "Municipality / city",
    zone: "Zone / area",
    surface: "Approximate surface",
    propertyType: "Property type",
    propertyTypeOptions: ["Land", "Macrolote", "Ranch / large tract", "Development property", "Other"],
    vocation: "Current / potential use",
    vocationOptions: ["Residential", "Commercial", "Industrial", "Tourism", "Mixed-use", "Other"],
    ownerRelation: "Your relationship to the property",
    ownerRelationOptions: ["Direct owner", "Owner's representative", "Broker / advisor", "Other"],
    desiredPrice: "Asking price (optional)",
    description: "Brief description of the property",
    hasDocumentation: "Do you have documentation available?",
    attachment: "Attach information / sheet / presentation (optional)",
    disclaimer:
      "Submitting this form doesn't mean automatic acceptance — our team will evaluate it before following up.",
    submit: "Submit property for evaluation",
    sending: "Sending...",
    success:
      "Thank you for sharing your property with Ginkgo. Our team will review it and reach out if it fits our profile.",
    error: "There was a problem submitting your property. Please try again or email us directly.",
  },
};

const inputClasses =
  "w-full rounded-md border border-border bg-paper px-4 py-3 text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

export default function LeadFormB({ locale = "es", id = "lead-b" }) {
  const t = COPY[locale] ?? COPY.es;
  const pathname = usePathname();
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("website")) return;

    setStatus("sending");
    formData.set("formType", "sell_property");
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
        <label className={labelClasses}>{t.company}</label>
        <input name="company" maxLength={120} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.email}</label>
        <input name="email" type="email" required maxLength={200} className={inputClasses} />
      </div>
      <div className="md:col-span-2">
        <label className={labelClasses}>{t.phone}</label>
        <input name="phone" type="tel" required maxLength={40} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>{t.state}</label>
        <input name="propertyState" maxLength={100} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.municipality}</label>
        <input name="propertyMunicipality" maxLength={100} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.zone}</label>
        <input name="propertyZone" maxLength={100} className={inputClasses} />
      </div>
      <div>
        <label className={labelClasses}>{t.surface}</label>
        <input name="propertySurface" maxLength={60} className={inputClasses} />
      </div>

      <div>
        <label className={labelClasses}>{t.propertyType}</label>
        <select name="propertyType" className={inputClasses} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {t.propertyTypeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClasses}>{t.vocation}</label>
        <select name="propertyVocation" className={inputClasses} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {t.vocationOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>{t.ownerRelation}</label>
        <select name="ownerRelation" className={inputClasses} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {t.ownerRelationOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClasses}>{t.desiredPrice}</label>
        <input name="desiredPrice" maxLength={60} className={inputClasses} />
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses}>{t.description}</label>
        <textarea name="message" required rows={3} maxLength={2000} className={inputClasses} />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink md:col-span-2">
        <input type="checkbox" name="hasDocumentation" className="h-4 w-4" />
        {t.hasDocumentation}
      </label>

      <div className="md:col-span-2">
        <label className={labelClasses}>{t.attachment}</label>
        <input type="file" name="attachment" className={inputClasses} />
      </div>

      <p className="md:col-span-2 text-xs text-muted">{t.disclaimer}</p>

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
