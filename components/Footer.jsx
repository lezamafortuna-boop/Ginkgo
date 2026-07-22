export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-8 border-t border-[#333]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Contacto */}
        <div>
          <h3 className="text-xl font-serif font-bold mb-4 text-[#C9A86A]">
            Contacto
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>WhatsApp: <a href="https://wa.me/5210000000000" className="text-[#C9A86A]">+52 1 000 000 0000</a></li>
            <li>Email: <a href="mailto:contacto@ginkgo.mx" className="text-[#C9A86A]">contacto@ginkgo.mx</a></li>
          </ul>
        </div>

        {/* Redes */}
        <div>
          <h3 className="text-xl font-serif font-bold mb-4 text-[#C9A86A]">
            Síguenos
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="https://www.instagram.com/ginkgomex" target="_blank" className="text-[#C9A86A]">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/ginkgo-mx" target="_blank" className="text-[#C9A86A]">LinkedIn</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-serif font-bold mb-4 text-[#C9A86A]">
            Legal
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/es/privacidad" className="text-[#C9A86A]">Aviso de privacidad</a></li>
            <li><a href="/es/cookies" className="text-[#C9A86A]">Política de cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-12 text-sm">
        © {new Date().getFullYear()} Ginkgo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
