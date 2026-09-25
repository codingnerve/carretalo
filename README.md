# CarRentalO

International car-rental **lead-generation** website for [carrentalo.com](https://carrentalo.com),
built for Google Ads traffic. There is no live inventory: the search widget and
quote form both feed a single enquiry flow, and the team replies with options
and a personal quote.

Design spec: `docs/superpowers/specs/2026-09-25-carrentalo-website-design.md`.
The visual identity (light travel-tech, emerald/mint, Inter) is deliberately
distinct from the sibling CarsonRento project.

## Commands

```bash
npm run dev     # local dev server
npm run lint    # eslint
npm run build   # production build (also type-checks)
```

## Configuration (all env-driven, nothing fake ships)

Copy `.env.example` to `.env.local`. Every value is optional:

| Variable | Effect when set |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap/robots |
| `NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_PHONE_DISPLAY` | Call buttons appear (header, sticky bar, contact) |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp link appears on the contact page |
| `NEXT_PUBLIC_EMAIL` | Email link appears on the contact page |
| `NEXT_PUBLIC_GA_ID` | Google Analytics loads and conversion events fire |
| `LEAD_WEBHOOK_URL` | Quote-form leads POST as JSON to this endpoint; while unset they are logged to the server console instead |

Conversion events (`src/lib/analytics.ts`): `search_started`,
`quote_form_started`, `quote_form_submitted`, `call_clicked`,
`whatsapp_clicked`, `vehicle_clicked`, `location_clicked`.

## How leads flow

1. `SearchWidget` (homepage/campaign pages) routes trip details to
   `/contact?…#quote` as query params.
2. `QuoteForm` (prefilled from those params) submits to the server action
   `src/app/actions/quote.ts`: honeypot, sanitization, validation, then
   webhook delivery or server-side logging.

## Content is data, not JSX

Everything editable lives in `src/data/`:

- `campaigns.ts` — one entry per Google Ads landing page (`/car-rental`,
  `/airport-car-rental`, …). Add an entry → the page, sitemap entry and
  static build output appear automatically.
- `vehicles.ts`, `journey-types.ts`, `faqs.ts`, `navigation.ts` — homepage
  and shared content. **No prices anywhere** — pricing is quoted per enquiry.
- `locations.ts` — ⚠️ placeholder cities. Replace with really-served
  locations before launch.
- `images.ts` — the image registry. All current images are branded SVG
  placeholders; drop real commercial photos (`.webp`) into
  `public/images/…` and update the paths here — components need no changes.

## Before launch checklist

- [ ] Replace placeholder images (`public/images/**`) with real photography
- [ ] Replace placeholder cities in `src/data/locations.ts`
- [ ] Set real contact channels + `LEAD_WEBHOOK_URL` in the deployment env
- [ ] Review `privacy-policy` and `terms` copy with counsel
