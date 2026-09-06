import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { CONTACT_EMAIL } from "@/lib/contact";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORM_TYPES = ["property_info", "sell_property", "search_property", "general"];

// Same basic in-memory rate limit as the old /api/lead endpoint — a
// deterrent against casual abuse, not a durable limiter.
const RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 8 };
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT.max;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

const str = (formData, key, max = 500) => (formData.get(key)?.toString().trim() || "").slice(0, max);

const FORM_TYPE_LABELS = {
  property_info: "A — Solicitar información",
  sell_property: "B — Promover propiedad",
  search_property: "C — Busco una propiedad",
  general: "D — Contacto general",
};

function buildLeadDoc(formData) {
  const formType = str(formData, "formType");
  if (!FORM_TYPES.includes(formType)) {
    throw Object.assign(new Error("Tipo de formulario inválido."), { status: 400 });
  }

  const name = str(formData, "name", 120);
  const lastName = str(formData, "lastName", 120);
  const email = str(formData, "email", 200);
  const phone = str(formData, "phone", 40);

  if (!name || !email || !phone || !EMAIL_RE.test(email)) {
    throw Object.assign(new Error("Nombre, correo y teléfono son obligatorios."), { status: 400 });
  }

  const doc = {
    _type: "lead",
    formType,
    status: "nuevo",
    name,
    lastName,
    email,
    phone,
    company: str(formData, "company", 120),
    message: str(formData, "message", 2000),
    sourcePage: str(formData, "sourcePage", 300),
    locale: str(formData, "locale", 5) || "es",
    utmSource: str(formData, "utmSource", 100),
    utmCampaign: str(formData, "utmCampaign", 100),
    createdAt: new Date().toISOString(),
  };

  if (formType === "property_info") {
    doc.profile = str(formData, "profile", 60);
    doc.infoRequested = formData.getAll("infoRequested").map((v) => v.toString()).slice(0, 20);
    doc.propertyName = str(formData, "propertyName", 120);
  }

  if (formType === "sell_property") {
    doc.propertyState = str(formData, "propertyState", 100);
    doc.propertyMunicipality = str(formData, "propertyMunicipality", 100);
    doc.propertyZone = str(formData, "propertyZone", 100);
    doc.propertySurface = str(formData, "propertySurface", 60);
    doc.propertyType = str(formData, "propertyType", 60);
    doc.propertyVocation = str(formData, "propertyVocation", 60);
    doc.ownerRelation = str(formData, "ownerRelation", 60);
    doc.desiredPrice = str(formData, "desiredPrice", 60);
    doc.hasDocumentation = formData.get("hasDocumentation") === "on";
  }

  if (formType === "search_property") {
    doc.lookingFor = str(formData, "lookingFor", 60);
    doc.regionOfInterest = str(formData, "regionOfInterest", 120);
    doc.surfaceNeeded = str(formData, "surfaceNeeded", 60);
    doc.developmentType = str(formData, "developmentType", 120);
    doc.budget = str(formData, "budget", 60);
    doc.purchaseHorizon = str(formData, "purchaseHorizon", 40);
  }

  if (formType === "general") {
    doc.contactReason = str(formData, "contactReason", 60);
  }

  return doc;
}

function summaryRows(doc) {
  const rows = [
    ["Formulario", FORM_TYPE_LABELS[doc.formType]],
    ["Nombre", `${doc.name} ${doc.lastName || ""}`.trim()],
    ["Correo", doc.email],
    ["Teléfono", doc.phone || "No proporcionado"],
    ["Empresa", doc.company || "No proporcionado"],
  ];

  if (doc.formType === "property_info") {
    rows.push(["Propiedad de interés", doc.propertyName || "—"]);
    rows.push(["Perfil", doc.profile || "—"]);
    rows.push(["Información solicitada", (doc.infoRequested || []).join(", ") || "—"]);
  }
  if (doc.formType === "sell_property") {
    rows.push(["Ubicación", [doc.propertyState, doc.propertyMunicipality, doc.propertyZone].filter(Boolean).join(", ") || "—"]);
    rows.push(["Superficie", doc.propertySurface || "—"]);
    rows.push(["Tipo de propiedad", doc.propertyType || "—"]);
    rows.push(["Vocación", doc.propertyVocation || "—"]);
    rows.push(["Situación", doc.ownerRelation || "—"]);
    rows.push(["Precio pretendido", doc.desiredPrice || "No proporcionado"]);
  }
  if (doc.formType === "search_property") {
    rows.push(["Busca", doc.lookingFor || "—"]);
    rows.push(["Región de interés", doc.regionOfInterest || "—"]);
    rows.push(["Superficie", doc.surfaceNeeded || "—"]);
    rows.push(["Tipo de desarrollo", doc.developmentType || "—"]);
    rows.push(["Presupuesto", doc.budget || "No proporcionado"]);
    rows.push(["Horizonte de compra", doc.purchaseHorizon || "—"]);
  }
  if (doc.formType === "general") {
    rows.push(["Motivo", doc.contactReason || "—"]);
  }

  rows.push(["Mensaje", doc.message || "No proporcionado"]);
  return rows;
}

