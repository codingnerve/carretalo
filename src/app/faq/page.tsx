import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/data/faqs";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "How CarRentalO enquiries work: what to send, how quotes come back, and what happens before anything is confirmed.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-3 py-12 sm:px-6 md:py-16">
        <Badge>FAQ</Badge>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Questions, answered.
        </h1>
        <p className="mt-4 text-ink-muted">
          Everything about how the enquiry process works. Anything missing?{" "}
          <Link href="/contact" className="font-semibold text-brand-strong hover:underline">
            Ask us directly
          </Link>
          .
        </p>
        <div className="mt-8">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
      <FinalCTA />
    </>
  );
}
