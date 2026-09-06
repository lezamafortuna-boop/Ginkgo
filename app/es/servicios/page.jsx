import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadFormD from "@/components/LeadFormD";

export const metadata = {
  title: "Servicios",
  description:
    "Soluciones especializadas para desarrolladores e inversionistas que buscan oportunidades estratégicas en México.",
  alternates: {
    canonical: "/es/servicios",
    languages: { "es-MX": "/es/servicios", "en-US": "/en/services" },
  },
};

const services = [
  {
    title: "Identificación de Oportunidades",
    text: "Analizamos corredores de crecimiento, infraestructura, vocación de suelo y tendencias urbanas para detectar terrenos con alto potencial de desarrollo. Nuestro enfoque combina análisis técnico, urbano y comercial.",
  },
  {
    title: "Análisis y Estructuración",
    text: "Evaluamos cada oportunidad desde una perspectiva integral: superficie, accesos, infraestructura, normativa, vocación y potencial de plusvalía. Estructuramos la información para facilitar la toma de decisiones.",
  },
  {
    title: "Comercialización Especializada",
    text: "Conectamos oportunidades con desarrolladores e inversionistas mediante estrategias comerciales enfocadas en proyectos de largo plazo. Presentamos información clara, técnica y confiable.",
  },
  {
    title: "Acompañamiento Integral",
    text: "Brindamos soporte durante todo el proceso: desde el primer acercamiento hasta la negociación final. Nuestro objetivo es facilitar decisiones informadas y seguras.",
  },
];

export default function ServiciosES() {
  return (
    <main className="bg-cream">
      <section className="px-6 py-24 text-center md:px-10">
        <Eyebrow>Lo que hacemos</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Servicios
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">
          Soluciones especializadas para desarrolladores e inversionistas que buscan
          oportunidades estratégicas en México.
        </p>
      </section>

      <section className="mx-auto max-w-5xl space-y-8 px-6 pb-20 md:px-10">
        {services.map((service) => (
          <Card key={service.title}>
            <h2 className="mb-4 font-serif text-2xl font-semibold text-charcoal">
              {service.title}
            </h2>
            <p className="leading-relaxed text-ink">{service.text}</p>
          </Card>
        ))}
      </section>

      <section id="formulario" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            ¿Buscas un terreno para desarrollar?
          </h2>
          <p className="mt-4 text-ink">
            Cuéntanos tus necesidades y encontraremos oportunidades alineadas con tus objetivos.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadFormD locale="es" id="lead-servicios" />
          </div>
        </div>
      </section>
    </main>
  );
}
