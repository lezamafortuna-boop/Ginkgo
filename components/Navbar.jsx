import LanguageSwitcher from "./LanguageSwitcher";

export default function NavbarES() {
  return (
    <nav className="bg-black text-white border-b border-[#333] px-8 py-4 flex items-center justify-between">
      <a href="/es" className="font-serif text-xl font-bold">
        Ginkgo
      </a>

      <div className="flex items-center gap-6 text-sm">
        <a href="/es/oportunidades" className="hover:text-[#C9A86A]">Oportunidades</a>
        <a href="/es/servicios" className="hover:text-[#C9A86A]">Servicios</a>
        <a href="/es/insights" className="hover:text-[#C9A86A]">Insights</a>
        <a href="/es/nosotros" className="hover:text-[#C9A86A]">Nosotros</a>
        <a href="/es/contacto" className="hover:text-[#C9A86A]">Contacto</a>

        <LanguageSwitcher />
      </div>
    </nav>
  );
}
