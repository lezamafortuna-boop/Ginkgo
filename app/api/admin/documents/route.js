import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { logActivity } from "@/lib/activityLog";
import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { buildDocumentFieldsFromFormData } from "@/lib/sanity/documentFormData";

async function revalidateForRefs(fields) {
  if (fields.property) {
    const slug = await sanityWriteClient.fetch(`*[_id == $id][0].slug.current`, { id: fields.property._ref });
    if (slug) {
      revalidatePath(`/es/oportunidades/${slug}`);
      revalidatePath(`/en/opportunities/${slug}`);
    }
  }
  if (fields.region) {
    const slug = await sanityWriteClient.fetch(`*[_id == $id][0].slug.current`, { id: fields.region._ref });
    if (slug) {
      revalidatePath(`/es/regiones/${slug}`);
      revalidatePath(`/en/regions/${slug}`);
    }
  }
}

export async function POST(request) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;

  let fields;
  try {
    const formData = await request.formData();
    fields = await buildDocumentFieldsFromFormData(formData);
  } catch (error) {
    return NextResponse.json({ error: error.message || "Datos inválidos." }, { status: error.status || 400 });
  }

  const doc = await sanityWriteClient.create({ _type: "siteDocument", ...fields });

  await logActivity(auth.session, "create", { type: "document", id: doc._id, label: fields.title });
  await revalidateForRefs(fields);

  return NextResponse.json({ id: doc._id }, { status: 201 });
}
