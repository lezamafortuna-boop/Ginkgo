import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { logActivity } from "@/lib/activityLog";
import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { buildSettingsFromFormData } from "@/lib/sanity/settingsFormData";
import { SETTINGS_DOC_ID } from "@/lib/siteSettings";

// Saves the single siteSettings document (admins only).
export async function PUT(request) {
  const auth = await requireApiRole([ROLES.ADMIN]);
  if (auth.error) return auth.error;

  let fields;
  try {
    fields = buildSettingsFromFormData(await request.formData());
  } catch (error) {
    return NextResponse.json({ error: error.message || "Datos inválidos." }, { status: error.status || 400 });
  }

  await sanityWriteClient.createOrReplace({ _id: SETTINGS_DOC_ID, _type: "siteSettings", ...fields });

  await logActivity(auth.session, "update", { type: "siteSettings", id: SETTINGS_DOC_ID, label: "Configuración" });
  // Contact details appear in the footer/floating button of every page.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
