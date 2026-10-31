import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadFormD from "@/components/LeadFormD";
import { getSiteText } from "@/lib/siteContent";

export const metadata = {
  title: "Nosotros",
  description:
    "Ginkgo se especializa en macrolotes y terrenos con potencial de desarrollo, acercando a propietarios, inversionistas y desarrolladores con análisis, contexto y estrategia.",
  alternates: {
    canonical: "/es/nosotros",
    languages: { "es-MX": "/es/nosotros", "en-US": "/en/about" },
  },
};

export default async function NosotrosES() {
  const t = await getSiteText();
  return (
    <main className="bg-cream">
      <section className="px-6 py-24 text-center md:px-10">
        <Eyebrow className="justify-center">{t("about.eyebrow", "es")}</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-3xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">{t("about.title", "es")}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink">{t("about.intro", "es")}</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 md:px-10">
        <Card className="leading-relaxed text-ink">
          <p className="mb-6">{t("about.vision.1", "es")}</p>
          <p className="mb-6">{t("about.vision.2", "es")}</p>
          <p>{t("about.vision.3", "es")}</p>
        </Card>
        <p className="mx-auto mt-12 max-w-3xl border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-charcoal md:text-2xl">
          {t("about.question", "es")}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
        <Eyebrow>{t("about.who.eyebrow", "es")}</Eyebrow>
        <h2 className="mb-6 mt-2 font-serif text-2xl font-semibold text-charcoal md:text-3xl">{t("about.who.title", "es")}</h2>
        <Card className="leading-relaxed text-ink">
          <p className="mb-6">{t("about.who.1", "es")}</p>
          <p className="mb-6">{t("about.who.2", "es")}</p>
          <p className="mb-6">{t("about.who.3", "es")}</p>
          <p className="font-semibold text-charcoal">{t("about.who.commitment", "es")}</p>
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
            <LeadFormD locale="es" id="lead-nosotros" />
          </div>
        </div>
      </section>
    </main>
  );
}
