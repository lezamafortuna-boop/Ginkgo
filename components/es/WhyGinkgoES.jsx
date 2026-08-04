import Eyebrow from "../ui/Eyebrow";
import Card from "../ui/Card";

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

export default function WhyGinkgoES() {
  return (
    <section className="bg-paper px-6 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Nuestro enfoque</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          ¿Por qué Ginkgo?
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.title}>
              <h3 className="font-serif text-xl font-semibold text-teal-600">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
