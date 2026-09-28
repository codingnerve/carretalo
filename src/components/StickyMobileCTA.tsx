"use client";

import { site, telHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Fixed bottom action bar on mobile phones.
 * Highlights the direct telephone booking assistance number prominently in high contrast.
 */
export function StickyMobileCTA() {
  const tel = telHref();
  const phoneDisplay = site.phoneDisplay || site.phone;

  if (!tel && !site.phone) return null;

  return (
    <aside
      aria-label="Direct phone booking assistance"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/20 bg-ink px-3 py-2.5 shadow-2xl md:hidden"
    >
      <div className="mx-auto max-w-md">
        <a
          href={tel || `tel:${site.phone}`}
          onClick={() => trackEvent("call_clicked", { placement: "sticky_bar" })}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand px-4 py-3.5 text-center text-sm font-black uppercase tracking-wider text-on-brand shadow-lg shadow-brand/30 transition-transform active:scale-[0.98]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>CALL NOW {phoneDisplay}</span>
        </a>
      </div>
    </aside>
  );
}
