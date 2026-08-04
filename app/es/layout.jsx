import NavbarES from "@/components/es/NavbarES";
import FooterES from "@/components/es/FooterES";
import FixedCTA from "@/components/FixedCTA";
import SetHtmlLang from "@/components/SetHtmlLang";

export const metadata = {
  title: {
    default: "GINKGO — Oportunidades Estratégicas de Suelo en México",
    template: "%s | GINKGO",
  },
  description:
    "Explora oportunidades de desarrollo cuidadosamente seleccionadas en México para desarrolladores e inversionistas.",
  alternates: {
    canonical: "/es",
    languages: { "es-MX": "/es", "en-US": "/en" },
  },
  openGraph: {
    siteName: "GINKGO",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function LayoutES({ children }) {
  return (
    <>
      <SetHtmlLang lang="es" />
      <NavbarES />
      {children}
      <FooterES />
      <FixedCTA />
    </>
  );
}
