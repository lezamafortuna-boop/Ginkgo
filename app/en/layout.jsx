import NavbarEN from "@/components/en/NavbarEN";
import FooterEN from "@/components/en/FooterEN";
import FixedCTA from "@/components/FixedCTA";
import { getContactSettings } from "@/lib/siteSettings";
import SetHtmlLang from "@/components/SetHtmlLang";

export const metadata = {
  title: {
    default: "GINKGO — Strategic Land Opportunities in Mexico",
    template: "%s | GINKGO",
  },
  description:
    "Curated real estate development opportunities in Mexico for developers and investors.",
  alternates: {
    canonical: "/en",
    languages: { "es-MX": "/es", "en-US": "/en" },
  },
  openGraph: {
    siteName: "GINKGO",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default async function LayoutEN({ children }) {
  const { whatsappNumber } = await getContactSettings();

  return (
    <>
      <SetHtmlLang lang="en" />
      <NavbarEN />
      {children}
      <FooterEN />
      <FixedCTA whatsappNumber={whatsappNumber} />
    </>
  );
}
