import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/landing/hero";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { Stats } from "@/components/landing/stats";
import { Features } from "@/components/landing/features";
import { RuntimeShowcase } from "@/components/landing/runtime-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { UseCases } from "@/components/landing/use-cases";
import { Pricing } from "@/components/landing/pricing";
import { Stack } from "@/components/landing/stack";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Compare } from "@/components/landing/compare";
import { DeepDive } from "@/components/landing/deep-dive";
import { FAQ } from "@/components/landing/faq";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <LogoCloud />
        <Stats />
        <Features />
        <RuntimeShowcase />
        <DeepDive />
        <UseCases />
        <Compare />
        <HowItWorks />
        <Stack />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
