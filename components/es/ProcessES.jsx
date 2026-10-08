import Eyebrow from "../ui/Eyebrow";
import { getSiteText } from "@/lib/siteContent";

export default async function ProcessES() {
  const t = await getSiteText();
  const steps = [1, 2, 3, 4].map((n) => t(`home.process.${n}`, "es"));
  return (
    <section className="bg-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <Eyebrow>{t("home.process.eyebrow", "es")}</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          {t("home.process.title", "es")}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold font-serif text-lg font-semibold text-charcoal">
                {index + 1}
              </div>
              <p className="text-ink">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
