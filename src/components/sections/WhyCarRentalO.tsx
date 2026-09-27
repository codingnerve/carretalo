import { Button } from "@/components/ui/Button";

const smallBenefits = [
  {
    title: "Flexible Options",
    text: "Day, weekend, weekly or monthly — set the period that fits the trip, not the other way round.",
  },
  {
    title: "Clear Communication",
    text: "A named reply with concrete options and next steps — no ticket numbers, no bots.",
  },
  {
    title: "Travel Support",
    text: "Flight delayed? Plans shifted? Tell us and we adjust the arrangement with you.",
  },
];

export function WhyCarRentalO() {
  return (
    <section aria-labelledby="why-heading" className="mx-auto max-w-[1400px] px-3 py-20 sm:px-6">
      <h2 id="why-heading" className="max-w-md text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Everything you need to get moving.
      </h2>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        {/* Large green feature block */}
        <div className="relative overflow-hidden rounded-3xl bg-brand p-8 text-on-brand sm:p-10">
          <svg viewBox="0 0 400 200" aria-hidden="true" className="absolute -right-8 -top-8 h-48 w-96 opacity-20">
            <path
              d="M0 180 C 100 120, 140 40, 240 70 S 380 20, 400 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="1 12"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-brand/80">
            Easy enquiry
          </p>
          <h3 className="mt-3 max-w-sm text-2xl font-extrabold leading-snug sm:text-3xl">
            One short form. A personal answer.
          </h3>
          <p className="mt-4 max-w-md text-on-brand/90">
            No accounts, no checkout maze. Tell us your route and dates, and a
            real person replies with vehicles that fit and a quote for the
            whole period.
          </p>
          <div className="mt-8">
            <Button href="/contact#quote" variant="onBrand" size="lg">
              Start your enquiry
            </Button>
          </div>
        </div>

        {/* Small benefit cards */}
        <div className="grid content-start gap-5">
          {smallBenefits.map((b) => (
            <div key={b.title} className="rounded-3xl border border-line bg-surface-raised p-6">
              <h3 className="font-bold text-ink">{b.title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
