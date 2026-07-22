"use client";

import { useRouter, usePathname } from "next/navigation";

export default function OpportunityCard({ data, locale }) {
  const router = useRouter();
  const pathname = usePathname();

  // Auto-detect locale if not passed
  const lang = locale || (pathname.startsWith("/es") ? "es" : "en");

  // Determine correct title + description
  const title = lang === "es" ? data.title_es : data.title_en;
  const description = lang === "es" ? data.description_es : data.description_en;

  // Determine correct route
  const route =
    lang === "es"
      ? `/es/oportunidades/${data.id}`
      : `/en/opportunities/${data.id}`;

  return (
    <div
      className="border rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer bg-white"
      onClick={() => router.push(route)}
    >
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {description}
      </p>

      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Size:</strong> {data.size}</p>
        <p><strong>Type:</strong> {data.type}</p>
        <p><strong>Project:</strong> {data.projectType}</p>
      </div>

      <div className="mt-4 text-green-600 font-semibold underline">
        {lang === "es" ? "Ver detalles" : "View details"}
      </div>
    </div>
  );
}
