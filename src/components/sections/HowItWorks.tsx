const steps = [
  {
    title: "Tell us where you're going",
    text: "Share your pick-up point, dates and anything the trip needs.",
  },
  {
    title: "Choose your car",
    text: "We reply with vehicles that fit — pick the one you like.",
  },
  {
    title: "Send your request",
    text: "Confirm the details; we arrange the rental with you.",
  },
  {
    title: "Get confirmation",
    text: "You receive the final arrangement and pick-up instructions.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="border-y border-line bg-surface-raised py-20">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
          How it works
        </p>
        <h2 id="how-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          From enquiry to ignition.
        </h2>

        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Connecting line (horizontal on desktop, vertical on mobile) */}
          <div
            aria-hidden="true"
            className="absolute left-[1.375rem] top-2 h-[calc(100%-2rem)] w-px bg-line md:left-0 md:top-[1.375rem] md:h-px md:w-full"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:block">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-on-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-5">
                <h3 className="font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
