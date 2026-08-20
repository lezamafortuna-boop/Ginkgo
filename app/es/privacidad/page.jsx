import Card from "@/components/ui/Card";

export const metadata = {
  title: "Aviso de Privacidad",
  alternates: {
    canonical: "/es/privacidad",
    languages: { "es-MX": "/es/privacidad", "en-US": "/en/privacy" },
  },
};

export default function PrivacidadES() {
  return (
    <main className="min-h-screen bg-cream px-6 py-20 md:px-10">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-6 font-serif text-4xl font-semibold text-charcoal">
          Aviso de Privacidad
        </h1>
        <p className="mb-8 text-ink">
          Este aviso explica cómo Ginkgo recopila, utiliza y protege la información
          proporcionada por los usuarios.
        </p>

        <Card className="space-y-6 leading-relaxed text-ink">
          <p>
            Ginkgo recopila datos de contacto proporcionados voluntariamente por el usuario, como
            nombre, correo electrónico, teléfono y empresa.
          </p>
          <p>
            Esta información se utiliza exclusivamente para dar seguimiento a solicitudes de
            información, compartir oportunidades y mantener comunicación relacionada con nuestros
            servicios.
          </p>
          <p>
            No compartimos datos personales con terceros ajenos a la relación comercial, salvo
            obligación legal.
          </p>
          <p>
            El usuario puede solicitar la actualización o eliminación de sus datos escribiendo a{" "}
            <a href="mailto:tonatiuhcervantes@ginkgomx.com" className="text-brand-600 hover:underline">
              tonatiuhcervantes@ginkgomx.com
            </a>
            .
          </p>
        </Card>
      </section>
    </main>
  );
}
