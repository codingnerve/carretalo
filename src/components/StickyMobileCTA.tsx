"use client";

import { telHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

/**
 * Fixed bottom action bar on phones. The call slot renders only when a
 * phone number is configured; the quote CTA always shows.
 */
export function StickyMobileCTA() {
  const tel = telHref();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface-raised/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        {tel && (
          <Button
            href={tel}
            variant="secondary"
            className="flex-1"
            onClick={() => trackEvent("call_clicked", { placement: "sticky_bar" })}
          >
            Call
          </Button>
        )}
        <Button href="/contact#quote" className="flex-1">
          Get Quote
        </Button>
      </div>
    </div>
  );
}
