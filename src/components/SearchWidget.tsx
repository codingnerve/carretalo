"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { vehicles } from "@/data/vehicles";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

const fieldWrap = "flex min-w-0 flex-col gap-1";
const fieldLabel = "text-[11px] font-semibold uppercase tracking-wide text-ink-muted";
const fieldInput =
  "w-full rounded-lg border-0 bg-transparent p-0 text-sm font-medium text-ink placeholder:text-ink-muted/60 focus:outline-none";

/**
 * The primary conversion component: a floating search panel that routes
 * into the enquiry flow. There is no live inventory — submitting carries
 * the trip details to the quote form as query params.
 */
export function SearchWidget({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const key of [
      "pickupLocation",
      "dropoffLocation",
      "pickupDate",
      "dropoffDate",
      "vehiclePreference",
    ]) {
      const value = data.get(key);
      if (typeof value === "string" && value.trim()) params.set(key, value.trim());
    }
    trackEvent("search_started", { fields: params.size });
    const query = params.toString();
    router.push(query ? `/contact?${query}#quote` : "/contact#quote");
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Find a rental car"
      className="rounded-2xl border border-line bg-surface-raised p-4 shadow-xl shadow-ink/8 sm:p-5"
    >
      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
          compact ? "lg:grid-cols-3" : "lg:grid-cols-[1.2fr_1.2fr_1fr_1fr_1fr_auto] lg:items-end"
        }`}
      >
        <div className={`${fieldWrap} lg:border-r lg:border-line lg:pr-4`}>
          <label htmlFor="search-pickup" className={fieldLabel}>
            Pick-up location
          </label>
          <input
            id="search-pickup"
            name="pickupLocation"
            placeholder="City or airport"
            autoComplete="off"
            className={fieldInput}
          />
        </div>
        <div className={`${fieldWrap} lg:border-r lg:border-line lg:pr-4`}>
          <label htmlFor="search-dropoff" className={fieldLabel}>
            Drop-off location
          </label>
          <input
            id="search-dropoff"
            name="dropoffLocation"
            placeholder="Same as pick-up"
            autoComplete="off"
            className={fieldInput}
          />
        </div>
        <div className={`${fieldWrap} lg:border-r lg:border-line lg:pr-4`}>
          <label htmlFor="search-pickup-date" className={fieldLabel}>
            Pick-up date
          </label>
          <input id="search-pickup-date" name="pickupDate" type="date" className={fieldInput} />
        </div>
        <div className={`${fieldWrap} lg:border-r lg:border-line lg:pr-4`}>
          <label htmlFor="search-dropoff-date" className={fieldLabel}>
            Drop-off date
          </label>
          <input id="search-dropoff-date" name="dropoffDate" type="date" className={fieldInput} />
        </div>
        <div className={fieldWrap}>
          <label htmlFor="search-vehicle" className={fieldLabel}>
            Car type
          </label>
          <select id="search-vehicle" name="vehiclePreference" className={fieldInput} defaultValue="">
            <option value="">Any</option>
            {vehicles.map((v) => (
              <option key={v.slug} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="lg" className={compact ? "sm:col-span-2 lg:col-span-1" : "w-full lg:w-auto"}>
          Find Cars
        </Button>
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        No accounts, no instant checkout — we check availability for your trip and
        reply with options and a personal quote.
      </p>
    </form>
  );
}
