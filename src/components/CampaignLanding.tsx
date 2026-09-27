import Image from "next/image";
import type { Campaign } from "@/data/campaigns";
import { getVehicle, vehicles } from "@/data/vehicles";
import { faqs } from "@/data/faqs";
import { SearchWidget } from "@/components/SearchWidget";
import { VehicleShowcase } from "@/components/sections/VehicleShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Template for Google Ads landing pages: campaign-specific hero and
 * content assembled from data/campaigns.ts.
 */
export function CampaignLanding({ campaign }: { campaign: Campaign }) {
  const campaignVehicles =
    campaign.vehicleSlugs.length === vehicles.length
      ? vehicles
      : campaign.vehicleSlugs.map(getVehicle);
  const campaignFaqs = faqs.slice(...campaign.faqSlice);

  return (
    <>
      <section aria-label="Intro" className="relative overflow-visible">
        <div className="mx-auto max-w-[1400px] px-3 pb-8 pt-8 sm:px-6 md:pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="animate-fade-up">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
                {campaign.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
                {campaign.h1}
              </h1>
              <p className="mt-5 max-w-md text-lg text-ink-muted">{campaign.intro}</p>
            </div>
            <div className="relative hidden lg:block">
              <div className="animate-rise-in overflow-hidden rounded-[2rem] border border-line bg-mint shadow-lg shadow-ink/5">
                <Image
                  src={campaign.heroImage}
                  alt=""
                  width={1600}
                  height={900}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-30 mx-auto max-w-[1400px] px-3 pb-16 sm:px-4 md:pb-24">
          <div className="overflow-visible -mb-8 lg:-mt-4">
            <SearchWidget />
          </div>
        </div>
      </section>

      <div className="pt-8">
        <VehicleShowcase vehicles={campaignVehicles} />
      </div>

      <section aria-label="Benefits" className="bg-beige/60 py-16">
        <div className="mx-auto grid max-w-[1400px] gap-5 px-3 sm:px-4 md:grid-cols-3">
          {campaign.benefits.map((b) => (
            <div key={b.title} className="rounded-3xl bg-surface-raised p-7">
              <h2 className="font-bold text-ink">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />

      <section aria-labelledby="campaign-faq-heading" className="mx-auto max-w-3xl px-3 py-16 sm:px-6">
        <h2 id="campaign-faq-heading" className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Good to know.
        </h2>
        <div className="mt-6">
          <FAQAccordion faqs={campaignFaqs} />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
