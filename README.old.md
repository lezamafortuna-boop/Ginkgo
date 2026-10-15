# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

Perfect Luis — aquí tienes un **Lead API endpoint profesional**, listo para producción, compatible con Next.js App Router, y funcionando para **todos tus formularios ES + EN**.

Este endpoint:

- Recibe leads desde cualquier formulario del sitio
- Valida datos
- Envía el lead por email (via Resend) **o** lo guarda en tu CRM (si luego quieres integrar HubSpot / Airtable / Notion / Sanity)
- Funciona con `/app/api/lead/route.js`
- Es seguro, limpio y escalable

Y como siempre: **no omito nada, ES + EN funcionan igual** porque el endpoint es universal.

---

# ⭐ 1. Lead API Endpoint

### 📁 `app/api/lead/route.js`

Este endpoint usa **Resend** para enviar leads por correo.  
Si no usas Resend, te lo cambio por SendGrid, Nodemailer o tu CRM.

```js
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
        { status: 400 },
      );
    }

    // Send email
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

    return NextResponse.json(
      { success: true, message: "Lead enviado correctamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lead error:", error);
    return NextResponse.json(
      { error: "Error al enviar el lead." },
      { status: 500 },
    );
  }
}
```

---

# ⭐ 2. Cómo enviar leads desde cualquier formulario (ES + EN)

### 📁 Ejemplo para formularios ES

```jsx
async function handleSubmit(e) {
  e.preventDefault();

  const formData = {
    name,
    email,
    phone,
    company,
    message,
    source: "ES - Contacto",
  };

  await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  alert("Solicitud enviada correctamente.");
}
```

---

### 📁 Ejemplo para formularios EN

```jsx
async function handleSubmit(e) {
  e.preventDefault();

  const formData = {
    name,
    email,
    phone,
    company,
    message,
    source: "EN - Contact",
  };

  await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  alert("Request sent successfully.");
}
```

---

# ⭐ 3. Cómo integrarlo en tus formularios actuales

Tus formularios ya están listos.  
Solo agrega:

```jsx
onSubmit = { handleSubmit };
```

Y los estados:

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [company, setCompany] = useState("");
const [message, setMessage] = useState("");
```

Y en cada input:

```jsx
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
  ...
/>
```

---

# ⭐ 4. Activar Resend

En tu `.env.local`:

```
RESEND_API_KEY=tu_api_key_aqui
```

Si quieres, puedo generar:

- Plantilla de email premium
- Integración con SendGrid
- Integración con HubSpot CRM
- Integración con Airtable
- Integración con Notion
- Guardar leads en tu base de datos (MongoDB)

---

# 🎉 LISTO

Luis, ya tienes un **Lead API endpoint profesional**, bilingüe, escalable y listo para producción.

---

Perfect Luis — aquí tienes **Auto‑reply email (ES + EN)** totalmente integrado con tu Lead API endpoint, listo para producción, elegante, bilingüe y profesional.

⚠️ **No cambia nada del endpoint actual**, solo añadimos una segunda llamada a Resend para enviar el correo de confirmación al usuario.

Y como siempre: **te entrego ES + EN completos, sin omitir nada.**

---

# ⭐ 1. Auto‑reply email (ES + EN) integrado en tu Lead API

### 📁 `app/api/lead/route.js` (versión completa actualizada)

```js
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
        { status: 400 },
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
      { status: 200 },
    );
  } catch (error) {
    console.error("Lead error:", error);
    return NextResponse.json(
      { error: "Error al enviar el lead." },
      { status: 500 },
    );
  }
}
```

---

# ⭐ 2. ¿Qué hace este auto‑reply?

### ✔ Detecta automáticamente si el lead viene de ES o EN

Usando:

```js
const isSpanish = source.startsWith("ES");
```

### ✔ Envía un correo profesional al usuario

- En español si viene de `/es/...`
- En inglés si viene de `/en/...`

### ✔ Mantiene el branding premium de Ginkgo

- Tono consultivo
- Elegante
- Claro
- Profesional

### ✔ No afecta el envío del lead al correo del cliente

El lead sigue llegando a:

```
tonatiuhcervantes@ginkgomx.com
```

---

# ⭐ 3. ¿Debes cambiar algo en tus formularios?

Solo agrega el campo `source`:

### ES

```js
source: "ES - Contacto";
```

### EN

```js
source: "EN - Contact";
```

Todo lo demás ya funciona.

---

# 🎉 LISTO

Luis, ya tienes:

✔ Lead API endpoint  
✔ Auto‑reply email ES  
✔ Auto‑reply email EN  
✔ Detección automática del idioma  
✔ Integración con Resend  
✔ Código completo listo para pegar

---

## ¿Qué quieres que prepare ahora?

Opciones recomendadas:

### ✔ Sanity CMS integration (o Airtable / Notion / MongoDB)

### ✔ Global SEO metadata (ES + EN)

### ✔ Sitemap + robots.txt

### ✔ Deployment structure (Vercel)

### ✔ Anti‑spam protection (honeypot + rate limit)

Dime cuál sigue.
