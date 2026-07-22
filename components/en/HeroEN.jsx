export default function HeroEN() {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-3xl text-center px-6">
        <h1 className="text-5xl font-serif font-bold mb-4">
          Real Estate Development Opportunities in Mexico
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          We identify, structure, and market real estate opportunities for developers and investors.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <a
            href="/en/opportunities"
            className="px-6 py-3 bg-[#C9A86A] text-black font-semibold rounded"
          >
            Explore opportunities
          </a>

          <a
            href="#formEN"
            className="px-6 py-3 border border-white rounded"
          >
            Request information
          </a>
        </div>

        <form
          id="formEN"
          className="bg-black/70 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input className="bg-[#1A1A1A] p-3 rounded text-white" placeholder="Name" />
          <input className="bg-[#1A1A1A] p-3 rounded text-white" placeholder="Email" />
          <input className="bg-[#1A1A1A] p-3 rounded text-white" placeholder="Phone" />
          <input className="bg-[#1A1A1A] p-3 rounded text-white" placeholder="Company (optional)" />
          <input className="bg-[#1A1A1A] p-3 rounded text-white md:col-span-2" placeholder="Project type" />

          <button
            className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2"
          >
            Submit request
          </button>
        </form>
      </div>
    </section>
  );
}
