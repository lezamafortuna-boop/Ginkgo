import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { logActivity } from "@/lib/activityLog";
import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { buildRegionFieldsFromFormData } from "@/lib/sanity/regionFormData";

function revalidateRegionPaths(slug) {
  revalidatePath("/es");
  revalidatePath("/en");
  if (slug) {
    revalidatePath(`/es/regiones/${slug}`);
    revalidatePath(`/en/regions/${slug}`);
  }
}

export async function PUT(request, { params }) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await sanityWriteClient.fetch(`*[_id == $id][0]{ "slug": slug.current }`, { id });
  if (!existing) {
    return NextResponse.json({ error: "Región no encontrada." }, { status: 404 });
  }

  let fields;
  try {
    const formData = await request.formData();
    fields = await buildRegionFieldsFromFormData(formData);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Datos inválidos." }, { status: error.status || 400 });
  }

  await sanityWriteClient.patch(id).set(fields).commit();

  await logActivity(auth.session, "update", {
    type: "region",
    id,
    label: fields.name.es,
  });
  revalidateRegionPaths(existing.slug);
  if (fields.slug.current !== existing.slug) revalidateRegionPaths(fields.slug.current);

  return NextResponse.json({ id, slug: fields.slug.current });
}

export async function DELETE(request, { params }) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await sanityWriteClient.fetch(`*[_id == $id][0]{ "slug": slug.current, "label": name.es }`, {
    id,
  });
  if (!existing) {
    return NextResponse.json({ error: "Región no encontrada." }, { status: 404 });
  }

  await sanityWriteClient.delete(id);

  await logActivity(auth.session, "delete", {
    type: "region",
    id,
    label: existing.label,
  });
  revalidateRegionPaths(existing.slug);

  return NextResponse.json({ ok: true });
}
