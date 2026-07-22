import { sanity } from "@/lib/sanity";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "GINKGO — Oportunidades Estratégicas de Suelo en México",
  description:
    "Explora oportunidades de desarrollo cuidadosamente seleccionadas en México. Activos de suelo premium para proyectos residenciales, comerciales y de usos mixtos.",
  openGraph: {
    title: "GINKGO — Oportunidades Estratégicas de Suelo",
    description:
      "Explora oportunidades de desarrollo cuidadosamente seleccionadas en México.",
    url: "https://ginkgo.mx/es",
    siteName: "GINKGO",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "GINKGO — Oportunidades Estratégicas de Suelo"
      }
    ],
    locale: "es_MX",
    type: "website"
  }
};

export const revalidate = 60;

async function getOpportunities() {
  return await sanity.fetch(`*[_type == "opportunity"]`);
}

export default async function Page() {
  const opportunities = await getOpportunities();
  return <HomeClient opportunities={opportunities} />;
}
