import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { logActivity } from "@/lib/activityLog";
import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { buildOpportunityFieldsFromFormData } from "@/lib/sanity/propertyFormData";

function revalidateOpportunityPaths(slug) {
  revalidatePath("/es/oportunidades");
  revalidatePath("/en/opportunities");
  if (slug) {
    revalidatePath(`/es/oportunidades/${slug}`);
    revalidatePath(`/en/opportunities/${slug}`);
  }
}

export async function PUT(request, { params }) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await sanityWriteClient.fetch(`*[_id == $id][0]{ "slug": slug.current }`, { id });
  if (!existing) {
    return NextResponse.json({ error: "Propiedad no encontrada." }, { status: 404 });
  }

  let fields;
  try {
    const formData = await request.formData();
    fields = await buildOpportunityFieldsFromFormData(formData);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Datos inválidos." }, { status: error.status || 400 });
  }

  const toSet = {};
  const toUnset = [];
  for (const [key, value] of Object.entries(fields)) {
    if (value === null) toUnset.push(key);
    else toSet[key] = value;
  }

  let patch = sanityWriteClient.patch(id).set(toSet);
  if (toUnset.length > 0) patch = patch.unset(toUnset);
  await patch.commit();

  await logActivity(auth.session, "update", {
    type: "opportunity",
    id,
    label: fields.name.es,
  });
  revalidateOpportunityPaths(existing.slug);
  if (fields.slug.current !== existing.slug) revalidateOpportunityPaths(fields.slug.current);

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
    return NextResponse.json({ error: "Propiedad no encontrada." }, { status: 404 });
  }

  await sanityWriteClient.delete(id);

  await logActivity(auth.session, "delete", {
    type: "opportunity",
    id,
    label: existing.label,
  });
  revalidateOpportunityPaths(existing.slug);

  return NextResponse.json({ ok: true });
}
