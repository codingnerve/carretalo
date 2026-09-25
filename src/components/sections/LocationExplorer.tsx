"use client";

import Image from "next/image";
import Link from "next/link";
import type { RentalLocation } from "@/data/locations";
import { travelImages } from "@/data/images";
import { trackEvent } from "@/lib/analytics";

export function LocationExplorer({ locations }: { locations: RentalLocation[] }) {
  return (
    <section aria-labelledby="locations-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[420px] overflow-hidden rounded-3xl lg:block">
          <Image
            src={travelImages.locations}
            alt="Map of popular rental destinations"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
            Locations
          </p>
          <h2 id="locations-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Popular rental locations.
          </h2>
          <p className="mt-3 max-w-md text-sm text-ink-muted">
            Somewhere else in mind? Send an enquiry anyway — we confirm
            coverage for your exact pick-up point with every quote.
          </p>

          <ul className="mt-8 divide-y divide-line rounded-3xl border border-line bg-surface-raised">
            {locations.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/contact?pickupLocation=${encodeURIComponent(loc.city)}#quote`}
                  onClick={() => trackEvent("location_clicked", { city: loc.slug })}
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-mint/50"
                >
                  <span className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand" fill="currentColor" aria-hidden="true">
                      <path d="M12 2a8 8 0 0 1 8 8c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 0 1 8-8z" />
                      <circle cx="12" cy="10" r="3" fill="#fff" />
                    </svg>
                    <span>
                      <span className="block font-bold text-ink">{loc.city}</span>
                      <span className="block text-sm text-ink-muted">{loc.country}</span>
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong">
                    Explore
                    <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 10h12m-5-5l5 5-5 5" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
