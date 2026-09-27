import type { Metadata } from "next";
import { vehicles } from "@/data/vehicles";
import { journeyTypes } from "@/data/journey-types";
import { locations } from "@/data/locations";
import { Hero } from "@/components/sections/Hero";
import { BenefitStrip } from "@/components/sections/BenefitStrip";
import { VehicleShowcase } from "@/components/sections/VehicleShowcase";
import { JourneyTypes } from "@/components/sections/JourneyTypes";
import { WhyCarRentalO } from "@/components/sections/WhyCarRentalO";
import { LocationExplorer } from "@/components/sections/LocationExplorer";
import { PopularHubsDirectory } from "@/components/sections/PopularHubsDirectory";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TravelStory } from "@/components/sections/TravelStory";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
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
      <PopularHubsDirectory />
      <HowItWorks />
      <TravelStory />
      <CustomerReviews />
      <FinalCTA />
    </>
  );
}
