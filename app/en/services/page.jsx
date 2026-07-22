export default function ServicesEN() {
  return (
    <main className="bg-[#0D0D0D] text-white">

      {/* HERO */}
      <section className="py-24 px-8 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">
          Services
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Specialized solutions for developers and investors seeking strategic land opportunities in Mexico.
        </p>
      </section>

      {/* OPPORTUNITY IDENTIFICATION */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Opportunity Identification
        </h2>
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          We analyze growth corridors, infrastructure, land vocation, and urban trends to identify land with high development potential. Our approach combines technical, urban, and commercial analysis.
        </p>
      </section>

      {/* ANALYSIS & STRUCTURING */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Analysis & Structuring
        </h2>
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          We evaluate each opportunity from an integral perspective: land size, access, infrastructure, regulations, vocation, and appreciation potential. We structure information to support decision-making.
        </p>
      </section>

      {/* SPECIALIZED COMMERCIALIZATION */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Specialized Commercialization
        </h2>
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          We connect opportunities with developers and investors through long-term, strategy-driven commercial approaches. We present clear, technical, and reliable information.
        </p>
      </section>

      {/* FULL SUPPORT */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Full Support
        </h2>
        <p className="text-gray-300 leading-relaxed bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          We provide support throughout the entire process: from the first contact to final negotiation. Our goal is to facilitate informed and secure decisions.
        </p>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Looking for land to develop?
        </h2>
        <p className="text-gray-400 mb-12">
          Tell us your requirements and we will find opportunities aligned with your goals.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Name" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Email" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Phone" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Company (optional)" />
          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Submit request
          </button>
        </form>
      </section>
    </main>
  );
}
