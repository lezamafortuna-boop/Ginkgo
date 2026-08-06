import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import LeadForm from "@/components/LeadForm";
import { MailIcon, PhoneIcon, InstagramIcon } from "@/components/ui/icons";

export const metadata = {
  title: "Contacto",
  description: "Estamos aquí para ayudarte a encontrar oportunidades estratégicas de desarrollo.",
  alternates: {
    canonical: "/es/contacto",
    languages: { "es-MX": "/es/contacto", "en-US": "/en/contact" },
  },
};

export default function ContactoES() {
  return (
    <main className="bg-cream">
      <section className="px-6 py-24 text-center md:px-10">
        <Eyebrow>Hablemos</Eyebrow>
        <h1 className="mx-auto mt-2 max-w-2xl font-serif text-4xl font-semibold text-charcoal md:text-5xl">
          Contacto
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink">
          Estamos aquí para ayudarte a encontrar oportunidades estratégicas de desarrollo.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 pb-16 md:grid-cols-3 md:px-10">
        <Card className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <PhoneIcon />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-lg font-semibold text-charcoal">WhatsApp</h3>
            <a
              href="https://wa.me/524425088204"
              className="mt-1 block text-sm text-ink hover:text-teal-600"
            >
              +52 442 508 8204
            </a>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <MailIcon />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-lg font-semibold text-charcoal">Correo</h3>
            <a
              href="mailto:tonatiuhcervantes@ginkgomx.com"
              title="tonatiuhcervantes@ginkgomx.com"
              className="mt-1 block text-sm text-ink hover:text-teal-600"
            >
              Enviar correo
            </a>
          </div>
        </Card>

        <Card className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
            <InstagramIcon />
          </div>
          <div className="min-w-0">
            <h3 className="font-serif text-lg font-semibold text-charcoal">Instagram</h3>
            <a
              href="https://www.instagram.com/ginkgomex?igsh=MXVpd3h0dGNhdHh0cQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-ink hover:text-teal-600"
            >
              @ginkgomex
            </a>
          </div>
        </Card>
      </section>

      <section id="formulario" className="bg-paper px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Solicitar información
          </h2>
          <p className="mt-4 text-ink">
            Cuéntanos tus necesidades y te presentaremos oportunidades alineadas con tu perfil.
          </p>
          <div className="mt-10 rounded-lg border border-border bg-cream p-8 text-left shadow-sm md:p-10">
            <LeadForm locale="es" source="ES - Contacto" id="lead-contacto" />
          </div>
        </div>
      </section>
    </main>
  );
}
