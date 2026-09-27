"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const AIRPORT_HUBS = [
  { code: "ATL", city: "Atlanta" },
  { code: "JFK", city: "New York" },
  { code: "LAX", city: "Los Angeles" },
  { code: "MCO", city: "Orlando" },
  { code: "MIA", city: "Miami" },
  { code: "LAS", city: "Las Vegas" },
  { code: "ORD", city: "Chicago" },
  { code: "DFW", city: "Dallas" },
  { code: "DEN", city: "Denver" },
  { code: "SFO", city: "San Francisco" },
  { code: "SEA", city: "Seattle" },
  { code: "BOS", city: "Boston" },
  { code: "EWR", city: "Newark" },
  { code: "IAH", city: "Houston" },
  { code: "PHX", city: "Phoenix" },
  { code: "FLL", city: "Fort Lauderdale" },
  { code: "IAD", city: "Washington DC" },
  { code: "SAN", city: "San Diego" },
  { code: "CLT", city: "Charlotte" },
  { code: "DTW", city: "Detroit" },
];

const CITY_HUBS = [
  { city: "Miami", state: "FL" },
  { city: "Orlando", state: "FL" },
  { city: "Las Vegas", state: "NV" },
  { city: "Los Angeles", state: "CA" },
  { city: "New York", state: "NY" },
  { city: "Chicago", state: "IL" },
  { city: "Dallas", state: "TX" },
  { city: "Houston", state: "TX" },
  { city: "Atlanta", state: "GA" },
  { city: "Phoenix", state: "AZ" },
];

const RENTAL_BRANDS = [
  { brand: "Hertz", type: "Rental" },
  { brand: "Avis", type: "Rental" },
  { brand: "Budget", type: "Rental" },
  { brand: "Alamo", type: "Rental" },
  { brand: "Dollar", type: "Rental" },
  { brand: "Thrifty", type: "Rental" },
  { brand: "Sixt", type: "Rental" },
  { brand: "Enterprise", type: "Rental" },
  { brand: "National", type: "Rental" },
];

/* ───────── Icons ───────── */
function IconPlane({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function IconPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCar({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function IconArrowRight({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12m-5-5l5 5-5 5" />
    </svg>
  );
}

export function PopularHubsDirectory() {
  return (
    <section
      id="directory"
      aria-labelledby="directory-heading"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-3 py-16 sm:px-6"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-strong w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Fast-Track Directories
        </div>
        <h2
          id="directory-heading"
          className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
        >
          Popular Airports, Cities & Fleet Networks
        </h2>
        <p className="max-w-2xl text-xs text-ink-muted sm:text-sm">
          Select any airport or city destination to begin your reservation request. We coordinate vehicle pickup
          across major national provider networks.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {/* ── 1. Popular Airports ── */}
        <div className="overflow-hidden rounded-3xl border border-line bg-surface-raised p-5 shadow-xs transition-shadow hover:shadow-md sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mint text-brand-strong shadow-xs">
              <IconPlane className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-ink">Popular Airports</h3>
              <p className="text-xs text-ink-muted">Quick airport rental locations with terminal pickup assistance</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {AIRPORT_HUBS.map((item) => (
              <Link
                key={item.code}
                href={`/contact?pickupLocation=${encodeURIComponent(`${item.city} Airport (${item.code})`)}#quote`}
                onClick={() => trackEvent("directory_clicked", { type: "airport", code: item.code })}
                className="group flex items-center justify-between rounded-xl border border-line bg-surface px-3 py-2.5 text-xs transition-all duration-150 hover:border-brand/40 hover:bg-mint/40 hover:shadow-xs active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-extrabold text-ink group-hover:text-brand-strong transition-colors">
                    {item.code}
                  </span>
                  <span className="text-line-dark select-none text-slate-300">|</span>
                  <span className="truncate font-medium text-ink-soft group-hover:text-ink">
                    {item.city}
                  </span>
                </div>
                <IconArrowRight className="h-3 w-3 shrink-0 text-brand opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── 2. Popular Cities ── */}
        <div className="overflow-hidden rounded-3xl border border-line bg-surface-raised p-5 shadow-xs transition-shadow hover:shadow-md sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mint text-brand-strong shadow-xs">
              <IconPin className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-ink">Popular Cities</h3>
              <p className="text-xs text-ink-muted">Metropolitan and downtown rental service points</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {CITY_HUBS.map((item) => (
              <Link
                key={item.city}
                href={`/contact?pickupLocation=${encodeURIComponent(item.city)}#quote`}
                onClick={() => trackEvent("directory_clicked", { type: "city", city: item.city })}
                className="group flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 text-xs transition-all duration-150 hover:border-brand/40 hover:bg-mint/40 hover:shadow-xs active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-ink group-hover:text-brand-strong transition-colors">
                    {item.city}
                  </span>
                  <span className="text-line-dark select-none text-slate-300">|</span>
                  <span className="font-medium text-ink-muted group-hover:text-ink">
                    {item.state}
                  </span>
                </div>
                <IconArrowRight className="h-3 w-3 shrink-0 text-brand opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── 3. Popular Rental Brands ── */}
        <div className="overflow-hidden rounded-3xl border border-line bg-surface-raised p-5 shadow-xs transition-shadow hover:shadow-md sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mint text-brand-strong shadow-xs">
              <IconCar className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-ink">Popular Rental Brands</h3>
              <p className="text-xs text-ink-muted">Independent booking assistance across top national supplier networks</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {RENTAL_BRANDS.map((item) => (
              <Link
                key={item.brand}
                href={`/contact?brand=${encodeURIComponent(item.brand)}#quote`}
                onClick={() => trackEvent("directory_clicked", { type: "brand", brand: item.brand })}
                className="group flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 text-xs transition-all duration-150 hover:border-brand/40 hover:bg-mint/40 hover:shadow-xs active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-extrabold text-ink group-hover:text-brand-strong transition-colors">
                    {item.brand}
                  </span>
                  <span className="text-line-dark select-none text-slate-300">|</span>
                  <span className="font-medium text-ink-muted group-hover:text-ink">
                    {item.type}
                  </span>
                </div>
                <IconArrowRight className="h-3 w-3 shrink-0 text-brand opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
