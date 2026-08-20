import { notFound } from "next/navigation";
import { insights } from "@/data/insights";
import Photo from "@/components/ui/Photo";
import LeadForm from "@/components/LeadForm";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = insights.find((i) => i.slug === slug);
  if (!article) return {};
  return {
    title: article.title_en,
    description: article.excerpt_en,
    alternates: {
      canonical: `/en/insights/${slug}`,
      languages: { "es-MX": `/es/insights/${slug}`, "en-US": `/en/insights/${slug}` },
    },
  };
}

export default async function InsightDetailEN({ params }) {
  const { slug } = await params;
  const article = insights.find((i) => i.slug === slug);
  if (!article) notFound();

  return (
    <main className="bg-cream">
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <Photo src={article.image} alt={article.title_en} className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-charcoal/50" />
        <h1 className="relative z-10 px-4 text-center font-serif text-4xl font-semibold text-white">
          {article.title_en}
        </h1>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 md:px-10">
        <p className="font-semibold uppercase tracking-wide text-brand-600">{article.category_en}</p>
        <p className="text-muted">{article.date_en}</p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 md:px-10">
        <div className="whitespace-pre-line rounded-lg border border-border bg-paper p-8 leading-relaxed text-ink shadow-sm">
          {article.content_en}
        </div>
      </section>

      <section id="formEN" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Looking for opportunities aligned with these trends?
          </h2>
          <p className="mt-4 text-ink">
            Tell us your requirements and we will present strategic options.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadForm locale="en" source={`EN - Insight ${article.title_en}`} id="lead-insight" />
          </div>
        </div>
      </section>
    </main>
  );
}
