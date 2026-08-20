"use client";

import { useState } from "react";
import Button from "./ui/Button";

const COPY = {
  es: {
    name: "Nombre",
    email: "Correo",
    phone: "Teléfono",
    company: "Empresa (opcional)",
    message: "Cuéntanos qué buscas (opcional)",
    submit: "Enviar solicitud",
    sending: "Enviando...",
    success: "Gracias. Hemos recibido tu solicitud y te contactaremos pronto.",
    error:
      "Hubo un problema al enviar tu solicitud. Inténtalo de nuevo o escríbenos directamente.",
  },
  en: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company (optional)",
    message: "Tell us what you're looking for (optional)",
    submit: "Submit request",
    sending: "Sending...",
    success: "Thank you. We've received your request and will be in touch soon.",
    error:
      "There was a problem sending your request. Please try again or email us directly.",
  },
};

const initialForm = { name: "", email: "", phone: "", company: "", message: "", website: "" };

export default function LeadForm({ locale = "es", source, id = "lead-form", className = "" }) {
  const t = COPY[locale] ?? COPY.es;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.website) return; // honeypot: real users never fill this hidden field

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
      if (!res.ok) throw new Error("Lead request failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-md border border-border bg-paper px-4 py-3 text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
  const labelClasses = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted";

  return (
    <form id={id} onSubmit={handleSubmit} className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${className}`}>
      {/* Honeypot field — invisible to real users, bots tend to fill every input they find */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor={`${id}-name`}>
          {t.name}
        </label>
        <input
          id={`${id}-name`}
          name="name"
          required
          maxLength={120}
          className={inputClasses}
          value={form.name}
          onChange={update("name")}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor={`${id}-email`}>
          {t.email}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          maxLength={200}
          className={inputClasses}
          value={form.email}
          onChange={update("email")}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor={`${id}-phone`}>
          {t.phone}
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          maxLength={40}
          className={inputClasses}
          value={form.phone}
          onChange={update("phone")}
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor={`${id}-company`}>
          {t.company}
        </label>
        <input
          id={`${id}-company`}
          name="company"
          maxLength={120}
          className={inputClasses}
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <div className="md:col-span-2">
        <label className={labelClasses} htmlFor={`${id}-message`}>
          {t.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={3}
          maxLength={2000}
          className={inputClasses}
          value={form.message}
          onChange={update("message")}
        />
      </div>

      <div className="md:col-span-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </Button>
        {status === "success" && <p className="mt-4 text-sm text-brand-700">{t.success}</p>}
        {status === "error" && <p className="mt-4 text-sm text-red-600">{t.error}</p>}
      </div>
    </form>
  );
}
