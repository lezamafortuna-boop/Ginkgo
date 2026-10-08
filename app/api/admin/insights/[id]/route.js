import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { logActivity } from "@/lib/activityLog";
import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { assertInsightSlugAvailable, buildInsightFieldsFromFormData } from "@/lib/sanity/insightFormData";

function revalidateInsightPaths(slug) {
  revalidatePath("/es/insights");
  revalidatePath("/en/insights");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/es/insights/${slug}`);
    revalidatePath(`/en/insights/${slug}`);
  }
}

export async function PUT(request, { params }) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await sanityWriteClient.fetch(`*[_type == "insight" && _id == $id][0]{ "slug": slug.current }`, { id });
  if (!existing) {
    return NextResponse.json({ error: "Artículo no encontrado." }, { status: 404 });
  }

  let fields;
  try {
    const formData = await request.formData();
    fields = await buildInsightFieldsFromFormData(formData);
    await assertInsightSlugAvailable(fields.slug.current, id);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Datos inválidos." }, { status: error.status || 400 });
  }

  await sanityWriteClient.patch(id).set(fields).commit();

  await logActivity(auth.session, "update", { type: "insight", id, label: fields.title.es });
  revalidateInsightPaths(existing.slug);
  if (fields.slug.current !== existing.slug) revalidateInsightPaths(fields.slug.current);

  return NextResponse.json({ id, slug: fields.slug.current });
}

export async function DELETE(request, { params }) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await sanityWriteClient.fetch(
    `*[_type == "insight" && _id == $id][0]{ "slug": slug.current, "label": title.es }`,
    { id }
  );
  if (!existing) {
    return NextResponse.json({ error: "Artículo no encontrado." }, { status: 404 });
  }

  await sanityWriteClient.delete(id);

  await logActivity(auth.session, "delete", { type: "insight", id, label: existing.label });
  revalidateInsightPaths(existing.slug);

  return NextResponse.json({ ok: true });
}
