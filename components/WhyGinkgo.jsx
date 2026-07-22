export default function WhyGinkgo() {
  const items = [
    {
      title: "Análisis Estratégico",
      text: "Evaluamos el potencial urbano, conectividad, vocación y posibilidades de desarrollo para identificar oportunidades con verdadero valor.",
    },
    {
      title: "Comercialización Especializada",
      text: "Conectamos oportunidades con desarrolladores e inversionistas mediante estrategias enfocadas en proyectos de largo plazo.",
    },
    {
      title: "Conocimiento del Mercado",
      text: "Analizamos tendencias urbanas, corredores de crecimiento e infraestructura para detectar oportunidades con alto potencial.",
    },
    {
      title: "Acompañamiento",
      text: "Desde el primer acercamiento hasta la negociación, brindamos información técnica y comercial para facilitar la toma de decisiones.",
    },
  ];

  return (
    <section className="bg-[#0D0D0D] text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-12">
          ¿Por qué Ginkgo?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {items.map((item, index) => (
            <div key={index} className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
              <h3 className="text-2xl font-semibold mb-4 text-[#C9A86A]">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
