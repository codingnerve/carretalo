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
      <div className="border-t border-on-ink/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-3 py-6 text-xs text-on-ink/60 sm:flex-row sm:items-center sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}
          </p>
          <div className="flex gap-5">
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
