import { notFound } from "next/navigation";
import { getOpportunityBySlug, getPropertyDocuments } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import PropertyLocationMap from "@/components/maps/PropertyLocationMapClient";
import { toPublicMapPoint } from "@/lib/maps";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LeadFormA from "@/components/LeadFormA";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const opportunity = toLegacyOpportunity(await getOpportunityBySlug(slug));
  if (!opportunity) return {};
  return {
    title: opportunity.name_en,
    description: opportunity.developmentPotential_en?.slice(0, 155),
    alternates: {
      canonical: `/en/opportunities/${slug}`,
      languages: { "es-MX": `/es/oportunidades/${slug}`, "en-US": `/en/opportunities/${slug}` },
    },
  };
}

export default async function OpportunityDetailEN({ params }) {
  const { slug } = await params;
  const opportunity = toLegacyOpportunity(await getOpportunityBySlug(slug));
  if (!opportunity || opportunity.status !== "disponible") notFound();
  const mapPoint = toPublicMapPoint(opportunity);
  const documents = await getPropertyDocuments(opportunity.id);
  const facts = [
    ["Surface", opportunity.surface],
    ["Land use", opportunity.vocation_en],
    ["Availability", opportunity.availability_en],
  ].filter(([, value]) => value);

  return (
    <main className="bg-cream">
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <Photo src={opportunity.heroImage} alt={opportunity.name_en} className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold md:text-sm">Development opportunity</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-white md:text-5xl">{opportunity.name_en}</h1>
          {opportunity.briefDescription_en && (
            <p className="mt-4 max-w-2xl text-lg text-white/85">{opportunity.briefDescription_en}</p>
          )}
          <Button href="#dossier" className="mt-8">
            Request information
          </Button>
        </div>
      </section>

      {facts.length > 0 ? (
        <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">
            Essential Information
          </h2>
          <Card className="grid grid-cols-1 gap-6 text-ink md:grid-cols-3">
            {facts.map(([label, value]) => (
              <p key={label}>
                <strong className="text-charcoal">{label}:</strong> {value}
              </p>
            ))}
          </Card>
        </section>
      ) : (
        <div className="h-20" />
      )}

      {opportunity.reasons_en.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">
            Why This Opportunity?
          </h2>
          <ul className="space-y-4">
            {opportunity.reasons_en.map((reason) => (
              <li key={reason} className="rounded-lg border border-border bg-paper p-6 text-ink shadow-sm">
                {reason}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(opportunity.distances_en.length > 0 || mapPoint.coordinates) && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">Location</h2>
          <Card className="p-0 overflow-hidden">
            {mapPoint.coordinates ? (
              <PropertyLocationMap
                coordinates={mapPoint.coordinates}
                approximate={mapPoint.approximate}
                name={opportunity.name_en}
                locale="en"
              />
            ) : (
              opportunity.mapImage && (
                <Photo src={opportunity.mapImage} alt={opportunity.name_en} className="h-80 w-full" />
              )
            )}
            <ul className="space-y-2 p-8 text-ink">
              {opportunity.distances_en.map((dist) => (
                <li key={dist}>{dist}</li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {opportunity.developmentPotential_en && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">
            The Opportunity
          </h2>
          <p className="rounded-lg border border-border bg-paper p-8 leading-relaxed whitespace-pre-line text-ink shadow-sm">
            {opportunity.developmentPotential_en}
          </p>
        </section>
      )}

      {opportunity.techSheet && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">
            Technical Specifications
          </h2>
          <Button href={opportunity.techSheet} target="_blank" rel="noopener noreferrer">
            Download Technical Sheet
          </Button>
        </section>
      )}

      {documents.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">Documents</h2>
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
            Download the Dossier
          </h2>
          <p className="mt-4 text-ink">
            Leave your details and we'll send you the full dossier for this opportunity.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadFormA
              locale="en"
              propertyName={opportunity.name_en}
              propertySlug={opportunity.slug}
              id="lead-dossier"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
