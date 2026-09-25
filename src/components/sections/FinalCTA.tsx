import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-brand py-20 text-on-brand">
      {/* Subtle road/path graphic */}
      <svg
        viewBox="0 0 1200 300"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-15"
        preserveAspectRatio="none"
      >
        <path
          d="M-20 280 C 200 180, 380 260, 600 170 S 1000 60, 1220 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="40"
          strokeLinecap="round"
        />
        <path
          d="M-20 280 C 200 180, 380 260, 600 170 S 1000 60, 1220 90"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="4"
          strokeDasharray="14 18"
          strokeLinecap="round"
        />
      </svg>
      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 id="cta-heading" className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Ready to find your ride?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-on-brand/90">
          Tell us what you need and we&apos;ll help you find the right rental
          option.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/#vehicles" variant="onBrand" size="lg">
            Find a Car
          </Button>
          <Button
            href="/contact#quote"
            size="lg"
            className="border border-on-brand/40 bg-transparent text-on-brand hover:bg-brand-strong"
          >
            Get a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
