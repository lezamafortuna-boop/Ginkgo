import { getPublicOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";
import { getSiteText } from "@/lib/siteContent";

export const revalidate = 60;

export const metadata = {
  title: "Opportunities",
  description: "Strategic land opportunities for developers and investors in Mexico.",
  alternates: {
    canonical: "/en/opportunities",
    languages: { "es-MX": "/es/oportunidades", "en-US": "/en/opportunities" },
  },
};

export default async function OpportunitiesListEN() {
  const t = await getSiteText();
  const docs = await getPublicOpportunities();
  const opportunities = docs.map(toLegacyOpportunity);

  return (
    <main className="min-h-screen bg-cream">
      <section className="px-6 py-20 text-center md:px-10">
        <Eyebrow className="justify-center">{t("portfolio.eyebrow", "en")}</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          {t("portfolio.title", "en")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">{t("portfolio.text.1", "en")}</p>
        <p className="mx-auto mt-3 max-w-2xl text-ink">{t("portfolio.text.2", "en")}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {opportunities.map((op) => (
            <Card key={op.slug} className="flex flex-col overflow-hidden p-0">
              <Photo src={op.image} alt={op.name_en} className="h-48 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-semibold text-charcoal">{op.name_en}</h3>
                <p className="mt-1 text-sm text-muted">{op.city_en}</p>
                {op.briefDescription_en && <p className="mt-3 text-sm text-ink">{op.briefDescription_en}</p>}
                {op.surface && <p className="mt-3 text-sm text-ink">Surface: {op.surface}</p>}
                {op.vocation_en && <p className="text-sm text-ink">Land use: {op.vocation_en}</p>}
                <div className="mb-4" />
                <Button href={`/en/opportunities/${op.slug}`} variant="outline" className="mt-auto self-start">
                  View opportunity
                </Button>
              </div>
            </Card>
          ))}
        </div>
        {opportunities.length === 0 && (
          <p className="text-center text-muted">New opportunities coming soon.</p>
        )}
      </section>
    </main>
  );
}
