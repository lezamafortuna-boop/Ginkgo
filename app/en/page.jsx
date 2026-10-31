import HeroEN from "@/components/en/HeroEN";
import FeaturedOpportunitiesEN from "@/components/en/FeaturedOpportunitiesEN";
import BrandTagline from "@/components/BrandTagline";
import WhyGinkgoEN from "@/components/en/WhyGinkgoEN";
import ProcessEN from "@/components/en/ProcessEN";
import StrategicRegionsEN from "@/components/en/StrategicRegionsEN";
import InstagramFeedEN from "@/components/en/InstagramFeedEN";
import CustomSearchFormEN from "@/components/en/CustomSearchFormEN";
import ProjectCTAEN from "@/components/en/ProjectCTAEN";

export const revalidate = 60;

export default function HomeEN() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroEN />

      {/* 2. Featured Opportunities */}
      <FeaturedOpportunitiesEN />

      {/* Brand tagline */}
      <BrandTagline locale="en" />

      {/* 3. Why Ginkgo */}
      <WhyGinkgoEN />

      {/* 4. Our Process */}
      <ProcessEN />

      {/* 5. Strategic Regions */}
      <StrategicRegionsEN />

      {/* 6. Instagram */}
      <InstagramFeedEN />

      {/* 7. Didn’t find what you’re looking for? */}
      <CustomSearchFormEN />

      {/* 8. Let's talk about your next project */}
      <ProjectCTAEN />
    </>
  );
}
