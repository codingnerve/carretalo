"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { site, telHref } from "@/lib/site";

export type CategorizedFaq = {
  question: string;
  answer: string;
  category: "all" | "booking" | "airport" | "vehicles" | "support";
};

export const extendedFaqs: CategorizedFaq[] = [
  {
    category: "booking",
    question: "How does the rental enquiry work?",
    answer:
      "Tell us where and when you need a car using our search or quote form. Our team reviews your request, checks what is available for your route, and returns tailored vehicle options and a personal quote. Nothing is booked or charged until you confirm.",
  },
  {
    category: "booking",
    question: "What information do I need to provide?",
    answer:
      "Your name, an email address or phone number we can reach you on, your pick-up and drop-off locations and your travel dates. Mentioning a preferred vehicle category helps us provide the most accurate options right away.",
  },
  {
    category: "airport",
    question: "Can I request an airport car rental?",
    answer:
      "Yes — specify your arrival airport and, if known, your arrival time or flight details. We coordinate convenient pickup arrangements that align with your arrival terminal so your vehicle is ready without unnecessary airport delays.",
  },
  {
    category: "vehicles",
    question: "What types of vehicles are available?",
    answer:
      "We arrange economy, compact, sedan, SUV, minivan, family, and luxury vehicles. Availability depends on your location and dates, which is why every enquiry is answered with concrete options rather than generic catalog lists.",
  },
  {
    category: "vehicles",
    question: "Can I request a specific vehicle model?",
    answer:
      "You can name a preferred category or model in the enquiry form and we'll do our best to match it, or suggest the closest available alternative with comparable space and features for your trip.",
  },
  {
    category: "booking",
    question: "Can I rent for multiple days, weeks, or monthly periods?",
    answer:
      "Yes — from single-day rentals to multi-week and monthly arrangements. Set your pick-up and drop-off dates in the enquiry and the quote will reflect the full travel period with applicable extended rates.",
  },
  {
    category: "booking",
    question: "Are there any upfront charges or hidden booking fees?",
    answer:
      "No. Requesting an enquiry or receiving a personal quote is completely free and carries zero obligation. You review the proposed vehicle options, pricing, and supplier terms before making any commitment.",
  },
  {
    category: "support",
    question: "Can I change or cancel my rental request?",
    answer:
      "Yes. You can contact our support team at any time before final confirmation to adjust travel dates, pickup locations, or vehicle preferences. Cancellation policies after provider confirmation are transparently stated in your quote.",
  },
  {
    category: "airport",
    question: "What documents are required when collecting the rental car?",
    answer:
      "Standard rental provider requirements include a valid government-issued driver's license, an accepted credit card matching the primary driver's name, and passport/visa verification for international travelers.",
  },
  {
    category: "support",
    question: "How do I contact CarRentalO for assistance?",
    answer:
      "You can call our booking assistance line directly by phone, submit an online enquiry through our quote form, or reach our concierge team via email. Real team members review and answer every message.",
  },
];

const categories = [
  { id: "all", label: "All Questions" },
  { id: "booking", label: "Booking & Quotes" },
  { id: "airport", label: "Airport & Pickups" },
  { id: "vehicles", label: "Vehicle Categories" },
  { id: "support", label: "Support & Policies" },
] as const;

export function FAQInteractive() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const tel = telHref();

  const filteredFaqs = useMemo(() => {
    return extendedFaqs.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Controls */}
      <div className="rounded-3xl border border-line bg-surface-raised p-4 shadow-sm sm:p-6">
        <div className="relative">
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-muted">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            id="faq-search"
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(0);
            }}
            placeholder="Search questions (e.g. airport, cancellation, deposit, quotes)..."
            className="w-full rounded-2xl border border-line bg-surface py-3.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink-muted focus:border-brand focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-brand/20 sm:text-base"
          />
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-line/60">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  isActive
                    ? "bg-brand text-on-brand shadow-xs shadow-brand/30"
                    : "bg-surface text-ink-soft hover:bg-mint hover:text-brand-strong border border-line/70"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="divide-y divide-line rounded-3xl border border-line bg-surface-raised shadow-xs overflow-hidden">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="transition-colors hover:bg-surface/40">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-ink sm:text-lg"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                        isOpen
                          ? "bg-mint text-brand-strong rotate-45"
                          : "bg-surface text-ink-muted"
                      }`}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M10 4v12M4 10h12" />
                      </svg>
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="px-6 pb-6 pt-1"
                  >
                    <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-line bg-surface-raised p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-brand-strong">
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
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-bold text-ink">No matching questions found</h3>
          <p className="mt-1 text-sm text-ink-muted">
            Have a specific trip requirement? We&apos;ll answer your question directly.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            {tel && (
              <a
                href={tel}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:bg-mint"
              >
                Call {site.phoneDisplay || site.phone}
              </a>
            )}
            <Link
              href="/contact#quote"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-bold text-on-brand hover:bg-brand-strong"
            >
              Ask Our Team
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
