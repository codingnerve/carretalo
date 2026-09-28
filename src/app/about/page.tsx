import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, telHref } from "@/lib/site";
import { heroImages } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "About Us | Independent Car Rental Assistance",
  description:
    "Learn about CarRentalO: independent booking assistance helping travelers organize rental requests, compare vehicle categories, and get practical support.",
  alternates: { canonical: "/about" },
};

const focusCards = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 21h18M3 7v14M21 7v14M6 11h2M6 15h2M10 11h4M10 15h4M16 11h2M16 15h2M9 3h6v4H9z" />
      </svg>
    ),
    title: "Independent booking assistance",
    text: "We help customers organize rental requests while remaining independent from rental car brands and suppliers, keeping your best travel interests at the center.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Simpler reservation experience",
    text: "Our straightforward request flow keeps the essentials clear: pickup details, travel dates, vehicle preference, and contact information without account friction.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    title: "Travel-related support",
    text: "Customers can contact us for booking questions, itinerary changes, and cancellation requests where permitted by applicable provider policies.",
  },
];

const serviceChecklist = [
  "Vehicle options from third-party providers",
  "Airport and city pickup request guidance",
  "Reservation assistance by phone and email",
  "Clear communication around rental enquiries",
];

export default function AboutPage() {
  const tel = telHref();

  return (
    <div className="bg-surface">
      {/* 1. Hero Overview Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint/60 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-strong">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                ABOUT {site.name.toUpperCase()}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl md:leading-[1.15]">
                Making car rental reservations more convenient
              </h1>

              <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                {site.name} provides independent booking assistance for customers looking
                to arrange car rental reservations, compare vehicle categories, and get
                practical support during the request process.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  href="/contact#quote"
                  size="lg"
                  className="w-full sm:w-auto uppercase tracking-wide font-extrabold text-sm sm:text-base"
                >
                  Request a Quote
                </Button>
                {tel && (
                  <a
                    href={tel}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-line bg-surface-raised px-6 py-3.5 text-sm sm:text-base font-extrabold uppercase tracking-wide text-ink shadow-xs transition-all hover:border-brand/40 hover:bg-mint/40 active:scale-[0.98]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 shrink-0 text-brand fill-none stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>CALL {site.phoneDisplay || site.phone}</span>
                  </a>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-line/80 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-black text-brand-strong">100%</p>
                  <p className="text-xs text-ink-muted">Independent assistance</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-brand-strong">Fast</p>
                  <p className="text-xs text-ink-muted">Tailored quotes</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-brand-strong">Direct</p>
                  <p className="text-xs text-ink-muted">Human customer care</p>
                </div>
              </div>
            </div>

            {/* Right Media with Overlap Support Card */}
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line/60 bg-surface-raised shadow-xl sm:aspect-[16/11]">
                <Image
                  src={heroImages["airport-car-rental"]}
                  alt="Rental car waiting at modern airport terminal"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Overlapping Floating Banner */}
              <div className="relative mt-4 rounded-2xl border border-line bg-surface-raised p-5 shadow-lg sm:p-6 lg:absolute lg:-bottom-10 lg:left-6 lg:right-6 lg:mt-0">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mint text-brand-strong">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-ink sm:text-lg">
                      Customer support without unsupported promises
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                      We do not claim to own rental vehicles or operate official rental counters.
                      Final vehicle availability, pricing, and provider terms may depend on the
                      applicable third-party provider.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What We Focus On */}
      <section className="bg-white/60 py-16 sm:py-24 border-y border-line/70">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-strong">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> WHAT WE FOCUS ON
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Booking assistance built around clear next steps
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              We streamline how travelers arrange rental vehicles by removing complex booking loops
              and focusing on clear, actionable coordination.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {focusCards.map((card) => (
              <div
                key={card.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-line bg-surface-raised p-8 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-surface-raised transition-colors group-hover:bg-brand">
                    {card.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-ink">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How We Can Help & Service Information */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Card: Dark Ink Premium Card */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-on-ink shadow-xl sm:p-10">
              {/* Background accent wave */}
              <svg
                viewBox="0 0 400 300"
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 opacity-15"
              >
                <path
                  d="M0 250 C 120 180, 160 80, 260 120 S 360 40, 400 10"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="260" cy="120" r="16" fill="var(--mint)" opacity="0.3" />
              </svg>

              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> HOW WE CAN HELP
                </span>

                <h3 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl sm:leading-snug">
                  Support for reservations, changes, and rental questions
                </h3>

                <p className="mt-5 text-sm leading-relaxed text-on-ink/80 sm:text-base">
                  We help customers submit rental information and request support for booking
                  assistance, itinerary changes, cancellation questions where permitted, and general
                  travel-related rental needs.
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <Button href="/contact#quote" variant="onBrand" size="lg">
                  Submit Rental Enquiry
                </Button>
              </div>
            </div>

            {/* Right Card: Service Information & Live Contacts */}
            <div className="flex flex-col justify-between rounded-3xl border border-line bg-surface-raised p-8 shadow-sm sm:p-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-strong">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> SERVICE INFORMATION
                </span>

                <ul className="mt-6 space-y-3.5">
                  {serviceChecklist.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-brand-strong">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Access Pills */}
              <div className="mt-8 space-y-3 border-t border-line pt-6">
                {tel && (
                  <a
                    href={tel}
                    className="flex items-center justify-between rounded-2xl border border-line bg-surface p-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:bg-mint/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-surface-raised">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <span>{site.phoneDisplay || site.phone}</span>
                    </div>
                    <span className="text-xs text-brand-strong font-bold">Call Now &rarr;</span>
                  </a>
                )}

                {site.email && (
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center justify-between rounded-2xl border border-line bg-surface p-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:bg-mint/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-surface-raised">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <span>{site.email}</span>
                    </div>
                    <span className="text-xs text-brand-strong font-bold">Email Us &rarr;</span>
                  </a>
                )}

                <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 text-xs text-ink-muted">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-surface-raised">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span>{site.topbarTagline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Independent Service Provider Disclaimer Box */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-raised p-8 text-center shadow-xs sm:p-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-mint text-brand-strong">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>

            <p className="mx-auto max-w-2xl text-base font-semibold leading-relaxed text-ink-soft sm:text-lg">
              {site.name}.com is an independent service provider and not the official website
              or customer support channel of any car rental company.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-xs text-ink-muted">
              All product and company names, brand logos, and vehicle trademarks are registered trademarks
              of their respective owners. Their use on this site is purely for identification and
              category descriptive purposes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Final Call-to-Action */}
      <FinalCTA />
    </div>
  );
}
