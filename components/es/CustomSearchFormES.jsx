import Eyebrow from "../ui/Eyebrow";
import LeadForm from "../LeadForm";

export default function CustomSearchFormES() {
  return (
    <section className="bg-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Búsqueda a la medida</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          ¿No encontraste lo que buscas?
        </h2>
        <p className="mt-4 text-ink">
          Cuéntanos ciudad de interés, tipo de proyecto, superficie y presupuesto aproximado, y
          encontraremos oportunidades alineadas con tus objetivos.
        </p>

        <div className="mt-10 rounded-lg border border-border bg-paper p-8 shadow-sm md:p-10">
          <LeadForm locale="es" source="ES - Búsqueda personalizada" id="lead-search-es" />
        </div>
      </div>
    </section>
  );
}
