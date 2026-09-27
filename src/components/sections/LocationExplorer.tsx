"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { RentalLocation } from "@/data/locations";
import { site, telHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

function IconPhone({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconLocationPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12m-5-5l5 5-5 5" />
    </svg>
  );
}

export function LocationExplorer({ locations }: { locations: RentalLocation[] }) {
  const [filter, setFilter] = useState<"usa" | "all">("usa");
  const tel = telHref();

  const displayedLocations = useMemo(() => {
    if (filter === "usa") {
      return locations.filter((loc) => loc.isUsa);
    }
    return locations;
  }, [filter, locations]);

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-3 py-20 sm:px-6"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-strong shadow-xs">
            <IconLocationPin className="h-3.5 w-3.5 text-brand" />
            Top Car Rental Locations in USA
          </div>
          <h2
            id="locations-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
          >
            Explore Popular City & Airport Locations
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Explore popular city and airport car rental locations across the United States. Choose your preferred
            location or call our support team for immediate reservation assistance.
          </p>
        </div>

        {/* Action & Filter buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Pills */}
          <div className="inline-flex rounded-full border border-line bg-surface p-1">
            <button
              type="button"
              onClick={() => setFilter("usa")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                filter === "usa"
                  ? "bg-brand text-white shadow-xs"
                  : "text-ink-soft hover:text-brand-strong"
              }`}
            >
              U.S. Locations ({locations.filter((l) => l.isUsa).length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                filter === "all"
                  ? "bg-brand text-white shadow-xs"
                  : "text-ink-soft hover:text-brand-strong"
              }`}
            >
              All Hubs ({locations.length})
            </button>
          </div>

          {/* Quick Call Button */}
          {tel && (
            <a
              href={tel}
              onClick={() => trackEvent("call_clicked", { placement: "locations_section" })}
              className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-mint/60 px-4 py-2 text-xs font-bold text-brand-strong transition-colors hover:bg-mint"
            >
              <IconPhone className="h-3.5 w-3.5 text-brand" />
              <span>{site.phoneDisplay || site.phone}</span>
            </a>
          )}
        </div>
      </div>

      {/* ── Locations Grid ── */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedLocations.map((loc) => {
          const quoteUrl = `/contact?pickupLocation=${encodeURIComponent(loc.city)}#quote`;

          return (
            <Link
              key={loc.slug}
              href={quoteUrl}
              onClick={() => trackEvent("location_clicked", { city: loc.slug })}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface-raised shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/8"
            >
              {/* Image with rich gradient */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-mint/40">
                <Image
                  src={loc.image}
                  alt={`${loc.city} car rental`}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Dark Vignette & Gradient for ultra-crisp typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                {/* Top Badge: Airport Code & State */}
                <div className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink shadow-xs backdrop-blur-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {loc.airportCode}
                  </span>

                  {loc.state && (
                    <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-xs">
                      {loc.state}
                    </span>
                  )}
                </div>

                {/* Bottom Content within Image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-mint transition-colors">
                        {loc.city}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-white/80">
                        {loc.highlight}
                      </p>
                    </div>

                    {/* Price Pill styled in CarRentalO theme */}
                    <div className="shrink-0 rounded-xl border border-white/20 bg-white/15 px-2.5 py-1 text-right shadow-xs backdrop-blur-md">
                      <span className="block text-[9px] font-semibold uppercase tracking-wider text-white/70">
                        from
                      </span>
                      <span className="text-base font-extrabold text-white">
                        ${loc.startingPrice}
                        <span className="text-[10px] font-normal text-white/80">/day*</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="flex items-center justify-between border-t border-line/60 bg-surface-raised px-4 py-3 text-xs font-semibold text-brand-strong transition-colors group-hover:bg-mint/30">
                <span className="flex items-center gap-1.5">
                  <IconLocationPin className="h-3.5 w-3.5 text-brand" />
                  <span>Reserve in {loc.city}</span>
                </span>
                <span className="flex items-center gap-1 transition-transform group-hover:translate-x-1">
                  <span>Get Quote</span>
                  <IconArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Assistance & Call Support Strip ── */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-r from-mint/60 via-surface to-mint/40 p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-strong">
              <span className="h-2 w-2 rounded-full bg-brand" />
              Nationwide U.S. Booking Support
            </div>
            <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Traveling to another city or airport?
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
              We arrange rental vehicles across hundreds of airport hubs and neighborhood branches nationwide.
              Call our support team or request a personalized online quote in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {tel && (
              <a
                href={tel}
                onClick={() => trackEvent("call_clicked", { placement: "locations_banner" })}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-strong hover:shadow-lg hover:shadow-brand/30 active:scale-[0.98]"
              >
                <IconPhone className="h-4 w-4" />
                <span>Call {site.phoneDisplay || site.phone}</span>
              </a>
            )}

            <Link
              href="/contact#quote"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink shadow-xs transition-colors hover:border-brand/40 hover:bg-mint/40 hover:text-brand-strong"
            >
              <span>Request Online Quote</span>
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-5 border-t border-line/70 pt-4 text-[11px] text-ink-muted">
          *Rates shown are example starting rates. Actual prices vary based on pick-up date, vehicle availability, rental duration, and seasonal demand. All bookings are confirmed with personal customer support.
        </p>
      </div>
    </section>
  );
}
