import Eyebrow from "../ui/Eyebrow";

const steps = [
  "Analizamos el potencial del terreno.",
  "Diseñamos la estrategia comercial.",
  "Conectamos con inversionistas y desarrolladores.",
  "Acompañamos la negociación.",
];

export default function ProcessES() {
  return (
    <section className="bg-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <Eyebrow>Cómo trabajamos</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          Nuestro Proceso
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-teal-600 font-serif text-lg text-teal-600">
                {index + 1}
              </div>
              <p className="text-ink">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
