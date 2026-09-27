"use client";


import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Vehicle } from "@/data/vehicles";

const campaignFor: Record<Vehicle["slug"], string> = {
  suv: "/suv-rental",
  luxury: "/luxury-car-rental",
  sedan: "/car-rental",
  family: "/suv-rental",
  economy: "/car-rental",
  compact: "/car-rental",
  electric: "/car-rental",
  convertible: "/luxury-car-rental",
};

/* ───────── Feature Icons ───────── */
function IconUsers({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBag({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconGear({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconFuel({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 22h12" />
      <path d="M4 9h10" />
      <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
      <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
    </svg>
  );
}

/* ───────── Single Vehicle Card Component ───────── */
function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const quoteUrl = `/contact?vehicle=${vehicle.slug}#quote`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface-raised transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5">
      {/* ── Top Image Container ── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-mint/40">
        <Image
          src={vehicle.image}
          alt={`${vehicle.name} rental car`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Highlight badge on top-left */}
        <div className="absolute left-3.5 top-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/95 px-2.5 py-1 text-[11px] font-bold text-brand-strong shadow-xs backdrop-blur-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {vehicle.highlight}
          </span>
        </div>

        {/* Price tag on top-right */}
        <div className="absolute right-3.5 top-3.5 z-10">
          <div className="rounded-xl border border-white/40 bg-ink/80 px-2.5 py-1 text-right text-white shadow-sm backdrop-blur-xs">
            <span className="block text-[9px] font-medium uppercase tracking-wider text-white/70">
              Starting from
            </span>
            <span className="text-sm font-black text-white">
              ${vehicle.startingPrice}
              <span className="text-[11px] font-normal text-white/80">/day*</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Name and Tagline */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-ink group-hover:text-brand-strong transition-colors">
              {vehicle.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-ink-muted">
              {vehicle.tagline}
            </p>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-y border-line/80 py-3 text-xs">
          <div className="flex items-center gap-2 text-ink-soft">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-mint/70 text-brand-strong">
              <IconUsers />
            </span>
            <span className="truncate font-semibold">{vehicle.passengers} Passengers</span>
          </div>

          <div className="flex items-center gap-2 text-ink-soft">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-mint/70 text-brand-strong">
              <IconBag />
            </span>
            <span className="truncate font-semibold">{vehicle.bags} Bags</span>
          </div>

          <div className="flex items-center gap-2 text-ink-soft">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-mint/70 text-brand-strong">
              <IconGear />
            </span>
            <span className="truncate font-semibold">{vehicle.transmission}</span>
          </div>

          <div className="flex items-center gap-2 text-ink-soft">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-mint/70 text-brand-strong">
              <IconFuel />
            </span>
            <span className="truncate font-semibold">{vehicle.fuel}</span>
          </div>
        </div>

        {/* Short description */}
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ink-muted">
          {vehicle.description}
        </p>

        {/* ── Footer CTA ── */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                Example starting rate
              </p>
              <p className="text-base font-extrabold text-ink">
                ${vehicle.startingPrice}
                <span className="text-xs font-semibold text-ink-muted">/day*</span>
              </p>
            </div>

            <Link
              href={quoteUrl}
              onClick={() => trackEvent("vehicle_clicked", { category: vehicle.slug })}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs shadow-brand/20 transition-all duration-200 hover:bg-brand-strong hover:shadow-md hover:shadow-brand/30 active:scale-[0.98]"
            >
              <span>Find Your Rental Car</span>
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h12m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Main Vehicle Showcase Component ───────── */
export function VehicleShowcase({ vehicles: vehicleList }: { vehicles: Vehicle[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = useMemo(() => [
    { id: "all", label: "All Vehicles" },
    { id: "suv-family", label: "SUVs & Vans" },
    { id: "sedan-compact", label: "Sedans & Compacts" },
    { id: "luxury-electric", label: "Luxury & Electric" },
  ], []);

  const filteredVehicles = useMemo(() => {
    if (activeCategory === "all") return vehicleList;
    if (activeCategory === "suv-family") {
      return vehicleList.filter((v) => ["suv", "family"].includes(v.slug));
    }
    if (activeCategory === "sedan-compact") {
      return vehicleList.filter((v) => ["sedan", "compact", "economy"].includes(v.slug));
    }
    if (activeCategory === "luxury-electric") {
      return vehicleList.filter((v) => ["luxury", "electric", "convertible"].includes(v.slug));
    }
    return vehicleList;
  }, [activeCategory, vehicleList]);

  return (
    <section
      id="vehicles"
      aria-labelledby="vehicles-heading"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-3 pb-20 pt-16 sm:px-6"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-strong">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Explore Fleet & Rates
          </div>
          <h2
            id="vehicles-heading"
            className="mt-2.5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
          >
            The right size for every trip.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Choose from economical city commuters to spacious family SUVs, luxury sedans, and open-top convertibles.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                activeCategory === cat.id
                  ? "bg-brand text-white shadow-sm shadow-brand/25"
                  : "border border-line bg-surface text-ink-soft hover:border-brand/40 hover:bg-mint/40 hover:text-brand-strong"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Vehicles Grid ── */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.slug} vehicle={vehicle} />
        ))}
      </div>

      {/* ── Pricing Disclaimer Strip ── */}
      <div className="mt-8 rounded-2xl border border-line bg-surface p-4 text-center sm:p-5">
        <p className="text-xs text-ink-muted">
          <strong className="text-ink-soft">*Pricing Disclaimer:</strong> Rates vary by location, vehicle availability, driver age, and travel dates.
          Every enquiry receives a tailored, all-inclusive personal quote with transparent pricing and no hidden booking fees.
        </p>
      </div>
    </section>
  );
}
