import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      company,
      message,
      source, // ES or EN page
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y correo son obligatorios." },
        { status: 400 }
      );
    }

    // 1️⃣ SEND LEAD TO GINKGO
    await resend.emails.send({
      from: "Ginkgo Leads <leads@ginkgomx.com>",
      to: "tonatiuhcervantes@ginkgomx.com",
      subject: `Nuevo Lead desde Ginkgo (${source})`,
      html: `
        <h2>Nuevo Lead</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Empresa:</strong> ${company || "No proporcionado"}</p>
        <p><strong>Mensaje:</strong> ${message || "No proporcionado"}</p>
        <p><strong>Origen:</strong> ${source}</p>
      `,
    });

    // 2️⃣ AUTO‑REPLY TO USER (ES + EN)
    const isSpanish = source.startsWith("ES");

    const subject = isSpanish
      ? "Gracias por contactar a Ginkgo"
      : "Thank you for contacting Ginkgo";

    const html = isSpanish
      ? `
        <h2>Hola ${name},</h2>
        <p>Gracias por ponerte en contacto con Ginkgo.</p>
        <p>Hemos recibido tu solicitud y uno de nuestros especialistas revisará tu información para presentarte oportunidades alineadas con tu perfil.</p>
        <p>Te responderemos muy pronto.</p>
        <br/>
        <p>— Equipo Ginkgo</p>
      `
      : `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to Ginkgo.</p>
        <p>We have received your request and one of our specialists will review your information to present opportunities aligned with your profile.</p>
        <p>We will get back to you shortly.</p>
        <br/>
        <p>— Ginkgo Team</p>
      `;

    await resend.emails.send({
      from: "Ginkgo <leads@ginkgomx.com>",
      to: email,
      subject,
      html,
    });

    return NextResponse.json(
      { success: true, message: "Lead enviado y auto‑reply enviado." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead error:", error);
    return NextResponse.json(
      { error: "Error al enviar el lead." },
      { status: 500 }
    );
  }
}
