import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadFormD from "@/components/LeadFormD";
import { getSiteText } from "@/lib/siteContent";

export const metadata = {
  title: "About",
  description:
    "A specialized firm focused on identifying, analyzing, and structuring real estate development opportunities in Mexico.",
  alternates: {
    canonical: "/en/about",
    languages: { "es-MX": "/es/nosotros", "en-US": "/en/about" },
  },
};

export default async function AboutEN() {
  const t = await getSiteText();
  return (
    <main className="bg-cream">
      <section className="px-6 py-24 text-center md:px-10">
        <Eyebrow>{t("about.eyebrow", "en")}</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">{t("about.title", "en")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">{t("about.intro", "en")}</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 md:px-10">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal md:text-3xl">{t("about.philosophy.title", "en")}</h2>
        <Card className="leading-relaxed text-ink">
          <p className="mb-6">{t("about.philosophy.1", "en")}</p>
          <p className="mb-6">{t("about.philosophy.2", "en")}</p>
          <p>{t("about.philosophy.3", "en")}</p>
        </Card>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal md:text-3xl">{t("about.how.title", "en")}</h2>
        <Card className="leading-relaxed text-ink">
          <p className="mb-6">{t("about.how.1", "en")}</p>
          <p>{t("about.how.2", "en")}</p>
        </Card>
      </section>

      <section id="formEN" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Want access to our full portfolio?
          </h2>
          <p className="mt-4 text-ink">
            Tell us your requirements and we will present opportunities aligned with your
            profile.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadFormD locale="en" id="lead-about" />
          </div>
        </div>
      </section>
    </main>
  );
}
