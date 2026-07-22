export default function ContactEN() {
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
          Contact
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We are here to help you find strategic development opportunities.
        </p>
      </section>

      {/* CONTACT INFO */}
      <section className="py-20 px-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          <h3 className="text-xl font-serif font-bold mb-4 text-[#C9A86A]">
            WhatsApp
          </h3>
          <p className="text-gray-300">
            <a href="https://wa.me/524425088204" target="_blank" className="text-[#C9A86A]">
              +52 442 508 8204
            </a>
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          <h3 className="text-xl font-serif font-bold mb-4 text-[#C9A86A]">
            Email
          </h3>
          <p className="text-gray-300">
            <a href="mailto:tonatiuhcervantes@ginkgomx.com" className="text-[#C9A86A]">
              tonatiuhcervantes@ginkgomx.com
            </a>
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333]">
          <h3 className="text-xl font-serif font-bold mb-4 text-[#C9A86A]">
            Instagram
          </h3>
          <p className="text-gray-300">
            <a
              href="https://www.instagram.com/ginkgomex?igsh=MXVpd3h0dGNhdHh0cQ=="
              target="_blank"
              className="text-[#C9A86A]"
            >
              @ginkgomex
            </a>
          </p>
        </div>
      </section>

      {/* FORM */}
      <section id="formEN" className="py-20 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">
          Request Information
        </h2>
        <p className="text-gray-400 mb-12">
          Tell us your requirements and we will present opportunities aligned with your profile.
        </p>

        <form className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] grid grid-cols-1 md:grid-cols-2 gap-6">
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Name" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Email" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Phone" />
          <input className="bg-[#0D0D0D] p-3 rounded text-white" placeholder="Company (optional)" />
          <textarea
            className="bg-[#0D0D0D] p-3 rounded text-white md:col-span-2"
            placeholder="Tell us what type of opportunity you're looking for"
            rows={4}
          ></textarea>

          <button className="bg-[#C9A86A] text-black font-semibold py-3 rounded md:col-span-2">
            Submit request
          </button>
        </form>
      </section>
    </main>
  );
}
