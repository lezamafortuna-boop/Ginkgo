import { getPublicOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";

export const revalidate = 60;

export const metadata = {
  title: "Oportunidades",
  description: "Terrenos estratégicos para desarrolladores e inversionistas en México.",
  alternates: {
    canonical: "/es/oportunidades",
    languages: { "es-MX": "/es/oportunidades", "en-US": "/en/opportunities" },
  },
};

export default async function OpportunitiesListES() {
  const docs = await getPublicOpportunities();
  const opportunities = docs.map(toLegacyOpportunity);

  return (
    <main className="min-h-screen bg-cream">
      <section className="px-6 py-20 text-center md:px-10">
        <Eyebrow>Portafolio</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Oportunidades Inmobiliarias
        </h1>
        <p className="mt-4 text-lg text-ink">
          Terrenos estratégicos para desarrolladores e inversionistas.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {opportunities.map((op) => (
            <Card key={op.slug} className="flex flex-col overflow-hidden p-0">
              <Photo src={op.image} alt={op.name_es} className="h-48 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-semibold text-charcoal">{op.name_es}</h3>
                <p className="mt-1 text-sm text-muted">{op.city_es}</p>
                <p className="mt-3 text-sm text-ink">Superficie: {op.surface}</p>
                <p className="mb-4 text-sm text-ink">Vocación: {op.vocation_es}</p>
                <Button href={`/es/oportunidades/${op.slug}`} variant="outline" className="mt-auto self-start">
                  Ver oportunidad
                </Button>
              </div>
            </Card>
          ))}
        </div>
        {opportunities.length === 0 && (
          <p className="text-center text-muted">Próximamente nuevas oportunidades.</p>
        )}
      </section>
    </main>
  );
}
