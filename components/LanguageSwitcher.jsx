"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Explicit map because ES and EN use different, localized URL segments
// (e.g. /es/oportunidades vs /en/opportunities) — a naive "/es" -> "/en"
// string replace breaks on every page except the homepage.
const ES_TO_EN = {
  "/es": "/en",
  "/es/oportunidades": "/en/opportunities",
  "/es/mapa": "/en/map",
  "/es/servicios": "/en/services",
  "/es/nosotros": "/en/about",
  "/es/contacto": "/en/contact",
  "/es/insights": "/en/insights",
  "/es/regiones": "/en/regions",
  "/es/privacidad": "/en/privacy",
  "/es/cookies": "/en/cookies",
};
const EN_TO_ES = Object.fromEntries(Object.entries(ES_TO_EN).map(([es, en]) => [en, es]));

function getTargetPath(pathname) {
  const isSpanish = pathname.startsWith("/es");
  const map = isSpanish ? ES_TO_EN : EN_TO_ES;

  if (map[pathname]) return map[pathname];

  // Dynamic [slug] routes: map the base segment, keep the slug.
  const match = pathname.match(/^(\/(?:es|en)\/[^/]+)\/(.+)$/);
  if (match) {
    const [, base, rest] = match;
    if (map[base]) return `${map[base]}/${rest}`;
  }

  return isSpanish ? "/en" : "/es";
}

export default function LanguageSwitcher({ className = "" }) {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith("/es");
  const targetPath = getTargetPath(pathname);

  return (
    <Link
      href={targetPath}
      className={`text-sm font-medium text-white transition-colors duration-300 hover:text-gold ${className}`}
    >
      {isSpanish ? "EN" : "ES"}
    </Link>
  );
}
