import { getFeaturedOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Photo from "../ui/Photo";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Eyebrow from "../ui/Eyebrow";
import { getSiteText } from "@/lib/siteContent";

export default async function FeaturedOpportunitiesES() {
  const t = await getSiteText();
  const featured = (await getFeaturedOpportunities()).map(toLegacyOpportunity).slice(0, 3);

  return (
    <section className="bg-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{t("portfolio.eyebrow", "es")}</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              {t("portfolio.title", "es")}
            </h2>
            <p className="mt-4 leading-relaxed text-ink">{t("portfolio.text.1", "es")}</p>
            <p className="mt-3 leading-relaxed text-ink">{t("portfolio.text.2", "es")}</p>
          </div>
          <Button href="/es/oportunidades" className="shrink-0 self-start md:self-end">
            {t("portfolio.button", "es")}
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((op) => (
            <Card key={op.slug} className="flex flex-col overflow-hidden p-0">
              <Photo src={op.image} alt={op.name_es} className="h-52 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-semibold text-charcoal">{op.name_es}</h3>
                <p className="mt-1 text-sm text-muted">{op.city_es}</p>
                {op.briefDescription_es && <p className="mt-3 text-sm text-ink">{op.briefDescription_es}</p>}
                {op.surface && <p className="mt-3 text-sm text-ink">Superficie: {op.surface}</p>}
                {op.vocation_es && <p className="text-sm text-ink">Vocación: {op.vocation_es}</p>}

                <ul className="mt-4 space-y-1 text-sm text-ink">
                  {op.advantages_es.slice(0, 2).map((adv) => (
                    <li key={adv} className="flex gap-2">
                      <span className="text-brand-600">—</span>
                      {adv}
                    </li>
                  ))}
                </ul>

                <Button href={`/es/oportunidades/${op.slug}`} variant="outline" className="mt-6 self-start">
                  Conocer la oportunidad
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
