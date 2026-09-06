import Eyebrow from "../ui/Eyebrow";
import LeadFormC from "../LeadFormC";

export default function CustomSearchFormEN() {
  return (
    <section className="bg-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Custom search</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
          Didn't find what you're looking for?
        </h2>
        <p className="mt-4 text-ink">
          Tell us your city of interest, project type, required land size, and approximate
          budget, and we'll find opportunities aligned with your goals.
        </p>

        <div className="mt-10 rounded-lg border border-border bg-paper p-8 shadow-sm md:p-10">
          <LeadFormC locale="en" id="lead-search-en" />
        </div>
      </div>
    </section>
  );
}
