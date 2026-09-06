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

export async function POST(request) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;

  let fields;
  try {
    const formData = await request.formData();
    fields = await buildRegionFieldsFromFormData(formData);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Datos inválidos." }, { status: error.status || 400 });
  }

  const doc = await sanityWriteClient.create({ _type: "region", ...fields });

  await logActivity(auth.session, "create", {
    type: "region",
    id: doc._id,
    label: fields.name.es,
  });
  revalidateRegionPaths(fields.slug.current);

  return NextResponse.json({ id: doc._id, slug: fields.slug.current }, { status: 201 });
}
