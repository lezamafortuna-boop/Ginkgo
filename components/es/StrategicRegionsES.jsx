import Link from "next/link";
import { getRegions } from "@/lib/sanity/queries";
import { toLegacyRegion } from "@/lib/sanity/adapters";
import Photo from "../ui/Photo";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";

export default async function StrategicRegionsES() {
  const regions = (await getRegions()).map(toLegacyRegion);

  return (
    <section className="bg-paper px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Cobertura</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          Regiones Estratégicas
        </h2>
        <p className="mt-4 max-w-2xl text-ink">
          Oportunidades en los corredores de mayor crecimiento del país.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`/es/regiones/${region.slug}`}
              className="group block overflow-hidden rounded-lg border border-border bg-paper shadow-sm transition-shadow hover:shadow-md"
            >
              <Photo src={region.heroImage} alt={region.name_es} className="h-56 w-full" />
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-charcoal group-hover:text-brand-600">
                  {region.name_es}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink">{region.description_es}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/es/contacto" variant="outline">
            Solicitar Portafolio
          </Button>
        </div>
      </div>
    </section>
  );
}
