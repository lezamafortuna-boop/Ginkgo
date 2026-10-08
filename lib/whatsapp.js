const GENERIC_ES = "Hola, me interesa recibir información sobre las oportunidades de Ginkgo.";
const GENERIC_EN = "Hi, I'm interested in learning more about Ginkgo's opportunities.";

export const GENERIC_MESSAGE = { es: GENERIC_ES, en: GENERIC_EN };

// Asks the server for the "Hola, me interesa recibir información sobre {X}."
// message matching the page the visitor is on. The lookup happens server-side
// (/api/whatsapp-message): reading Sanity straight from the browser is blocked
// by CORS unless every site origin is whitelisted in the Sanity project.
export async function getContextualWhatsappMessage(pathname) {
  const isSpanish = pathname.startsWith("/es");
  try {
    const res = await fetch(`/api/whatsapp-message?path=${encodeURIComponent(pathname)}`);
    if (res.ok) {
      const { message } = await res.json();
      if (message) return message;
    }
  } catch {}
  return isSpanish ? GENERIC_ES : GENERIC_EN;
}

export function buildWhatsappUrl(phoneDigits, message) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}
