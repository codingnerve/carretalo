import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CarRentalO handles the information you share with us.",
  alternates: { canonical: "/privacy-policy" },
};

const LAST_UPDATED = "25 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-ink-muted">Last updated: {LAST_UPDATED}</p>

      <div className="prose-sm mt-8 max-w-none space-y-6 text-ink-soft [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-ink">
        <section>
          <h2>What we collect</h2>
          <p className="mt-2">
            When you send an enquiry through {site.name}, we collect the
            information you enter in the form: your name, email address, phone
            number if you provide one, your pick-up and drop-off locations and
            dates, your vehicle preference and anything you write in the
            message field.
          </p>
        </section>
        <section>
          <h2>How we use it</h2>
          <p className="mt-2">
            We use this information for one purpose: responding to your rental
            enquiry and arranging the rental you requested. That can include
            sharing the enquiry details with the rental provider who would
            supply the vehicle. We do not sell your information or use it for
            unrelated marketing.
          </p>
        </section>
        <section>
          <h2>Analytics</h2>
          <p className="mt-2">
            When analytics are enabled on this site, we use them to understand
            how visitors use our pages (for example, which pages lead to
            enquiries) so we can improve the site. Analytics data is not tied
            to the content of your enquiry.
          </p>
        </section>
        <section>
          <h2>How long we keep it</h2>
          <p className="mt-2">
            Enquiry details are kept for as long as needed to handle your
            request and any rental that follows from it, after which they can
            be deleted on request.
          </p>
        </section>
        <section>
          <h2>Your choices</h2>
          <p className="mt-2">
            You can ask us at any time what information we hold about you, ask
            us to correct it, or ask us to delete it. Use any contact channel
            on our contact page and we will respond to your request.
          </p>
        </section>
      </div>
    </div>
  );
}
