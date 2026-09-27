import type { Metadata } from "next";
import Image from "next/image";
import { locations } from "@/data/locations";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Rental Locations",
  description:
    "Popular pick-up locations for CarRentalO enquiries. Somewhere else in mind? Send an enquiry — we confirm coverage for your exact pick-up point.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-3 py-12 sm:px-6 md:py-16">
        <Badge>Locations</Badge>
        <h1 className="mt-4 max-w-xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Where would you like to pick up your car?
        </h1>
        <p className="mt-4 max-w-lg text-ink-muted">
          These are popular starting points for enquiries. If your trip starts
          somewhere else, send an enquiry anyway — we confirm coverage for your
          exact pick-up point with every quote.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc) => (
            <div
              key={loc.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface-raised"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-mint">
                <Image
                  src={loc.image}
                  alt={`${loc.city}, ${loc.country}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute right-3 top-3">
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink shadow-xs backdrop-blur-xs">
                    {loc.airportCode}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-ink">{loc.city}</h2>
                  <span className="text-xs font-bold text-brand-strong">
                    from ${loc.startingPrice}/day*
                  </span>
                </div>
                <p className="text-sm text-ink-muted">{loc.state ? `${loc.state}, ${loc.country}` : loc.country}</p>
                <div className="mt-4">
                  <Button
                    href={`/contact?pickupLocation=${encodeURIComponent(loc.city)}#quote`}
                    variant="secondary"
                  >
                    Enquire for {loc.city}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FinalCTA />
    </>
  );
}
