import { NextResponse } from "next/server";
import { resolveWhatsappMessage } from "@/lib/whatsappServer";

// Public, read-only: returns the prefilled WhatsApp text for a site path.
export async function GET(request) {
  const path = new URL(request.url).searchParams.get("path") || "/es";
  if (!path.startsWith("/") || path.length > 200) {
    return NextResponse.json({ message: null }, { status: 400 });
  }
  return NextResponse.json({ message: await resolveWhatsappMessage(path) });
}
