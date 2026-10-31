import HeroES from "@/components/es/HeroES";
import FeaturedOpportunitiesES from "@/components/es/FeaturedOpportunitiesES";
import BrandTagline from "@/components/BrandTagline";
import WhyGinkgoES from "@/components/es/WhyGinkgoES";
import ProcessES from "@/components/es/ProcessES";
import StrategicRegionsES from "@/components/es/StrategicRegionsES";
import InstagramFeedES from "@/components/es/InstagramFeedES";
import CustomSearchFormES from "@/components/es/CustomSearchFormES";
import ProjectCTAES from "@/components/es/ProjectCTAES";

export const revalidate = 60;

export default function HomeES() {
  return (
    <>
      <HeroES />
      <FeaturedOpportunitiesES />
      <BrandTagline locale="es" />
      <WhyGinkgoES />
      <ProcessES />
      <StrategicRegionsES />
      <InstagramFeedES />
      <CustomSearchFormES />
      <ProjectCTAES />
    </>
  );
}
