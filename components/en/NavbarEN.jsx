"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";

const links = [
  { href: "/en/opportunities", label: "Opportunities" },
  { href: "/en/services", label: "Services" },
  { href: "/en/insights", label: "Insights" },
  { href: "/en/about", label: "About" },
  { href: "/en/contact", label: "Contact" },
];

export default function NavbarEN() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/en" className="flex items-center">
          <span className="flex items-center rounded-md bg-[#0c213e] px-3 py-2">
            <span className="relative h-7 w-[54px] shrink-0">
              <Image src="/images/ginkgo-logo.png" alt="Ginkgo" fill sizes="54px" className="object-contain" priority />
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-charcoal transition-colors hover:text-teal-600">
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-charcoal"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-charcoal hover:text-teal-600"
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
