import { HeroSection } from "@/components/home/hero-section"
import { ServicesOverview } from "@/components/home/services-overview"
import { PopularDestinations } from "@/components/home/popular-destinations"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { Testimonials } from "@/components/home/testimonials"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <PopularDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  )
}
