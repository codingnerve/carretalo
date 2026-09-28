import type { Metadata } from "next";
import Link from "next/link";
import { site, telHref } from "@/lib/site";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQInteractive } from "@/components/sections/FAQInteractive";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | CarRentalO Help Center",
  description:
    "Find answers about CarRentalO enquiries, vehicle categories, airport pickup arrangements, quote turnaround, and cancellation support.",
  alternates: { canonical: "/faq" },
};

const assuranceCards = [
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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "No Account Required",
    text: "Submit your route and travel dates in 60 seconds without creating accounts, passwords, or navigating checkout mazes.",
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
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "100% Upfront Quotes",
    text: "Every reply includes concrete vehicle options and clear pricing for your entire period before anything is confirmed.",
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
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Direct Human Care",
    text: "Real team members handle your enquiry from first message to pickup coordination, available 7 days a week.",
  },
];

const steps = [
  {
    number: "01",
    title: "Send Your Route & Dates",
    desc: "Tell us where you're starting, where you're heading, and your preferred vehicle category.",
  },
  {
    number: "02",
    title: "Receive Concrete Options",
    desc: "We check vetted suppliers and return available models and an all-in personal quote.",
  },
  {
    number: "03",
    title: "Confirm & Travel Confidently",
    desc: "Review terms with zero pressure. You only proceed when the vehicle and price suit you.",
  },
];

export default function FaqPage() {
  const tel = telHref();
  const phoneDisplay = site.phoneDisplay || site.phone;

  return (
    <div className="bg-surface">
      {/* 1. Decorative Hero Section */}
      <section className="relative overflow-hidden border-b border-line/70 bg-gradient-to-b from-mint/40 via-surface to-surface py-14 sm:py-20">
        {/* Subtle decorative road background SVG */}
        <svg
          viewBox="0 0 1200 400"
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-full w-full opacity-10"
        >
          <path
            d="M-40 320 C 300 200, 600 350, 900 180 S 1200 80, 1300 120"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="30"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-strong">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              HELP &amp; SUPPORT CENTER
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl sm:leading-tight">
              Clear answers for <span className="text-brand">every journey</span>.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Everything about how CarRentalO booking assistance works: what information to send,
              how quotes are formulated, and what happens before anything is confirmed.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {tel && (
                <a
                  href={tel}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-on-brand shadow-sm shadow-brand/25 transition-transform hover:bg-brand-strong active:scale-[0.98]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>CALL {phoneDisplay}</span>
                </a>
              )}
              <Button href="/contact#quote" variant="secondary" size="lg">
                Ask a Question
              </Button>
            </div>
          </div>

          {/* 2. Key Assurance Cards Grid */}
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {assuranceCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-3xl border border-line bg-surface-raised p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint text-brand-strong transition-colors group-hover:bg-brand group-hover:text-on-brand">
                  {card.icon}
                </div>
                <h2 className="mt-4 text-base font-bold text-ink sm:text-lg">{card.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Visual 3-Step Process Section */}
      <section className="border-b border-line/70 bg-white/70 py-14 sm:py-18">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-strong">
              SIMPLE &amp; TRANSPARENT
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              How booking assistance works
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-line bg-surface p-7"
              >
                <span className="text-3xl font-black text-brand-strong/30">{step.number}</span>
                <h3 className="mt-2 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted sm:text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Categorized Accordion Section */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-3 sm:px-6">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-strong">
              EXPLORE TOPICS
            </span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Browse questions &amp; answers
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Select a category or type a keyword to instantly find answers.
            </p>
          </div>

          <FAQInteractive />
        </div>
      </section>

      {/* 5. Support Concierge Contact Box */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-on-ink shadow-xl sm:p-12">
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> DIRECT CONTACT CHANNELS
                </span>
                <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Still have questions about your route?
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-on-ink/80 sm:text-base">
                  Our rental assistance team is available 7 days a week. Speak directly with a team
                  member or submit your dates for a personalized quote with zero pressure.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {tel && (
                  <a
                    href={tel}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                  >
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-on-brand">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5 fill-none stroke-current stroke-[2.4]"
                          aria-hidden="true"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-on-ink">Call Our Team</h4>
                      <p className="mt-1 text-xs text-on-ink/70">{phoneDisplay}</p>
                    </div>
                    <span className="mt-4 text-xs font-bold text-brand">Tap to Call &rarr;</span>
                  </a>
                )}

                <Link
                  href="/contact#quote"
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-brand-strong">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-none stroke-current stroke-[2.4]"
                        aria-hidden="true"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <h4 className="mt-3 text-sm font-bold text-on-ink">Online Enquiry</h4>
                    <p className="mt-1 text-xs text-on-ink/70">Personal quote by email</p>
                  </div>
                  <span className="mt-4 text-xs font-bold text-brand">Get a Quote &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <FinalCTA />
    </div>
  );
}
