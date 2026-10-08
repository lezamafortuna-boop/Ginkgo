import { getPublicInsights } from "@/lib/sanity/queries";
import { toLegacyInsight } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata = {
  title: "Insights",
  description: "Analysis, trends, and perspectives on Mexico's real estate market.",
  alternates: {
    canonical: "/en/insights",
    languages: { "es-MX": "/es/insights", "en-US": "/en/insights" },
  },
};

export const revalidate = 60;

export default async function InsightsEN() {
  const insights = (await getPublicInsights()).map(toLegacyInsight);

  return (
    <main className="min-h-screen bg-cream">
      <section className="px-6 py-20 text-center md:px-10">
        <Eyebrow>Perspectives</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Insights
        </h1>
        <p className="mt-4 text-lg text-ink">
          Analysis, trends, and perspectives on Mexico's real estate market.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        {insights.length === 0 && <p className="text-center text-ink">New analysis will be published soon.</p>}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {insights.map((article) => (
            <Card key={article.slug} className="flex flex-col overflow-hidden p-0">
              <Photo src={article.image} alt={article.title_en} className="h-48 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {article.category_en}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold text-charcoal">
                  {article.title_en}
                </h3>
                <p className="mt-1 text-sm text-muted">{article.date_en}</p>
                <p className="mt-3 mb-6 text-sm text-ink">{article.excerpt_en}</p>
                <Button href={`/en/insights/${article.slug}`} variant="outline" className="mt-auto self-start">
                  Read more
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
