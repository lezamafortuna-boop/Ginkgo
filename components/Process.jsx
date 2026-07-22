export default function Process() {
  const steps = [
    "Analizamos el potencial del terreno.",
    "Diseñamos la estrategia comercial.",
    "Conectamos con inversionistas y desarrolladores.",
    "Acompañamos la negociación.",
  ];

  return (
    <section className="bg-[#0D0D0D] text-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-12">
          Nuestro Proceso
        </h2>

        <div className="flex flex-col items-center gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-[#1A1A1A] px-6 py-4 rounded-lg border border-[#333] shadow-lg">
                <p className="text-xl text-gray-200">{step}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="text-[#C9A86A] text-3xl font-bold my-4">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
