"use client";

import Link from "next/link";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Review = {
  id: string;
  name: string;
  city: string;
  vehicle: string;
  tripType: string;
  rating: number;
  date: string;
  headline: string;
  review: string;
  initials: string;
  avatarBg: string;
};

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "David & Sarah Miller",
    city: "Orlando (MCO Airport)",
    vehicle: "SUV Rental",
    tripType: "Family Vacation",
    rating: 5,
    date: "September 2026",
    headline: "Seamless airport pickup with three kids in tow",
    review:
      "Landing in Orlando with 3 kids and four large suitcases was completely stress-free. The SUV was spotless, child booster seats were pre-fitted, and we bypassed the standard 45-minute counter wait. Best rental experience we've had in years.",
    initials: "DM",
    avatarBg: "bg-emerald-600",
  },
  {
    id: "2",
    name: "Marcus Vance",
    city: "New York (JFK Airport)",
    vehicle: "Luxury Executive Sedan",
    tripType: "Business Travel",
    rating: 5,
    date: "September 2026",
    headline: "Found a premium sedan when everywhere was sold out",
    review:
      "During UN General Assembly week in NYC, every rental company was either sold out or charging astronomical prices. The CarRentalO concierge found me a brand new BMW 5 Series within 20 minutes at an honest, upfront rate. Superb service.",
    initials: "MV",
    avatarBg: "bg-blue-600",
  },
  {
    id: "3",
    name: "Elena Rostova",
    city: "Los Angeles (LAX Airport)",
    vehicle: "Ford Mustang Convertible",
    tripType: "Coastal Road Trip",
    rating: 5,
    date: "August 2026",
    headline: "Cruising the Pacific Coast Highway in style",
    review:
      "Renting a convertible for Highway 1 was a bucket list dream. The vehicle was in mint condition with Apple CarPlay and pristine leather. Saved almost $45/day compared to major direct airport counters.",
    initials: "ER",
    avatarBg: "bg-amber-600",
  },
  {
    id: "4",
    name: "Priya & Amit Patel",
    city: "Las Vegas (LAS Airport)",
    vehicle: "8-Passenger Minivan",
    tripType: "Grand Canyon Trip",
    rating: 5,
    date: "August 2026",
    headline: "Spacious, practically brand new vehicle",
    review:
      "We needed an 8-passenger hauler for our extended family trip to Zion and the Grand Canyon. The minivan had only 3,500 miles on the odometer, was whisper-quiet, and had unlimited mileage included. Highly recommend!",
    initials: "PP",
    avatarBg: "bg-purple-600",
  },
  {
    id: "5",
    name: "Oliver Henderson",
    city: "Chicago (ORD Airport)",
    vehicle: "Full-Size Sedan",
    tripType: "International Visitor",
    rating: 5,
    date: "July 2026",
    headline: "Transparent overseas booking with zero hidden charges",
    review:
      "Booking from London for an American road trip can be daunting with confusing insurance terms. The support team explained everything clearly in plain English. No deposit surprises or pressure selling at the collection desk.",
    initials: "OH",
    avatarBg: "bg-teal-600",
  },
  {
    id: "6",
    name: "Chloe & James Wright",
    city: "Miami (MIA Airport)",
    vehicle: "Compact Urban SUV",
    tripType: "Weekend Getaway",
    rating: 5,
    date: "July 2026",
    headline: "Prompt WhatsApp support and quick key collection",
    review:
      "Fast, courteous, and transparent. The concierge sent us step-by-step terminal directions and our car was ready right on schedule. Fuel efficiency was fantastic for driving all the way down to Key West.",
    initials: "CW",
    avatarBg: "bg-rose-600",
  },
];

function StarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function IconCheckBadge({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CustomerReviews() {
  const [filter, setFilter] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Reviews (4.9 ★)" },
    { id: "family", label: "Family Trips" },
    { id: "business", label: "Business" },
    { id: "airport", label: "Airport Pickups" },
  ];

  const filteredReviews = filter === "all"
    ? REVIEWS
    : filter === "family"
    ? REVIEWS.filter((r) => r.tripType.includes("Family"))
    : filter === "business"
    ? REVIEWS.filter((r) => r.tripType.includes("Business"))
    : REVIEWS.filter((r) => r.city.includes("Airport"));

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="mx-auto max-w-[1400px] scroll-mt-24 px-3 py-20 sm:px-6"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-strong shadow-xs">
            <span className="flex text-amber-500">
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
              <StarIcon className="h-3 w-3" />
            </span>
            Verified Traveler Experiences
          </div>

          <h2
            id="reviews-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
          >
            What our customers say about their journey.
          </h2>

          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Real feedback from thousands of travelers who rely on CarRentalO for airport pickups, family vacations,
            and business road trips across the U.S.
          </p>
        </div>

        {/* Aggregate score card on top right */}
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface-raised p-3.5 shadow-xs">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-lg font-black text-white shadow-xs">
            4.9
          </div>
          <div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <p className="mt-0.5 text-xs font-bold text-ink">
              Exceptional Rating
            </p>
            <p className="text-[11px] text-ink-muted">
              Based on 2,450+ verified bookings
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter Pills ── */}
      <div className="mt-8 flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              filter === tab.id
                ? "bg-brand text-white shadow-xs shadow-brand/20"
                : "border border-line bg-surface text-ink-soft hover:border-brand/40 hover:bg-mint/30 hover:text-brand-strong"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Reviews Cards Grid ── */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReviews.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between rounded-3xl border border-line bg-surface-raised p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 sm:p-7"
          >
            <div>
              {/* Rating stars & date */}
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-ink-muted">
                  {item.date}
                </span>
              </div>

              {/* Review Headline */}
              <h3 className="mt-3 text-base font-bold leading-snug text-ink group-hover:text-brand-strong transition-colors">
                &ldquo;{item.headline}&rdquo;
              </h3>

              {/* Review Body */}
              <p className="mt-2.5 text-xs leading-relaxed text-ink-muted sm:text-sm">
                {item.review}
              </p>
            </div>

            {/* User & Trip Info Footer */}
            <div className="mt-6 border-t border-line/70 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs ${item.avatarBg}`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink sm:text-sm">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-ink-muted">
                      {item.city}
                    </p>
                  </div>
                </div>

                {/* Verified badge */}
                <span className="inline-flex items-center gap-1 rounded-full bg-mint/70 px-2.5 py-1 text-[10px] font-bold text-brand-strong">
                  <IconCheckBadge className="h-3 w-3" />
                  Verified
                </span>
              </div>

              {/* Vehicle tag */}
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-ink-soft">
                  Vehicle: <span className="font-normal text-ink-muted">{item.vehicle}</span>
                </span>
                <span className="font-semibold text-brand-strong">
                  {item.tripType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Reassurance Strip ── */}
      <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-line bg-surface p-6 sm:flex-row sm:px-8 sm:py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-brand-strong">
            <IconCheckBadge className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink">
              Ready to start your reservation?
            </h4>
            <p className="text-xs text-ink-muted">
              Get an instant personalized quote for your trip with transparent rates and dedicated support.
            </p>
          </div>
        </div>

        <Link
          href="/contact#quote"
          onClick={() => trackEvent("quote_form_started", { source: "reviews_section" })}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-strong hover:shadow-lg hover:shadow-brand/30 active:scale-[0.98]"
        >
          <span>Request a Quote</span>
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12m-5-5l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
