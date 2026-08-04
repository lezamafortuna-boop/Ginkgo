import { notFound } from "next/navigation";
import { regions } from "@/data/regions";
import Photo from "@/components/ui/Photo";
import Eyebrow from "@/components/ui/Eyebrow";
import LeadForm from "@/components/LeadForm";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const region = regions.find((r) => r.slug === slug);
  if (!region) return {};
  return {
    title: region.name_en,
    description: region.description_en,
    alternates: {
      canonical: `/en/regions/${slug}`,
      languages: { "es-MX": `/es/regiones/${slug}`, "en-US": `/en/regions/${slug}` },
    },
  };
}

export default async function RegionDetailEN({ params }) {
  const { slug } = await params;
  const region = regions.find((r) => r.slug === slug);
  if (!region) notFound();

  return (
    <main className="bg-cream">
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <Photo src={region.heroImage} alt={region.name_en} className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-charcoal/50" />
        <h1 className="relative z-10 px-4 text-center font-serif text-4xl font-semibold text-white">
          {region.name_en}
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <p className="rounded-lg border border-border bg-paper p-8 leading-relaxed text-ink shadow-sm">
          {region.description_en}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-10 md:px-10">
        <Eyebrow>Why this region</Eyebrow>
        <h2 className="mt-2 mb-6 font-serif text-3xl font-semibold text-charcoal">
          Strategic Advantages
        </h2>
        <ul className="space-y-4">
          {region.advantages_en.map((adv) => (
            <li key={adv} className="rounded-lg border border-border bg-paper p-6 text-ink shadow-sm">
              {adv}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-10">
        <Photo
          src={region.mapImage}
          alt={`Map of ${region.name_en}`}
          className="h-96 w-full rounded-lg border border-border"
        />
      </section>

      <section id="formEN" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Looking for opportunities in this region?
          </h2>
          <p className="mt-4 text-ink">
            Tell us your requirements and we will present options aligned with your profile.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadForm locale="en" source={`EN - Region ${region.name_en}`} id="lead-region" />
          </div>
        </div>
      </section>
    </main>
  );
}
