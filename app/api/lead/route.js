import { NextResponse } from "next/server";
import { Resend } from "resend";

// Constructed lazily (not at module scope) so a missing RESEND_API_KEY fails
// a single request with a clean 500 instead of crashing the entire build —
// the Resend constructor throws synchronously if no key is passed.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SOURCE_RE = /^(ES|EN) - .{1,60}$/;

// Simple in-memory rate limit. Resets on cold start / per-instance, so this
// is a basic deterrent against casual abuse, not a durable limiter — a real
// limiter (Upstash/Redis) is needed if this endpoint gets targeted.
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

function validate(body) {
  const errors = [];
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "";
  const company = typeof body.company === "string" ? body.company.trim().slice(0, 120) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";

  if (!name || name.length > 120) errors.push("name");
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) errors.push("email");
  if (!source || !VALID_SOURCE_RE.test(source)) errors.push("source");

  return { errors, data: { name, email, phone, company, message, source } };
}

export async function POST(req) {
  if (!resend) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json({ error: "Servicio de correo no configurado." }, { status: 500 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo más tarde." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Silently succeed
  // so bots don't learn their submission was rejected.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { errors, data } = validate(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Nombre, correo y origen son obligatorios y deben ser válidos.", fields: errors },
      { status: 400 }
    );
  }

  const { name, email, phone, company, message, source } = data;

  try {
    // 1. Notify Ginkgo — if this fails, the lead was never captured, so it's a real 500.
    // The Resend SDK resolves with `{ data, error }` on API-level failures (e.g. an
    // invalid key or unverified sending domain) instead of throwing — only genuine
    // network/exception failures land in the catch block, so both must be checked.
    const { error: sendError } = await resend.emails.send({
      from: "Ginkgo Leads <leads@ginkgomx.com>",
      to: "tonatiuhcervantes@ginkgomx.com",
      subject: `Nuevo Lead desde Ginkgo (${source})`,
      html: `
        <h2>Nuevo Lead</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone) || "No proporcionado"}</p>
        <p><strong>Empresa:</strong> ${escapeHtml(company) || "No proporcionado"}</p>
        <p><strong>Mensaje:</strong> ${escapeHtml(message) || "No proporcionado"}</p>
        <p><strong>Origen:</strong> ${escapeHtml(source)}</p>
      `,
    });
    if (sendError) throw sendError;
  } catch (error) {
    console.error("Lead notification failed:", error);
    return NextResponse.json({ error: "Error al enviar el lead." }, { status: 500 });
  }

  // 2. Auto-reply to the user — best-effort. The lead is already captured above,
  // so a failure here shouldn't tell the visitor their request failed.
  try {
    const isSpanish = source.startsWith("ES");
    const subject = isSpanish ? "Gracias por contactar a Ginkgo" : "Thank you for contacting Ginkgo";
    const html = isSpanish
      ? `
        <h2>Hola ${escapeHtml(name)},</h2>
        <p>Gracias por ponerte en contacto con Ginkgo.</p>
        <p>Hemos recibido tu solicitud y uno de nuestros especialistas revisará tu información para presentarte oportunidades alineadas con tu perfil.</p>
        <p>Te responderemos muy pronto.</p>
        <br/>
        <p>— Equipo Ginkgo</p>
      `
      : `
        <h2>Hello ${escapeHtml(name)},</h2>
        <p>Thank you for reaching out to Ginkgo.</p>
        <p>We have received your request and one of our specialists will review your information to present opportunities aligned with your profile.</p>
        <p>We will get back to you shortly.</p>
        <br/>
        <p>— Ginkgo Team</p>
      `;

    const { error: replyError } = await resend.emails.send({
      from: "Ginkgo <leads@ginkgomx.com>",
      to: email,
      subject,
      html,
    });
    if (replyError) throw replyError;
  } catch (error) {
    console.error("Auto-reply failed (lead was still captured):", error);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
