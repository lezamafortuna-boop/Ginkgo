import { getMapOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import PublicPropertyMap from "@/components/maps/PublicPropertyMapClient";
import Eyebrow from "@/components/ui/Eyebrow";

export const revalidate = 60;

export const metadata = {
  title: "Mapa de Oportunidades",
  description: "Explora en el mapa todas las oportunidades disponibles de Ginkgo en México.",
  alternates: {
    canonical: "/es/mapa",
    languages: { "es-MX": "/es/mapa", "en-US": "/en/map" },
  },
};

export default async function MapaES() {
  const properties = (await getMapOpportunities()).map(toLegacyOpportunity);

  return (
    <main className="min-h-screen bg-cream">
      <section className="px-6 py-16 text-center md:px-10">
        <Eyebrow>Explora</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Mapa de Oportunidades
        </h1>
        <p className="mt-4 text-lg text-ink">
          Ubica cada oportunidad y solicita información directamente desde el mapa.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <PublicPropertyMap properties={properties} locale="es" />
      </section>
    </main>
  );
}
