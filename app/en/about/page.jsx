export default function AboutEN() {
  return (
    <main className="bg-[#0D0D0D] text-white">

      {/* FIXED CTA BUTTON */}
      <a
        href="#formEN"
        className="fixed bottom-6 right-6 bg-[#C9A86A] text-black font-semibold px-5 py-3 rounded shadow-lg z-50"
      >
        Request Information
      </a>

      {/* HERO */}
      <section className="py-24 px-8 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">
          About Ginkgo
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A specialized firm focused on identifying, analyzing, and structuring real estate development opportunities.
        </p>
      </section>

      {/* COMMERCIAL PHILOSOPHY */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Commercial Philosophy
        </h2>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] leading-relaxed text-gray-300">
          <p className="mb-6">
            We are not a land catalog. We aim to be recognized as a firm that identifies development opportunities.
          </p>

          <p className="mb-6">
            Properties change constantly. What remains is our ability to analyze them, structure them, and connect opportunities with developers and investors.
          </p>

          <p className="mb-6">
            For this reason, we only showcase the most relevant opportunities. The rest of the portfolio is presented personally according to each client's profile.
          </p>
        </div>
      </section>

      {/* CONVERSION FUNNEL */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          A Conversion‑Driven Experience
        </h2>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] text-gray-300 leading-relaxed">
          <p className="mb-6">
            The website is not an institutional site. It is a conversion funnel. Every section is designed to lead the user to request information.
          </p>

          <ul className="list-disc list-inside space-y-3">
            <li>Fixed “Request Information” button.</li>
            <li>CTAs at the end of every section.</li>
            <li>Forms integrated at strategic points.</li>
            <li>Clear, direct, action‑oriented content.</li>
          </ul>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          How We Work
        </h2>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] text-gray-300 leading-relaxed">
          <p className="mb-6">
            We identify opportunities through urban, technical, and commercial analysis. We structure information to support strategic decisions.
          </p>

          <p className="mb-6">
            We connect opportunities with developers and investors through a specialized, consultative approach.
          </p>
        </div>
      </section>

      {/* CTA + FORM */}
      <section id="formEN" className="py-20 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Want access to our full portfolio?
        </h2>
        <p className="text-gray-400 mb-12">
          Tell us your requirements and we will present opportunities aligned with your profile.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Name" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Email" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Phone" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Company (optional)" />
          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Request Information
          </button>
        </form>
      </section>
    </main>
  );
}
