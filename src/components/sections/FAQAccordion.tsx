"use client";

import { useState } from "react";
import type { Faq } from "@/data/faqs";

export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-surface-raised">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-ink transition-colors hover:text-brand-strong"
              >
                {faq.question}
                <svg
                  viewBox="0 0 20 20"
                  className={`h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-45" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                className="px-6 pb-6"
              >
                <p className="text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
