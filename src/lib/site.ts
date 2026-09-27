/**
 * Central site configuration.
 *
 * Contact channels are environment-driven so no fake numbers ship by
 * accident. Components hide call/WhatsApp CTAs when a channel is not
 * configured and fall back to the quote form.
 */
export const site = {
  name: "CarRentalO",
  domain: "carrentalo.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://carrentalo.com",
  tagline: "Find your ride. Start your journey.",
  topbarTagline:
    process.env.NEXT_PUBLIC_TOPBAR_TAGLINE ??
    "Independent rental booking assistance for U.S. travel plans",
  description:
    "CarRentalO helps travelers find the right rental car for any trip — airport pick-ups, weekends, road trips and long stays — with a quick enquiry and a personal quote.",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+18886735008", // e.g. "+15551234567"
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "(888) 673-5008",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "", // digits only, e.g. "15551234567"
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@carrentalo.com",
} as const;

export function telHref(): string | null {
  return site.phone ? `tel:${site.phone}` : null;
}

export function whatsappHref(): string | null {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}` : null;
}
