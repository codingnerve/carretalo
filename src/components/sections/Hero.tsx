import Image from "next/image";
import { heroImages } from "@/data/images";
import { site, telHref } from "@/lib/site";
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
  const tel = telHref();

  return (
    <section aria-label="Intro" className="relative overflow-visible">
      <div className="mx-auto max-w-[1400px] px-3 pb-8 pt-8 sm:px-6 md:pb-12 md:pt-14">
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
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button href="#vehicles" size="lg" className="w-full sm:w-auto uppercase tracking-wide font-extrabold text-sm sm:text-base">
                Find a Car
              </Button>
              {tel ? (
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
              ) : (
                <Button href="/contact#quote" variant="secondary" size="lg" className="w-full sm:w-auto">
                  Get a Quote
                </Button>
              )}
            </div>
          </div>

          <div className="relative hidden lg:block overflow-hidden rounded-[2.5rem]">
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

      {/* Search panel — primary conversion element, full-width card below hero. */}
      <div className="relative z-30 mx-auto max-w-[1400px] px-3 pb-16 sm:px-6 md:pb-24">
        <div className="overflow-visible">
          <SearchWidget />
        </div>
      </div>
    </section>
  );
}
