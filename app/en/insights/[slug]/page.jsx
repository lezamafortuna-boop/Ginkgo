import { insights } from "@/data/insights";

export default function InsightDetailEN({ params }) {
  const article = insights.find((i) => i.slug === params.slug);

  if (!article) {
    return <div className="text-white p-20">Article not found.</div>;
  }

  return (
    <main className="bg-[#0D0D0D] text-white">

      {/* HERO */}
      <section
        className="relative h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${article.image})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-4xl font-serif font-bold text-center px-4">
          {article.title}
        </h1>
      </section>

      {/* META */}
      <section className="py-12 px-8 max-w-4xl mx-auto">
        <p className="text-[#C9A86A] font-semibold">{article.category}</p>
        <p className="text-gray-400 mb-6">{article.date}</p>
      </section>

      {/* CONTENT */}
      <section className="px-8 pb-20 max-w-4xl mx-auto">
        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] leading-relaxed text-gray-300 whitespace-pre-line">
          {article.content}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Looking for opportunities aligned with these trends?
        </h2>
        <p className="text-gray-400 mb-12">
          Tell us your requirements and we will present strategic options.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Name" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Email" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Phone" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Company (optional)" />

          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Request information
          </button>
        </form>
      </section>
    </main>
  );
}
