import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadForm from "@/components/LeadForm";
import { MailIcon, WhatsAppIcon, InstagramIcon } from "@/components/ui/icons";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, CONTACT_EMAIL } from "@/lib/contact";
import { buildWhatsappUrl, GENERIC_MESSAGE } from "@/lib/whatsapp";

const whatsappUrl = buildWhatsappUrl(WHATSAPP_NUMBER, GENERIC_MESSAGE.en);

export const metadata = {
  title: "Contact",
  description: "We are here to help you find strategic development opportunities.",
  alternates: {
    canonical: "/en/contact",
    languages: { "es-MX": "/es/contacto", "en-US": "/en/contact" },
  },
};

export default function ContactEN() {
  return (
    <main className="bg-cream">
      <section className="px-6 py-24 text-center md:px-10">
        <Eyebrow>Let's talk</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Contact
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">
          We are here to help you find strategic development opportunities.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-16 md:grid-cols-3 md:px-10">
        <Card className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <WhatsAppIcon />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-lg font-semibold text-charcoal">WhatsApp</h3>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-ink hover:text-brand-600"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <MailIcon />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-lg font-semibold text-charcoal">Email</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              title={CONTACT_EMAIL}
              className="mt-1 block text-sm text-ink hover:text-brand-600"
            >
              Send an email
            </a>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <InstagramIcon />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-lg font-semibold text-charcoal">Instagram</h3>
            <a
              href="https://www.instagram.com/ginkgomex?igsh=MXVpd3h0dGNhdHh0cQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-ink hover:text-brand-600"
            >
              @ginkgomex
            </a>
          </div>
        </Card>
      </section>

      <section id="formEN" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Request Information
          </h2>
          <p className="mt-4 text-ink">
            Tell us your requirements and we will present opportunities aligned with your
            profile.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadForm locale="en" source="EN - Contact" id="lead-contact" />
          </div>
        </div>
      </section>
    </main>
  );
}
