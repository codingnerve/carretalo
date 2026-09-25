import type { Metadata } from "next";
import { site, telHref, whatsappHref } from "@/lib/site";
import { QuoteForm, type QuoteDefaults } from "@/components/QuoteForm";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell us where you're going and when — we'll reply with vehicle options and a personal rental quote.",
  alternates: { canonical: "/contact" },
};

const DEFAULT_KEYS = [
  "pickupLocation",
  "dropoffLocation",
  "pickupDate",
  "dropoffDate",
  "vehiclePreference",
] as const;

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const defaults: QuoteDefaults = {};
  for (const key of DEFAULT_KEYS) {
    const value = params[key];
    if (typeof value === "string" && value) defaults[key] = value.slice(0, 200);
  }

  const tel = telHref();
  const wa = whatsappHref();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Badge>Get in touch</Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Tell us about your trip.
          </h1>
          <p className="mt-4 max-w-md text-ink-muted">
            Share your route and dates and we&apos;ll come back with vehicle
            options and a personal quote. No account, no obligation — just a
            clear answer.
          </p>
          {(tel || wa || site.email) && (
            <ul className="mt-8 space-y-3 text-sm">
              {tel && (
                <li>
                  <a href={tel} className="font-semibold text-brand-strong hover:underline">
                    Call {site.phoneDisplay || "us"}
                  </a>
                </li>
              )}
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-strong hover:underline"
                  >
                    Message us on WhatsApp
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="font-semibold text-brand-strong hover:underline">
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>

        <section
          id="quote"
          aria-label="Quote request form"
          className="scroll-mt-24 rounded-3xl border border-line bg-surface-raised p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-lg font-bold text-ink">Request a quote</h2>
          <p className="mb-6 mt-1 text-sm text-ink-muted">
            The more you tell us, the better the first reply.
          </p>
          <QuoteForm defaults={defaults} source="contact-page" />
        </section>
      </div>
    </div>
  );
}
