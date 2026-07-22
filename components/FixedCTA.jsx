"use client";

import { usePathname } from "next/navigation";

export default function FixedCTA() {
  const pathname = usePathname();

  const isSpanish = pathname.startsWith("/es");

  const target = isSpanish
    ? "/es/contacto#formulario"
    : "/en/contact#formEN";

  return (
    <a
      href={target}
      className="fixed bottom-6 right-6 bg-[#C9A86A] text-black font-semibold px-5 py-3 rounded shadow-lg z-50 hover:bg-[#e6c98a] transition"
    >
      {isSpanish ? "Solicitar información" : "Request Information"}
    </a>
  );
}
