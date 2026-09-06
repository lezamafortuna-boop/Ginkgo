import { NextResponse } from "next/server";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { sanityWriteClient } from "@/lib/sanity/writeClient";

const VALID_STATUSES = ["nuevo", "contactado", "seguimiento", "cerrado", "descartado"];

export async function PATCH(request, { params }) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;
  const { id } = await params;

  const body = await request.json().catch(() => ({}));
  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
  }

  await sanityWriteClient.patch(id).set({ status: body.status }).commit();
  return NextResponse.json({ ok: true });
}
