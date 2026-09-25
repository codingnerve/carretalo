import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the CarRentalO website.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "25 September 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-ink-muted">Last updated: {LAST_UPDATED}</p>

      <div className="mt-8 max-w-none space-y-6 text-ink-soft [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-ink">
        <section>
          <h2>What this site is</h2>
          <p className="mt-2">
            {site.name} ({site.domain}) is an enquiry service for car rentals.
            Submitting an enquiry through this site is a request for
            information and a quote — it is not a booking, and it does not
            create a rental agreement or any obligation to rent.
          </p>
        </section>
        <section>
          <h2>Quotes and availability</h2>
          <p className="mt-2">
            Vehicle categories shown on this site illustrate the kinds of
            vehicles we arrange. Availability, exact models and pricing depend
            on your location and dates and are confirmed individually in the
            quote you receive. A quote becomes binding only when a rental is
            expressly confirmed between you and the rental provider.
          </p>
        </section>
        <section>
          <h2>The rental itself</h2>
          <p className="mt-2">
            The rental agreement for any vehicle is concluded with the rental
            provider that supplies it, under that provider&apos;s terms, which
            you will see before you confirm. Requirements such as driving
            licence, minimum age, deposit and insurance are part of those
            terms.
          </p>
        </section>
        <section>
          <h2>Acceptable use</h2>
          <p className="mt-2">
            Please use the enquiry forms only to make genuine rental
            enquiries. Automated, fraudulent or abusive submissions may be
            ignored and blocked.
          </p>
        </section>
        <section>
          <h2>Changes</h2>
          <p className="mt-2">
            We may update these terms as the service evolves; the date above
            shows when they last changed. Questions about these terms are
            welcome through the contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
