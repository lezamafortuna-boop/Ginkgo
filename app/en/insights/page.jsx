import { insights } from "@/data/insights";

export default function InsightsEN() {
  return (
    <main className="bg-[#0D0D0D] text-white min-h-screen">

      {/* HERO */}
      <section className="py-24 px-8 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">
          Insights
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Analysis, trends, and perspectives on Mexico’s real estate market.
        </p>
      </section>

      {/* GRID */}
      <section className="px-8 pb-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {insights.map((article) => (
          <div
            key={article.slug}
            className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#333] shadow-lg"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-6">
              <span className="text-[#C9A86A] text-sm font-semibold">
                {article.category}
              </span>

              <h3 className="text-xl font-semibold mt-2 mb-2">
                {article.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {article.date}
              </p>

              <p className="text-gray-300 mb-6">
                {article.excerpt}
              </p>

              <a
                href={`/en/insights/${article.slug}`}
                className="inline-block px-4 py-2 bg-[#C9A86A] text-black font-semibold rounded"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
