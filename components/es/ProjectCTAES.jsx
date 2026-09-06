import LeadFormD from "../LeadFormD";

export default function ProjectCTAES() {
  return (
    <section className="bg-charcoal px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-semibold md:text-4xl">
          Hablemos de tu próximo proyecto
        </h2>
        <p className="mt-4 text-lg text-white/75">
          Cuéntanos qué tipo de desarrollo buscas y te presentaremos oportunidades alineadas con
          tus objetivos.
        </p>

        <div className="mt-10 rounded-lg bg-paper p-8 text-left shadow-lg md:p-10">
          <LeadFormD locale="es" id="lead-project-es" />
        </div>
      </div>
    </section>
  );
}
