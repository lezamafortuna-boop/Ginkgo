import LeadFormD from "../LeadFormD";
import { getSiteText } from "@/lib/siteContent";

export default async function ProjectCTAES() {
  const t = await getSiteText();
  return (
    <section className="bg-charcoal px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-semibold md:text-4xl">
          {t("home.cta.title", "es")}
        </h2>
        <p className="mt-4 text-lg text-white/75">
          {t("home.cta.text", "es")}
        </p>

        <div className="mt-10 rounded-lg bg-paper p-8 text-left shadow-lg md:p-10">
          <LeadFormD locale="es" id="lead-project-es" />
        </div>
      </div>
    </section>
  );
}
