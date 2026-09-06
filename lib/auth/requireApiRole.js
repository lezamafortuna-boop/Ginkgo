import "server-only";
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getRole } from "./roles";

// Route-handler guard, mirroring requireRole() in roles.js but returning a
// ready-to-send 401/403 response instead of throwing, since route handlers
// don't have an error boundary to catch into.
export async function requireApiRole(allowedRoles) {
  const session = await auth0.getSession();
  if (!session) {
    return { error: NextResponse.json({ error: "No autenticado." }, { status: 401 }) };
  }
  const role = getRole(session);
  if (!role || !allowedRoles.includes(role)) {
    return { error: NextResponse.json({ error: "No autorizado." }, { status: 403 }) };
  }
  return { session, role };
}
