"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { sanity } from "@/lib/sanity";

export default function RegionMap() {
  const [regions, setRegions] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  // Detect locale from the current route
  const locale = pathname.startsWith("/es") ? "es" : "en";

  // Fetch regions from Sanity
  useEffect(() => {
    async function fetchRegions() {
      const data = await sanity.fetch(`*[_type == "region"]`);
      setRegions(data);
    }
    fetchRegions();
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* MAP IMAGE */}
      <Image
        src="/images/map-mexico.png"
        alt="Mexico Map"
        width={1200}
        height={900}
        className="w-full h-auto"
        priority
      />

      {/* REGION PINS */}
      {regions.map((region) => (
        <button
          key={region.id}
          className="absolute bg-green-600 hover:bg-green-700 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-transform hover:scale-125"
          style={{
            left: `${region.x}%`,
            top: `${region.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => router.push(`/${locale}/region/${region.id}`)}
          title={locale === "es" ? region.name_es : region.name_en}
        />
      ))}
    </div>
  );
}
