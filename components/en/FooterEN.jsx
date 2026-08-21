import Link from "next/link";
import Image from "next/image";
import { MailIcon, WhatsAppIcon, InstagramIcon } from "../ui/icons";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/contact";
import { buildWhatsappUrl, GENERIC_MESSAGE } from "@/lib/whatsapp";

const whatsappUrl = buildWhatsappUrl(WHATSAPP_NUMBER, GENERIC_MESSAGE.en);

export default function FooterEN() {
  return (
    <footer className="border-t border-border bg-paper px-6 py-16 md:px-10">
      <div className="mx-auto mb-12 flex max-w-6xl items-center">
        <span className="flex items-center rounded-md bg-charcoal px-3 py-2">
          <span className="relative h-6 w-[46px] shrink-0">
            <Image src="/images/ginkgo-logo.png" alt="Ginkgo" fill sizes="46px" className="object-contain" />
          </span>
        </span>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-brand-600">Contact</h3>
          <ul className="space-y-3 text-sm text-ink">
            <li className="flex items-start gap-2">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
                WhatsApp — {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                title={CONTACT_EMAIL}
                className="hover:text-brand-600"
              >
                Send an email
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-brand-600">Follow us</h3>
          <ul className="space-y-3 text-sm text-ink">
            <li className="flex items-start gap-2">
              <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg font-semibold text-brand-600">Legal</h3>
          <ul className="space-y-2 text-sm text-ink">
            <li>
              <Link href="/en/privacy" className="hover:text-brand-600">
                Privacy Notice
              </Link>
            </li>
            <li>
              <Link href="/en/cookies" className="hover:text-brand-600">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl text-center text-xs text-muted">
        © {new Date().getFullYear()} Ginkgo. All rights reserved.
      </div>
    </footer>
  );
}
