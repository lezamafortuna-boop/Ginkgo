import { insights } from "@/data/insights";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata = {
  title: "Insights",
  description: "Análisis, tendencias y perspectivas del mercado inmobiliario en México.",
  alternates: {
    canonical: "/es/insights",
    languages: { "es-MX": "/es/insights", "en-US": "/en/insights" },
  },
};

export default function InsightsES() {
  return (
    <main className="min-h-screen bg-cream">
      <section className="px-6 py-20 text-center md:px-10">
        <Eyebrow>Perspectivas</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Insights
        </h1>
        <p className="mt-4 text-lg text-ink">
          Análisis, tendencias y perspectivas del mercado inmobiliario en México.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {insights.map((article) => (
            <Card key={article.slug} className="flex flex-col overflow-hidden p-0">
              <Photo src={article.image} alt={article.title_es} className="h-48 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
                  {article.category_es}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold text-charcoal">
                  {article.title_es}
                </h3>
                <p className="mt-1 text-sm text-muted">{article.date_es}</p>
                <p className="mt-3 mb-6 text-sm text-ink">{article.excerpt_es}</p>
                <Button href={`/es/insights/${article.slug}`} variant="outline" className="mt-auto self-start">
                  Leer más
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
