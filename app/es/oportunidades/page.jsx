import { opportunities } from "@/data/opportunities";

export default function OpportunitiesListES() {
  return (
    <main className="bg-[#0D0D0D] text-white min-h-screen">

      {/* HERO */}
      <section className="py-20 px-8 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">
          Oportunidades Inmobiliarias
        </h1>
        <p className="text-gray-400 text-lg">
          Terrenos estratégicos para desarrolladores e inversionistas.
        </p>
      </section>

      {/* GRID */}
      <section className="px-8 pb-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {opportunities.map((op) => (
          <div
            key={op.slug}
            className="bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#333] shadow-lg"
          >
            <img
              src={op.image}
              alt={op.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{op.name}</h3>
              <p className="text-gray-400 mb-1">{op.city}</p>
              <p className="text-gray-400 mb-1">Superficie: {op.surface}</p>
              <p className="text-gray-400 mb-4">Vocación: {op.vocation}</p>

              <a
                href={`/es/oportunidades/${op.slug}`}
                className="inline-block px-4 py-2 bg-[#C9A86A] text-black font-semibold rounded"
              >
                Ver oportunidad
              </a>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
