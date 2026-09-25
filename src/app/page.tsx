import type { Metadata } from "next";
import Link from "next/link";
import { vehicles } from "@/data/vehicles";
import { journeyTypes } from "@/data/journey-types";
import { locations } from "@/data/locations";
import { faqs } from "@/data/faqs";
import { Hero } from "@/components/sections/Hero";
import { BenefitStrip } from "@/components/sections/BenefitStrip";
import { VehicleShowcase } from "@/components/sections/VehicleShowcase";
import { JourneyTypes } from "@/components/sections/JourneyTypes";
import { WhyCarRentalO } from "@/components/sections/WhyCarRentalO";
import { LocationExplorer } from "@/components/sections/LocationExplorer";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TravelStory } from "@/components/sections/TravelStory";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="pt-8">
        <BenefitStrip />
      </div>
      <VehicleShowcase vehicles={vehicles} />
      <JourneyTypes journeys={journeyTypes} />
      <WhyCarRentalO />
      <LocationExplorer locations={locations} />
      <HowItWorks />
      <TravelStory />
      <TrustPoints />
      <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <h2 id="faq-heading" className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Questions, answered.
        </h2>
        <div className="mt-8">
          <FAQAccordion faqs={faqs} />
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          Something else on your mind?{" "}
          <Link href="/contact" className="font-semibold text-brand-strong hover:underline">
            Ask us directly
          </Link>
          .
        </p>
      </section>
      <FinalCTA />
    </>
  );
}
