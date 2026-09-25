import Link from "next/link";
import { footerColumns } from "@/data/navigation";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-on-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <p className="text-lg font-extrabold tracking-tight text-surface-raised">
            CarRental<span className="text-brand">O</span>
          </p>
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
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-on-ink/60 sm:flex-row sm:items-center sm:px-6">
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
