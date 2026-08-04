import Link from "next/link";
import Image from "next/image";
import { MailIcon, PhoneIcon, InstagramIcon } from "../ui/icons";

export default function FooterES() {
  return (
    <footer className="border-t border-border bg-paper px-6 py-16 md:px-10">
      <div className="mx-auto mb-12 flex max-w-6xl items-center gap-2 font-serif text-lg font-semibold text-charcoal">
        <Image src="/images/ginkgo-icon.png" alt="" width={28} height={31} className="h-7 w-auto" />
        Ginkgo
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-teal-600">Contacto</h3>
          <ul className="space-y-3 text-sm text-ink">
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <a href="https://wa.me/524425088204" className="hover:text-teal-600">
                +52 442 508 8204
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <a href="mailto:tonatiuhcervantes@ginkgomx.com" className="break-words hover:text-teal-600">
                tonatiuhcervantes@ginkgomx.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-teal-600">Síguenos</h3>
          <ul className="space-y-3 text-sm text-ink">
            <li className="flex items-start gap-2">
              <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <a
                href="https://www.instagram.com/ginkgomex"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/ginkgo-mx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-teal-600">Legal</h3>
          <ul className="space-y-2 text-sm text-ink">
            <li>
              <Link href="/es/privacidad" className="hover:text-teal-600">
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link href="/es/cookies" className="hover:text-teal-600">
                Política de cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl text-center text-xs text-muted">
        © {new Date().getFullYear()} Ginkgo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
