import Image from "next/image";
import { heroImages } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { SearchWidget } from "@/components/SearchWidget";

/** Decorative map-route squiggle with pins, sitting behind the hero image. */
function RouteDoodle() {
  return (
    <svg
      viewBox="0 0 400 300"
      aria-hidden="true"
      className="absolute -right-6 -top-8 h-full w-full text-brand"
    >
      <path
        d="M20 260 C 120 180, 90 90, 210 110 S 360 60, 380 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="1 12"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="20" cy="260" r="6" fill="currentColor" opacity="0.6" />
      <path
        d="M380 14 a10 10 0 0 1 10 10 q0 7 -10 18 q-10 -11 -10 -18 a10 10 0 0 1 10 -10z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section aria-label="Intro" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 md:pb-14 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
              Car rental made simple
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Find a car that fits <span className="text-brand">your journey</span>.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-muted">
              Compare your options, choose the right vehicle and request your
              rental in just a few steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#vehicles" size="lg">
                Find a Car
              </Button>
              <Button href="/contact#quote" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <RouteDoodle />
            <div className="animate-rise-in relative overflow-hidden rounded-[2rem] border border-line bg-mint shadow-lg shadow-ink/5">
              <Image
                src={heroImages.home}
                alt="Rental car ready for a journey"
                width={1200}
                height={900}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating search panel — the primary conversion element. */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="animate-rise-in relative z-10 -mb-8 lg:-mt-6">
          <SearchWidget />
        </div>
      </div>
    </section>
  );
}
