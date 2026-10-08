// Validates and normalises the Configuración form. Rules mirror
// studio/schemaTypes/documents/siteSettings.ts.
function clean(formData, key) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function fail(message) {
  const error = new Error(message);
  error.status = 400;
  throw error;
}

function assertHttpUrl(value, label) {
  if (!value) return;
  let url;
  try {
    url = new URL(value);
  } catch {
    fail(`${label}: escribe una URL completa (https://...).`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") fail(`${label}: la URL debe empezar con https://`);
}

export function buildSettingsFromFormData(formData) {
  // Accept "+52 442 508 8204" style input; store digits only.
  const whatsappNumber = clean(formData, "whatsappNumber").replace(/[\s\-().+]/g, "");
  const phoneDisplay = clean(formData, "phoneDisplay");
  const email = clean(formData, "email");
  const instagramUrl = clean(formData, "instagramUrl");
  const linkedinUrl = clean(formData, "linkedinUrl");
  const address = clean(formData, "address");

  if (!/^\d{8,15}$/.test(whatsappNumber)) {
    fail("WhatsApp: escribe solo el número con código de país (de 8 a 15 dígitos), por ejemplo 524425088204.");
  }
  if (!phoneDisplay) fail("Teléfono para mostrar: es obligatorio.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail("Correo: escribe un correo válido.");
  assertHttpUrl(instagramUrl, "Instagram");
  assertHttpUrl(linkedinUrl, "LinkedIn");

  return { whatsappNumber, phoneDisplay, email, instagramUrl, linkedinUrl, address };
}
