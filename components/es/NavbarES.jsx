"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";

const links = [
  { href: "/es/oportunidades", label: "Oportunidades" },
  { href: "/es/mapa", label: "Mapa" },
  { href: "/es/servicios", label: "Servicios" },
  { href: "/es/insights", label: "Perspectivas" },
  { href: "/es/nosotros", label: "Nosotros" },
  { href: "/es/contacto", label: "Contacto" },
];

export default function NavbarES() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-charcoal">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/es" className="flex items-center py-1">
          <span className="relative h-10 w-[60px] shrink-0">
            <Image src="/images/ginkgo-logo.png" alt="Ginkgo" fill sizes="60px" className="object-contain" priority />
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="text-white transition-colors duration-300 hover:text-gold"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-charcoal px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-white transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
