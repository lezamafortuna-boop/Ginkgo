import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadFormD from "@/components/LeadFormD";
import { getSiteText } from "@/lib/siteContent";

export const metadata = {
  title: "Services",
  description:
    "Specialized solutions for developers and investors seeking strategic land opportunities in Mexico.",
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
        <Eyebrow>{t("services.eyebrow", "en")}</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">{t("services.title", "en")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">{t("services.intro", "en")}</p>
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
