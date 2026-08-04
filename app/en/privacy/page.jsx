import Card from "@/components/ui/Card";

export const metadata = {
  title: "Privacy Notice",
  alternates: {
    canonical: "/en/privacy",
    languages: { "es-MX": "/es/privacidad", "en-US": "/en/privacy" },
  },
};

export default function PrivacyEN() {
  return (
    <main className="min-h-screen bg-cream px-6 py-20 md:px-10">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-6 font-serif text-4xl font-semibold text-charcoal">Privacy Notice</h1>
        <p className="mb-8 text-ink">
          This notice summarizes how Ginkgo collects, uses, and protects user information.
        </p>

        <Card className="space-y-6 leading-relaxed text-ink">
          <p>
            Ginkgo collects contact data voluntarily provided by users, such as name, email,
            phone, and company.
          </p>
          <p>
            This information is used exclusively to follow up on information requests, share
            opportunities, and maintain communication related to our services.
          </p>
          <p>
            We do not share personal data with third parties outside the commercial relationship,
            except when legally required.
          </p>
          <p>
            Users may request the update or deletion of their data by writing to{" "}
            <a href="mailto:tonatiuhcervantes@ginkgomx.com" className="text-teal-600 hover:underline">
              tonatiuhcervantes@ginkgomx.com
            </a>
            .
          </p>
        </Card>
      </section>
    </main>
  );
}
