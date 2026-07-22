import { opportunities } from "@/data/opportunities";

export default function OpportunityDetailEN({ params }) {
  const opportunity = opportunities.find((op) => op.slug === params.slug);

  if (!opportunity) {
    return <div className="text-white p-20">Opportunity not found.</div>;
  }

  return (
    <main className="bg-[#0D0D0D] text-white">

      {/* HERO */}
      <section
        className="relative h-[60vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${opportunity.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-5xl font-serif font-bold">
          {opportunity.name}
        </h1>
      </section>

      {/* ESSENTIAL INFO */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8">Essential Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          <p><strong>Surface:</strong> {opportunity.surface}</p>
          <p><strong>Land Use:</strong> {opportunity.vocation}</p>
          <p><strong>Availability:</strong> {opportunity.availability}</p>
        </div>
      </section>

      {/* WHY THIS OPPORTUNITY */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8">
          Why This Opportunity?
        </h2>

        <ul className="space-y-4 text-gray-300">
          {opportunity.reasons.map((reason, i) => (
            <li key={i} className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333]">
              {reason}
            </li>
          ))}
        </ul>
      </section>

      {/* LOCATION */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8">Location</h2>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          <img
            src={opportunity.mapImage}
            className="w-full h-80 object-cover rounded mb-6"
          />

          <ul className="space-y-2 text-gray-300">
            {opportunity.distances.map((dist, i) => (
              <li key={i}>{dist}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* DEVELOPMENT POTENTIAL */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8">
          Development Potential
        </h2>

        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          {opportunity.developmentPotential}
        </p>
      </section>

      {/* TECHNICAL SHEET */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8">
          Technical Specifications
        </h2>

        <a
          href={opportunity.techSheet}
          target="_blank"
          className="px-6 py-3 bg-[#C9A86A] text-black font-semibold rounded"
        >
          Download Technical Sheet
        </a>
      </section>

      {/* DOSSIER DOWNLOAD */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-8">
          Download the Dossier
        </h2>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Name" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Email" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Phone" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Company (optional)" />

          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Download Dossier
          </button>
        </form>
      </section>
    </main>
  );
}
