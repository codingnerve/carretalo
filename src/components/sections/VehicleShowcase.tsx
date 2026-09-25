"use client";

import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/data/vehicles";
import { trackEvent } from "@/lib/analytics";
import { Badge } from "@/components/ui/Badge";

const campaignFor: Record<Vehicle["slug"], string> = {
  suv: "/suv-rental",
  luxury: "/luxury-car-rental",
  sedan: "/car-rental",
  family: "/suv-rental",
  economy: "/car-rental",
  compact: "/car-rental",
};

function CardShell({
  vehicle,
  large = false,
}: {
  vehicle: Vehicle;
  large?: boolean;
}) {
  return (
    <Link
      href={campaignFor[vehicle.slug]}
      onClick={() => trackEvent("vehicle_clicked", { category: vehicle.slug })}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface-raised transition-shadow hover:shadow-lg hover:shadow-ink/8 ${
        large ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-mint ${large ? "aspect-[4/3] sm:aspect-auto sm:flex-1" : "aspect-[4/3]"}`}>
        <Image
          src={vehicle.image}
          alt={`${vehicle.name} rental car`}
          fill
          sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-col gap-1.5 p-5 ${large ? "sm:p-6" : ""}`}>
        <div className="flex items-center justify-between gap-2">
          <h3 className={`font-bold text-ink ${large ? "text-2xl" : "text-lg"}`}>{vehicle.name}</h3>
          {vehicle.seats && <Badge>{vehicle.seats}</Badge>}
        </div>
        <p className={`font-medium text-brand-strong ${large ? "text-base" : "text-sm"}`}>
          {vehicle.tagline}
        </p>
        {large && <p className="mt-1 max-w-md text-sm text-ink-muted">{vehicle.description}</p>}
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ink group-hover:text-brand-strong">
          Explore {vehicle.name.toLowerCase()} rentals
          <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10h12m-5-5l5 5-5 5" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function VehicleShowcase({ vehicles }: { vehicles: Vehicle[] }) {
  const featured = vehicles.find((v) => v.featured) ?? vehicles[0];
  const rest = vehicles.filter((v) => v !== featured);

  return (
    <section id="vehicles" aria-labelledby="vehicles-heading" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 pt-24 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
            Explore vehicles
          </p>
          <h2 id="vehicles-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            The right size for every trip.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-ink-muted">
          Pricing depends on your location and dates — every enquiry gets a
          personal quote, not a generic rate.
        </p>
      </div>

      {/* Asymmetric editorial grid: one large feature card + mixed small cards. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardShell vehicle={featured} large />
        {rest.map((v) => (
          <CardShell key={v.slug} vehicle={v} />
        ))}
      </div>
    </section>
  );
}
