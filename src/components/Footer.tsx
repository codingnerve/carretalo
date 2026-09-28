import Link from "next/link";
import Image from "next/image";
import { footerColumns } from "@/data/navigation";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-on-ink">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-3 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Link href="/" className="inline-block" aria-label="CarRentalO Home">
            <span className="inline-flex rounded-xl bg-surface-raised px-3 py-1.5 shadow-xs">
              <Image
                src="/images/logo.png"
                alt="CarRentalO"
                width={140}
                height={47}
                className="h-8 w-auto object-contain"
              />
            </span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-on-ink/70">
            {site.tagline} Tell us where you&apos;re going and we&apos;ll help you
            find the right rental car for the trip.
          </p>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-on-ink/50">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={`${col.heading}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-ink/80 transition-colors hover:text-surface-raised"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      {/* Independent Service Disclaimer */}
      <div className="border-t border-on-ink/10 bg-black/20 py-8 sm:py-10">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="grid gap-6 text-xs text-on-ink/60 lg:grid-cols-[280px_1fr_1fr] lg:gap-8 items-start">
            {/* Header Column */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand shadow-xs">
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
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-ink">
                  Independent Service Disclaimer
                </h3>
                <Link
                  href="/terms"
                  className="mt-1 inline-block font-semibold text-brand transition-colors hover:underline hover:text-mint"
                >
                  Read full disclaimer
                </Link>
              </div>
            </div>

            {/* Paragraph Column 1 */}
            <div className="space-y-3 leading-relaxed">
              <p>
                {site.domain} is an independent car rental booking assistance provider. We are not affiliated with, authorized by, endorsed by, or sponsored by any car rental company, vehicle manufacturer, travel brand, or their respective subsidiaries or affiliates.
              </p>
              <p>
                Our services include assisting customers with car rental reservations, itinerary changes, cancellations where permitted, booking support, and general travel-related assistance. We act solely as an independent intermediary to help customers access car rental services offered by third-party providers.
              </p>
            </div>

            {/* Paragraph Column 2 */}
            <div className="space-y-3 leading-relaxed">
              <p>
                All company names, trademarks, logos, and brand names appearing on this website are the property of their respective owners and are used solely for descriptive and identification purposes.
              </p>
              <p>
                By using this website, you acknowledge that {site.domain} is an independent service provider and not the official website or customer support channel of any car rental company.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-on-ink/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-3 py-6 text-xs text-on-ink/60 sm:flex-row sm:items-center sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <span className="text-on-ink/40">{site.domain}</span>
            <Link href="/about" className="hover:text-surface-raised">
              About Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-surface-raised">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-surface-raised">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-surface-raised">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
