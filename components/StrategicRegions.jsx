export default function StrategicRegions() {
  const regions = [
    "Querétaro",
    "Corregidora",
    "El Marqués",
    "Santa Rosa Jáuregui",
    "Pedro Escobedo",
    "Cadereyta",
    "Puerto Vallarta",
  ];

  return (
    <section className="bg-[#0D0D0D] text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Regiones Estratégicas
        </h2>

        <p className="text-gray-400 mb-12">
          Oportunidades en las principales regiones del país.
        </p>

        {/* Map */}
        <div className="relative w-full h-[400px] mb-12">
          <img
            src="/map.jpg"
            alt="Mapa de regiones"
            className="w-full h-full object-cover rounded-lg opacity-80"
          />

          {/* Pins */}
          {regions.map((region, index) => (
            <div
              key={index}
              className="absolute bg-[#C9A86A] w-4 h-4 rounded-full shadow-lg"
              style={{
                top: `${20 + index * 8}%`,
                left: `${30 + (index % 3) * 15}%`,
              }}
            ></div>
          ))}
        </div>

        {/* Region List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {regions.map((region, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333]"
            >
              <h3 className="text-xl font-semibold text-[#C9A86A] mb-2">
                {region}
              </h3>
              <p className="text-gray-300">
                Oportunidades habitacionales, terrenos comerciales y desarrollo
                vertical. Desde 5,000 m² hasta 25 ha.
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/es/contacto"
            className="px-6 py-3 bg-[#C9A86A] text-black font-semibold rounded"
          >
            Solicitar Portafolio
          </a>
        </div>
      </div>
    </section>
  );
}