const AUTOREPLY = {
  property_info: {
    es: {
      subject: "Gracias por tu interés — Ginkgo",
      body: "Gracias por tu interés. Hemos recibido tu solicitud y un asesor de Ginkgo se pondrá en contacto contigo para compartirte la información correspondiente a esta oportunidad.",
    },
    en: {
      subject: "Thank you for your interest — Ginkgo",
      body: "Thank you for your interest. We've received your request and a Ginkgo advisor will reach out with information about this opportunity.",
    },
  },
  sell_property: {
    es: {
      subject: "Hemos recibido tu propiedad — Ginkgo",
      body: "Gracias por compartir tu propiedad con Ginkgo. Nuestro equipo revisará la información proporcionada y, si la oportunidad se ajusta a nuestro perfil de comercialización, nos pondremos en contacto contigo para conocerla a mayor detalle.",
    },
    en: {
      subject: "We've received your property — Ginkgo",
      body: "Thank you for sharing your property with Ginkgo. Our team will review the information provided and, if it fits our commercialization profile, we'll reach out to learn more.",
    },
  },
  search_property: {
    es: {
      subject: "Gracias por contactar a Ginkgo",
      body: "Hemos recibido tu búsqueda. Un asesor de Ginkgo revisará tus criterios y te contactará con oportunidades alineadas a lo que buscas.",
    },
    en: {
      subject: "Thank you for contacting Ginkgo",
      body: "We've received your search request. A Ginkgo advisor will review your criteria and reach out with aligned opportunities.",
    },
  },
  general: {
    es: {
      subject: "Gracias por contactar a Ginkgo",
      body: "Hemos recibido tu mensaje y te contactaremos pronto.",
    },
    en: {
      subject: "Thank you for contacting Ginkgo",
      body: "We've received your message and will be in touch soon.",
    },
  },
};

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Inténtalo más tarde." }, { status: 429 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  // Honeypot — real visitors never fill this hidden field.
  if (str(formData, "website")) {
    return NextResponse.json({ success: true });
  }

  let doc;
  try {
    doc = buildLeadDoc(formData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 400 });
  }

  const propertySlug = str(formData, "propertySlug");
  if (doc.formType === "property_info" && propertySlug) {
    const propertyId = await sanityWriteClient
      .fetch(`*[_type == "opportunity" && slug.current == $slug][0]._id`, { slug: propertySlug })
      .catch(() => null);
    if (propertyId) doc.property = { _type: "reference", _ref: propertyId };
  }

  const attachment = formData.get("attachment");
  if (doc.formType === "sell_property" && attachment instanceof File && attachment.size > 0) {
    try {
      const asset = await sanityWriteClient.assets.upload("file", attachment, { filename: attachment.name });
      doc.attachment = { _type: "file", asset: { _type: "reference", _ref: asset._id } };
    } catch (error) {
      console.error("Lead attachment upload failed (lead still saved without it):", error);
    }
  }

  try {
    await sanityWriteClient.create(doc);
  } catch (error) {
    console.error("Failed to save lead to Sanity:", error);
    return NextResponse.json({ error: "No se pudo guardar tu solicitud." }, { status: 500 });
  }

  if (resend) {
    try {
      const rows = summaryRows(doc);
      const { error: sendError } = await resend.emails.send({
        from: "Ginkgo Leads <leads@ginkgomx.com>",
        to: CONTACT_EMAIL,
        subject: `Nuevo lead (${FORM_TYPE_LABELS[doc.formType]})`,
        html: `<h2>Nuevo Lead</h2>${rows
          .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`)
          .join("")}`,
      });
      if (sendError) throw sendError;
    } catch (error) {
      console.error("Lead notification email failed (lead was still captured):", error);
    }

    try {
      const isSpanish = doc.locale !== "en";
      const template = AUTOREPLY[doc.formType][isSpanish ? "es" : "en"];
      const { error: replyError } = await resend.emails.send({
        from: "Ginkgo <leads@ginkgomx.com>",
        to: doc.email,
        subject: template.subject,
        html: `<h2>${isSpanish ? "Hola" : "Hello"} ${escapeHtml(doc.name)},</h2><p>${template.body}</p><br/><p>— ${isSpanish ? "Equipo Ginkgo" : "Ginkgo Team"}</p>`,
      });
      if (replyError) throw replyError;
    } catch (error) {
      console.error("Lead auto-reply failed (lead was still captured):", error);
    }
  }

  return NextResponse.json({ success: true });
}
