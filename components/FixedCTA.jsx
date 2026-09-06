"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./ui/icons";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { buildWhatsappUrl, getContextualWhatsappMessage, GENERIC_MESSAGE } from "@/lib/whatsapp";

export default function FixedCTA() {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith("/es");
  const target = isSpanish ? "/es/contacto#formulario" : "/en/contact#formEN";

  // Starts with the generic message so the button works immediately, then
  // swaps in the property/region-specific one once Sanity resolves it.
  const [message, setMessage] = useState(isSpanish ? GENERIC_MESSAGE.es : GENERIC_MESSAGE.en);

  useEffect(() => {
    let cancelled = false;
    getContextualWhatsappMessage(pathname).then((resolved) => {
      if (!cancelled) setMessage(resolved);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const whatsappUrl = buildWhatsappUrl(WHATSAPP_NUMBER, message);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      <Link
        href={target}
        className="rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-brand-700"
      >
        {isSpanish ? "Solicitar información" : "Request Information"}
      </Link>
    </div>
  );
}
