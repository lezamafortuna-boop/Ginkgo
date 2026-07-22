"use client";

import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // Detect current language
  const isSpanish = pathname.startsWith("/es");

  // Build equivalent path
  const targetPath = isSpanish
    ? pathname.replace("/es", "/en")
    : pathname.replace("/en", "/es");

  return (
    <a
      href={targetPath}
      className="px-3 py-1 border border-[#C9A86A] rounded text-[#C9A86A] text-xs hover:bg-[#C9A86A] hover:text-black transition"
    >
      {isSpanish ? "EN" : "ES"}
    </a>
  );
}
