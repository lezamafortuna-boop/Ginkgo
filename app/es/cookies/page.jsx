import Card from "@/components/ui/Card";

export const metadata = {
  title: "Política de Cookies",
  alternates: {
    canonical: "/es/cookies",
    languages: { "es-MX": "/es/cookies", "en-US": "/en/cookies" },
  },
};

export default function CookiesES() {
  return (
    <main className="min-h-screen bg-cream px-6 py-20 md:px-10">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-6 font-serif text-4xl font-semibold text-charcoal">
          Política de Cookies
        </h1>
        <p className="mb-8 text-ink">
          Esta política explica cómo utilizamos cookies y tecnologías similares en nuestro sitio.
        </p>

        <Card className="space-y-6 leading-relaxed text-ink">
          <p>
            Utilizamos cookies para mejorar la experiencia de navegación, recordar preferencias
            básicas y analizar el uso del sitio.
          </p>
          <p>
            Las cookies no se utilizan para identificar personalmente al usuario sin su
            consentimiento explícito.
          </p>
          <p>
            El usuario puede desactivar cookies desde la configuración de su navegador. Algunas
            funciones del sitio pueden verse afectadas.
          </p>
        </Card>
      </section>
    </main>
  );
}
