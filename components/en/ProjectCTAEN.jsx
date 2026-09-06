import LeadFormD from "../LeadFormD";

export default function ProjectCTAEN() {
  return (
    <section className="bg-charcoal px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl font-semibold md:text-4xl">
          Let's talk about your next project
        </h2>
        <p className="mt-4 text-lg text-white/75">
          Tell us what type of development you're looking for and we'll present opportunities
          aligned with your goals.
        </p>

        <div className="mt-10 rounded-lg bg-paper p-8 text-left shadow-lg md:p-10">
          <LeadFormD locale="en" id="lead-project-en" />
        </div>
      </div>
    </section>
  );
}
