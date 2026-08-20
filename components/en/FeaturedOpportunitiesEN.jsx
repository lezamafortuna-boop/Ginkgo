import { opportunities } from "@/data/opportunities";
import Photo from "../ui/Photo";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Eyebrow from "../ui/Eyebrow";

export default function FeaturedOpportunitiesEN() {
  const featured = opportunities.filter((op) => op.featured).slice(0, 3);

  return (
    <section className="bg-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Portfolio</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          Featured Opportunities
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((op) => (
            <Card key={op.slug} className="flex flex-col overflow-hidden p-0">
              <Photo src={op.image} alt={op.name_en} className="h-52 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-semibold text-charcoal">{op.name_en}</h3>
                <p className="mt-1 text-sm text-muted">{op.city_en}</p>
                <p className="mt-3 text-sm text-ink">Surface: {op.surface}</p>
                <p className="text-sm text-ink">Land use: {op.vocation_en}</p>

                <ul className="mt-4 space-y-1 text-sm text-ink">
                  {op.advantages_en.slice(0, 2).map((adv) => (
                    <li key={adv} className="flex gap-2">
                      <span className="text-brand-600">—</span>
                      {adv}
                    </li>
                  ))}
                </ul>

                <Button href={`/en/opportunities/${op.slug}`} variant="outline" className="mt-6 self-start">
                  View opportunity
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
