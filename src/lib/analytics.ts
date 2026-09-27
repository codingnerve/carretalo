/**
 * Conversion event tracking. Fires to gtag / dataLayer only when
 * NEXT_PUBLIC_GA_ID is configured — no fake tracking IDs.
 */
export type ConversionEvent =
  | "search_started"
  | "quote_form_started"
  | "quote_form_submitted"
  | "call_clicked"
  | "whatsapp_clicked"
  | "vehicle_clicked"
  | "location_clicked"
  | "directory_clicked";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function trackEvent(
  event: ConversionEvent,
  params: Record<string, string | number> = {},
): void {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, params);
  } else if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}
