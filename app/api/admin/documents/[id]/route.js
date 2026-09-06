import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { logActivity } from "@/lib/activityLog";
import { sanityWriteClient } from "@/lib/sanity/writeClient";

export async function DELETE(request, { params }) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await sanityWriteClient.fetch(
    `*[_id == $id][0]{
      title,
      "propertySlug": property->slug.current,
      "regionSlug": region->slug.current
    }`,
    { id }
  );
  if (!existing) {
    return NextResponse.json({ error: "Documento no encontrado." }, { status: 404 });
  }

  await sanityWriteClient.delete(id);

  await logActivity(auth.session, "delete", { type: "document", id, label: existing.title });

  if (existing.propertySlug) {
    revalidatePath(`/es/oportunidades/${existing.propertySlug}`);
    revalidatePath(`/en/opportunities/${existing.propertySlug}`);
  }
  if (existing.regionSlug) {
    revalidatePath(`/es/regiones/${existing.regionSlug}`);
    revalidatePath(`/en/regions/${existing.regionSlug}`);
  }

  return NextResponse.json({ ok: true });
}
