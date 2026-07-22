import { opportunities } from "@/data/opportunities";

export default function FeaturedOpportunitiesEN() {
  const featured = opportunities.filter((op) => op.featured).slice(0, 3);

  return (
    <section className="bg-[#0D0D0D] text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-10">
          Featured Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((op) => (
            <div
              key={op.slug}
              className="bg-[#1A1A1A] rounded-lg overflow-hidden shadow-lg border border-[#333]"
            >
              <img
                src={op.image}
                alt={op.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{op.name}</h3>
                <p className="text-gray-400 mb-2">{op.city}</p>
                <p className="text-gray-400 mb-2">
                  Surface: {op.surface}
                </p>
                <p className="text-gray-400 mb-4">
                  Land use: {op.vocation}
                </p>

                <ul className="text-gray-300 mb-4 list-disc list-inside">
                  {op.advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>

                <a
                  href={`/en/opportunities/${op.slug}`}
                  className="inline-block px-4 py-2 bg-[#C9A86A] text-black font-semibold rounded"
                >
                  View opportunity
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
