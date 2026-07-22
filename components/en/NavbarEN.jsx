import LanguageSwitcher from "../LanguageSwitcher";

export default function NavbarEN() {
  return (
    <nav className="bg-black text-white border-b border-[#333] px-8 py-4 flex items-center justify-between">
      <a href="/en" className="font-serif text-xl font-bold">
        Ginkgo
      </a>

      <div className="flex items-center gap-6 text-sm">
        <a href="/en/opportunities" className="hover:text-[#C9A86A]">Opportunities</a>
        <a href="/en/services" className="hover:text-[#C9A86A]">Services</a>
        <a href="/en/insights" className="hover:text-[#C9A86A]">Insights</a>
        <a href="/en/about" className="hover:text-[#C9A86A]">About</a>
        <a href="/en/contact" className="hover:text-[#C9A86A]">Contact</a>

        <LanguageSwitcher />
      </div>
    </nav>
  );
}
