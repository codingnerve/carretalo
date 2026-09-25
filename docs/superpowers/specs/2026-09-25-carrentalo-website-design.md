# CarRentalO — Website Design Spec

Date: 2026-09-25
Source of truth: the user-supplied "CARRENTALO — MASTER WEBSITE BUILD PROMPT" (this
document condenses it and records the concrete decisions taken).

## Purpose

International car-rental **lead-generation** site for carrentalo.com, aimed at Google
Ads traffic. Primary conversion: the quote/enquiry form (plus call/WhatsApp when
configured). There is no live inventory — the UI never pretends otherwise; the search
widget routes into an enquiry, architected so live availability can be added later.

## Hard constraint: distinct identity from CarsonRento

CarsonRento (~/carsonrento) is editorial/premium: warm cream `#faf8f5`, deep teal
accent `#0e6f6a`, Manrope, cinematic full-width heroes, uniform cards.

CarRentalO must read as a different company: light, energetic travel-tech.

| Aspect | CarsonRento | CarRentalO (this build) |
|---|---|---|
| Background | warm cream | warm white `#F7F8F6` / `#FFFFFF` |
| Accent | deep teal | emerald `#18A66A` + mint `#DDF5E8` |
| Text | near-black warm | deep charcoal `#0E1714` |
| Font | Manrope | **Inter** (friendly weights, tighter labels) |
| Hero | full-width cinematic | split/asymmetric + floating search panel |
| Cards | uniform grid | masonry/asymmetric mixed sizes |
| Footer | light | dark charcoal |
| Motif | editorial luxury | map/route/location shapes, rounded 2xl geometry |

Palette tokens: `#0E1714`, `#18A66A`, `#DDF5E8`, `#F7F8F6`, `#FFFFFF`, `#E7EBE8`,
plus soft gray/beige supports. Green reserved for primary buttons, active states,
search controls, highlights, badges. No heavy gradients.

## Stack

Next.js 16.3.6 (App Router, `src/` layout, typed `PageProps`/`LayoutProps`),
React 19, Tailwind CSS v4 (`@theme inline` tokens in globals.css), TypeScript,
next/font (Inter), next/image. No extra runtime dependencies.

## Routes

`/` (homepage), campaign landers `/car-rental`, `/airport-car-rental`, `/suv-rental`,
`/luxury-car-rental`, `/monthly-car-rental` via data-driven `[campaign]` route
(`dynamicParams=false`, `generateStaticParams`), plus `/locations`, `/contact`,
`/faq`, `/privacy-policy`, `/terms`, `not-found`, `robots.ts`, `sitemap.ts`.
Future: `/car-rental/[location]` (data structure supports it; not built yet).

Each campaign page: campaign-specific H1/meta/canonical, relevant hero, search or
quote component, relevant vehicle categories, benefits, how-it-works, FAQ, CTA.

## Homepage section order

1. Split hero — left copy ("Find a Car That Fits Your Journey."), right rounded
   vehicle image over subtle map-route shapes; floating SearchWidget overlapping below.
2. Benefit strip — compact horizontal scroll-style strip with small icons.
3. Explore vehicles — asymmetric grid: 1 large SUV feature card + smaller mixed cards
   (sedan, luxury, family, economy, compact). No invented prices.
4. Journey types — "One Rental. Many Reasons to Drive.": Airport / Business /
   Weekend / Road Trip, four visually distinct tiles.
5. Why CarRentalO — "Everything You Need to Get Moving.": large green feature block +
   small benefit cards (Easy Enquiry, Flexible Options, Clear Communication, Travel Support).
6. Location explorer — left large image, right popular-location rows (city/country/
   explore). Data-driven; same placeholder cities as CarsonRento's configurable list.
7. How it works — horizontal numbered timeline (vertical on mobile), 4 steps.
8. Travel story — panoramic image with floating "Plan your next drive" card.
9. Trust section — "Built Around Your Journey" factual points (no fake testimonials).
10. FAQ accordion (factual answers only, no invented policies).
11. Final CTA — green section, "Ready to Find Your Ride?", subtle road graphic.
12. Dark charcoal footer.

Mobile: intentional order (hero copy → search card → categories → journeys → benefits
→ locations → FAQ → CTA), sticky bottom bar [Call][Get Quote] (call hidden until
phone configured).

## Search widget

Most important UI component. Desktop: large horizontal floating bar (pick-up,
drop-off, pick-up date, drop-off date, optional car type + Find Cars). No live
inventory → submit routes to the quote form section/page with fields prefilled via
query params, CTA framed as enquiry. Fires `search_started`.

## Lead form & data flow

Reusable QuoteForm (name, email, phone, pick-up/drop-off location, dates, vehicle
preference, message) → server action with honeypot, control-char stripping, length
clamp, client+server validation → `LEAD_WEBHOOK_URL` env webhook (logged server-side
when unset; leads never silently lost). No secrets in client code.

## Config & tracking

`lib/site.ts`: name/domain/url/contacts all env-driven (`NEXT_PUBLIC_PHONE`,
`NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`…) — CTAs hide when unconfigured.
`lib/analytics.ts`: `search_started`, `quote_form_started`, `quote_form_submitted`,
`call_clicked`, `whatsapp_clicked`, `vehicle_clicked`, `location_clicked`; fires only
when `NEXT_PUBLIC_GA_ID` set. No fake IDs anywhere.

## Data modules (`src/data/`)

`vehicles.ts`, `locations.ts`, `faqs.ts`, `journey-types.ts`, `navigation.ts`,
`campaigns.ts`, `images.ts`. No content duplicated in JSX. No fabricated prices,
reviews, stats, fleet numbers, awards.

## Images

Branded SVG placeholders (bright, travel-toned, clearly non-final) under
`public/images/{vehicles,journeys,locations,heroes,travel}`, referenced through the
`images.ts` map so real commercial photography (.webp) drops in without code changes.
next/image everywhere; hero `priority`, below-fold lazy.

## Quality bar

Semantic HTML, one H1/page, unique metadata + canonical per page, OG, sitemap,
robots, keyboard nav, visible focus, labels, alt text, contrast, tap targets,
`prefers-reduced-motion`, subtle motion only, minimal client JS (server components
by default). `npm run lint` and `npm run build` must pass.

## Content rules

Original copy, natural human language, no "Welcome to our platform"-style corporate
filler, no superlative claims ("cheapest", "#1", "guaranteed"), no fabricated
testimonials/locations/prices. Social links omitted until real accounts exist.
