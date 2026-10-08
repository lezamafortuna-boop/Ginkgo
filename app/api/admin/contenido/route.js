import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { logActivity } from "@/lib/activityLog";
import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { SLOT_BY_KEY } from "@/lib/siteContentCatalog";
import { CONTENT_DOC_ID } from "@/lib/siteContent";

const MAX_LENGTH = 3000;

// Saves the editable site texts. Body: { texts: { "<key>": { es, en } } }.
// Only texts that differ from the original are stored, so clearing a field (or
// typing the original text back) restores the default.
export async function PUT(request) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }
  const input = body?.texts;
  if (!input || typeof input !== "object") {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const texts = [];
  for (const [key, value] of Object.entries(input)) {
    const slot = SLOT_BY_KEY[key];
    if (!slot) return NextResponse.json({ error: `Texto desconocido: ${key}` }, { status: 400 });
    const es = typeof value?.es === "string" ? value.es.trim() : "";
    const en = typeof value?.en === "string" ? value.en.trim() : "";
    if (es.length > MAX_LENGTH || en.length > MAX_LENGTH) {
      return NextResponse.json({ error: `"${slot.label}" es demasiado largo (máximo ${MAX_LENGTH} caracteres).` }, { status: 400 });
    }
    const esOverride = es && es !== slot.es ? es : "";
    const enOverride = en && en !== slot.en ? en : "";
    if (esOverride || enOverride) {
      texts.push({ _key: key.replace(/\./g, "-"), key, es: esOverride, en: enOverride });
    }
  }

  await sanityWriteClient
    .transaction()
    .createIfNotExists({ _id: CONTENT_DOC_ID, _type: "siteContent" })
    .patch(CONTENT_DOC_ID, (p) => p.set({ texts }))
    .commit();

  await logActivity(auth.session, "update", { type: "siteContent", id: CONTENT_DOC_ID, label: "Contenido del sitio" });
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, customized: texts.length });
}
