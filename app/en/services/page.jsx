import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadFormD from "@/components/LeadFormD";
import { getSiteText } from "@/lib/siteContent";

export const metadata = {
  title: "Services",
  description:
    "Identifying, analyzing and marketing large land tracts and land with real estate development potential in Mexico.",
  alternates: {
    canonical: "/en/services",
    languages: { "es-MX": "/es/servicios", "en-US": "/en/services" },
  },
};

export default async function ServicesEN() {
  const t = await getSiteText();
  const services = [1, 2, 3, 4].map((n) => ({ title: t(`services.${n}.title`, "en"), text: t(`services.${n}.text`, "en") }));
  return (
    <main className="bg-cream">
      <section className="px-6 py-24 text-center md:px-10">
        <Eyebrow className="justify-center">{t("services.eyebrow", "en")}</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-3xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">{t("services.title", "en")}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink">{t("services.intro", "en")}</p>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-6 pb-16 leading-relaxed text-ink md:px-10">
        <p>{t("services.intro.2", "en")}</p>
        <p>{t("services.intro.3", "en")}</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
        <h2 className="mb-8 font-serif text-2xl font-semibold text-charcoal md:text-3xl">{t("services.list.title", "en")}</h2>
        <div className="space-y-8">
          {services.map((service, index) => (
            <Card key={service.title}>
              <p className="font-serif text-sm font-semibold text-brand-600">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mb-4 mt-1 font-serif text-2xl font-semibold text-charcoal">{service.title}</h3>
              <p className="leading-relaxed text-ink">{service.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="formEN" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Looking for land to develop?
          </h2>
          <p className="mt-4 text-ink">
            Tell us your requirements and we will find opportunities aligned with your goals.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadFormD locale="en" id="lead-services" />
          </div>
        </div>
      </section>
    </main>
  );
}
