import { notFound } from "next/navigation";
import { getRegionBySlug } from "@/lib/sanity/queries";
import { toLegacyRegion } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Eyebrow from "@/components/ui/Eyebrow";
import LeadFormD from "@/components/LeadFormD";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const region = toLegacyRegion(await getRegionBySlug(slug));
  if (!region) return {};
  return {
    title: region.name_es,
    description: region.description_es,
    alternates: {
      canonical: `/es/regiones/${slug}`,
      languages: { "es-MX": `/es/regiones/${slug}`, "en-US": `/en/regions/${slug}` },
    },
  };
}

export default async function RegionDetailES({ params }) {
  const { slug } = await params;
  const region = toLegacyRegion(await getRegionBySlug(slug));
  if (!region) notFound();

  return (
    <main className="bg-cream">
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <Photo src={region.heroImage} alt={region.name_es} className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-charcoal/50" />
        <h1 className="relative z-10 px-4 text-center font-serif text-4xl font-semibold text-white">
          {region.name_es}
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <p className="rounded-lg border border-border bg-paper p-8 leading-relaxed text-ink shadow-sm">
          {region.description_es}
        </p>
      </section>

      {region.advantages_es.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-10 md:px-10">
          <Eyebrow>Por qué esta región</Eyebrow>
          <h2 className="mt-2 mb-6 font-serif text-3xl font-semibold text-charcoal">
            Ventajas Estratégicas
          </h2>
          <ul className="space-y-4">
            {region.advantages_es.map((adv) => (
              <li key={adv} className="rounded-lg border border-border bg-paper p-6 text-ink shadow-sm">
                {adv}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <Photo
          src={region.mapImage}
          alt={`Mapa de ${region.name_es}`}
          className="h-96 w-full rounded-lg border border-border"
        />
      </section>

      <section id="formulario" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            ¿Buscas oportunidades en esta región?
          </h2>
          <p className="mt-4 text-ink">
            Cuéntanos tus necesidades y te presentaremos opciones alineadas con tu perfil.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadFormD locale="es" id="lead-region" />
          </div>
        </div>
      </section>
    </main>
  );
}
