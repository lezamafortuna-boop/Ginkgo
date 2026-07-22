import Hero from "@/components/Hero";
import FeaturedOpportunities from "@/components/FeaturedOpportunities";
import WhyGinkgo from "@/components/WhyGinkgo";
import Process from "@/components/Process";
import StrategicRegions from "@/components/StrategicRegions";
import InstagramFeed from "@/components/InstagramFeed";
import CustomSearchForm from "@/components/CustomSearchForm";
import ProjectCTA from "@/components/ProjectCTA";

export default function HomeES() {
  return (
    <>
      {/* 1. Hero Principal */}
      <Hero />

      {/* 2. Oportunidades Destacadas */}
      <FeaturedOpportunities />

      {/* 3. ¿Por qué Ginkgo? */}
      <WhyGinkgo />

      {/* 4. Nuestro Proceso */}
      <Process />

      {/* 5. Regiones Estratégicas */}
      <StrategicRegions />

      {/* 6. Instagram */}
      <InstagramFeed />

      {/* 7. ¿No encontraste lo que buscas? */}
      <CustomSearchForm />

      {/* 8. Hablemos de tu próximo proyecto */}
      <ProjectCTA />
    </>
  );
}
