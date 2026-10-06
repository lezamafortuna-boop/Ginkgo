import { getMapOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import PublicPropertyMap from "@/components/maps/PublicPropertyMapClient";
import Eyebrow from "@/components/ui/Eyebrow";

export const revalidate = 60;

export const metadata = {
  title: "Opportunities Map",
  description: "Explore all of Ginkgo's available opportunities in Mexico on the map.",
  alternates: {
    canonical: "/en/map",
    languages: { "es-MX": "/es/mapa", "en-US": "/en/map" },
  },
};

export default async function MapEN() {
  const properties = (await getMapOpportunities()).map(toLegacyOpportunity);

  return (
    <main className="min-h-screen bg-cream">
      <section className="px-6 py-16 text-center md:px-10">
        <Eyebrow>Explore</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Opportunities Map
        </h1>
        <p className="mt-4 text-lg text-ink">
          Locate every opportunity and request information directly from the map.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <PublicPropertyMap properties={properties} locale="en" />
      </section>
    </main>
  );
}
