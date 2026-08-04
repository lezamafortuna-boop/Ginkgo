import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Nosotros",
  description:
    "Una firma especializada en identificar, analizar y estructurar oportunidades de desarrollo inmobiliario en México.",
  alternates: {
    canonical: "/es/nosotros",
    languages: { "es-MX": "/es/nosotros", "en-US": "/en/about" },
  },
};

export default function NosotrosES() {
  return (
    <main className="bg-cream">
      <section className="px-6 py-24 text-center md:px-10">
        <Eyebrow>Quiénes somos</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Sobre Ginkgo
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">
          Una firma especializada en identificar, analizar y estructurar oportunidades de
          desarrollo inmobiliario.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 md:px-10">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
          Filosofía Comercial
        </h2>
        <Card className="leading-relaxed text-ink">
          <p className="mb-6">
            No queremos ser un catálogo de terrenos. Queremos ser reconocidos como una firma que
            identifica oportunidades de desarrollo.
          </p>
          <p className="mb-6">
            Las propiedades cambian constantemente. Lo que permanece es nuestra capacidad para
            analizarlas, estructurarlas y conectar oportunidades con inversionistas y
            desarrolladores.
          </p>
          <p>
            Por ello, solo mostramos las oportunidades más relevantes. El resto del portafolio se
            presenta de forma personalizada según el perfil del cliente.
          </p>
        </Card>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 md:px-10">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
          Una experiencia diseñada para convertir
        </h2>
        <Card className="text-ink">
          <p className="mb-6 leading-relaxed">
            La web no es un sitio institucional. Es un embudo de conversión. Cada sección está
            diseñada para llevar al usuario a solicitar información.
          </p>
          <ul className="list-inside list-disc space-y-3">
            <li>Botón fijo de "Solicitar información".</li>
            <li>CTAs al terminar cada sección.</li>
            <li>Formularios integrados en puntos estratégicos.</li>
            <li>Contenido claro, directo y orientado a la acción.</li>
          </ul>
        </Card>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
          Cómo trabajamos
        </h2>
        <Card className="leading-relaxed text-ink">
          <p className="mb-6">
            Identificamos oportunidades mediante análisis urbano, técnico y comercial.
            Estructuramos la información para facilitar decisiones estratégicas.
          </p>
          <p>
            Conectamos oportunidades con desarrolladores e inversionistas mediante un enfoque
            consultivo y especializado.
          </p>
        </Card>
      </section>

      <section id="formulario" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            ¿Quieres conocer nuestro portafolio completo?
          </h2>
          <p className="mt-4 text-ink">
            Compártenos tus necesidades y te presentaremos oportunidades alineadas con tu perfil.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadForm locale="es" source="ES - Nosotros" id="lead-nosotros" />
          </div>
        </div>
      </section>
    </main>
  );
}
