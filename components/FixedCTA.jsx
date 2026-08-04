"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FixedCTA() {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith("/es");
  const target = isSpanish ? "/es/contacto#formulario" : "/en/contact#formEN";

  return (
    <Link
      href={target}
      className="fixed bottom-6 right-6 z-50 rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-teal-700"
    >
      {isSpanish ? "Solicitar información" : "Request Information"}
    </Link>
  );
}
