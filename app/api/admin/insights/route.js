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

export async function POST(request) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;

  let fields;
  try {
    const formData = await request.formData();
    fields = await buildInsightFieldsFromFormData(formData);
    await assertInsightSlugAvailable(fields.slug.current);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Datos inválidos." }, { status: error.status || 400 });
  }

  const doc = await sanityWriteClient.create({ _type: "insight", ...fields });

  await logActivity(auth.session, "create", { type: "insight", id: doc._id, label: fields.title.es });
  revalidateInsightPaths(fields.slug.current);

  return NextResponse.json({ id: doc._id, slug: fields.slug.current }, { status: 201 });
}
