/**
 * Factual trust section in place of testimonials — no fabricated reviews.
 * Swap for a real testimonial carousel once genuine reviews exist.
 */
const points = [
  {
    title: "A person, not a queue",
    text: "Every enquiry is read and answered by our team — you deal with the same people from first reply to pick-up.",
  },
  {
    title: "Nothing booked without you",
    text: "An enquiry is not a commitment. You see the vehicle and the quote before anything is confirmed.",
  },
  {
    title: "Honest about availability",
    text: "We don't show live inventory we don't have. What we propose for your dates is what we can actually arrange.",
  },
];

export function TrustPoints() {
  return (
    <section aria-labelledby="trust-heading" className="bg-mint/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="trust-heading" className="max-w-md text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Built around your journey.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="rounded-3xl bg-surface-raised p-7">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <h3 className="mt-4 font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
