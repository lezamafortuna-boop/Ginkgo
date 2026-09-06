import { notFound } from "next/navigation";
import { getOpportunityBySlug, getPropertyDocuments } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LeadFormA from "@/components/LeadFormA";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const opportunity = toLegacyOpportunity(await getOpportunityBySlug(slug));
  if (!opportunity) return {};
  return {
    title: opportunity.name_es,
    description: opportunity.developmentPotential_es?.slice(0, 155),
    alternates: {
      canonical: `/es/oportunidades/${slug}`,
      languages: { "es-MX": `/es/oportunidades/${slug}`, "en-US": `/en/opportunities/${slug}` },
    },
  };
}

export default async function OpportunityDetailES({ params }) {
  const { slug } = await params;
  const opportunity = toLegacyOpportunity(await getOpportunityBySlug(slug));
  if (!opportunity || opportunity.status !== "disponible") notFound();
  const documents = await getPropertyDocuments(opportunity.id);

  return (
    <main className="bg-cream">
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <Photo src={opportunity.heroImage} alt={opportunity.name_es} className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-charcoal/50" />
        <h1 className="relative z-10 px-4 text-center font-serif text-4xl font-semibold text-white md:text-5xl">
          {opportunity.name_es}
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">Lo esencial</h2>
        <Card className="grid grid-cols-1 gap-6 text-ink md:grid-cols-3">
          <p>
            <strong className="text-charcoal">Superficie:</strong> {opportunity.surface}
          </p>
          <p>
            <strong className="text-charcoal">Vocación:</strong> {opportunity.vocation_es}
          </p>
          <p>
            <strong className="text-charcoal">Disponibilidad:</strong> {opportunity.availability_es}
          </p>
        </Card>
        {opportunity.briefDescription_es && (
          <p className="mt-8 text-lg leading-relaxed text-ink">{opportunity.briefDescription_es}</p>
        )}
      </section>

      {opportunity.reasons_es.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">
            ¿Por qué esta oportunidad?
          </h2>
          <ul className="space-y-4">
            {opportunity.reasons_es.map((reason) => (
              <li key={reason} className="rounded-lg border border-border bg-paper p-6 text-ink shadow-sm">
                {reason}
              </li>
            ))}
          </ul>
        </section>
      )}

      {opportunity.distances_es.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">Ubicación</h2>
          <Card className="p-0 overflow-hidden">
            <Photo src={opportunity.mapImage} alt={`Mapa de ${opportunity.name_es}`} className="h-80 w-full" />
            <ul className="space-y-2 p-8 text-ink">
              {opportunity.distances_es.map((dist) => (
                <li key={dist}>{dist}</li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {opportunity.developmentPotential_es && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">
            Potencial de Desarrollo
          </h2>
          <p className="rounded-lg border border-border bg-paper p-8 leading-relaxed text-ink shadow-sm">
            {opportunity.developmentPotential_es}
          </p>
        </section>
      )}

      {opportunity.techSheet && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">
            Características Técnicas
          </h2>
          <Button href={opportunity.techSheet} target="_blank" rel="noopener noreferrer">
            Descargar ficha técnica
          </Button>
        </section>
      )}

      {documents.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">Documentos</h2>
          <ul className="space-y-3">
            {documents.map((doc) => (
              <li key={doc._id}>
                <a
                  href={doc.file?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-border bg-paper p-6 text-ink shadow-sm hover:text-brand-600"
                >
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="dossier" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Descarga del dossier
          </h2>
          <p className="mt-4 text-ink">
            Déjanos tus datos y te enviaremos el dossier completo de esta oportunidad.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadFormA
              locale="es"
              propertyName={opportunity.name_es}
              propertySlug={opportunity.slug}
              id="lead-dossier"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
