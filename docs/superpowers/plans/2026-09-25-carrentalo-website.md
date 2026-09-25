# CarRentalO Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete CarRentalO lead-generation website (homepage, 5 Google-Ads campaign landers, support pages) with a travel-tech identity fully distinct from CarsonRento.

**Architecture:** Next.js App Router in `src/`, server components by default; all content in typed `src/data/` modules consumed by presentational components; one server action for lead delivery; env-driven contacts/analytics so nothing fake ships. Campaign pages are one dynamic `[campaign]` route rendered from `data/campaigns.ts`.

**Tech Stack:** Next.js 16.3.6, React 19, Tailwind CSS v4 (`@theme inline` tokens), TypeScript, next/font (Inter), next/image. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-25-carrentalo-website-design.md`

## Global Constraints

- Palette exactly: charcoal `#0E1714`, emerald `#18A66A`, mint `#DDF5E8`, warm white `#F7F8F6`, `#FFFFFF`, `#E7EBE8`; green only for primary buttons/active states/search controls/highlights/badges; no heavy gradients.
- Font: **Inter** via next/font (CarsonRento uses Manrope — do not use it here). No serif display type.
- Nothing fabricated: no prices, reviews, statistics, fleet numbers, awards, partnerships, social links, tracking IDs, phone numbers. Contacts/GA come from env and UI hides when unset.
- No superlative claims ("cheapest", "best", "#1", "guaranteed") and no corporate filler ("Welcome to our platform").
- Visual identity must diverge from CarsonRento per the spec's comparison table (split hero, masonry cards, dark footer, map/route motifs).
- Verification cycle per task = `npm run lint` + `npm run build` (no unit-test framework; site is presentational, spec forbids unneeded deps). Render checks with `next dev` for interactive pieces.
- One H1 per page; semantic HTML; alt text; labels; visible focus; `prefers-reduced-motion` respected.
- Commit after each task with a conventional message + Claude attribution line.

## Review Focus

1. `LEAD_WEBHOOK_URL` unset (default dev state) → quote submission still returns success and logs the lead server-side; verify in Task 6 by submitting the form in `next dev` and checking the terminal log.
2. Drop-off date earlier than pick-up date → server action returns field error "Drop-off can't be before pick-up." and the form shows it inline; verify in Task 6.
3. No phone/WhatsApp env configured → header call button, sticky mobile bar call slot, and contact-channel blocks hide; sticky bar still shows Get Quote alone without layout break; verify rendered in Task 5/7.
4. Unknown campaign slug (e.g. `/van-rental`) → 404 page, not a crash or empty page (`dynamicParams = false`); verify in Task 8 build output + dev check.
5. Search widget submitted with every field empty → navigates to `/contact#quote` with no params and the quote form renders with empty defaults (no `undefined` strings); verify in Task 6.

---

### Task 1: Design tokens, fonts, site config, analytics, layout shell

**Files:**
- Modify: `src/app/globals.css` (replace scaffold), `src/app/layout.tsx` (replace scaffold), `src/app/page.tsx` (temporary stub `<h1>`)
- Create: `src/lib/site.ts`, `src/lib/analytics.ts`, `.env.example`
- Delete scaffold leftovers referenced nowhere (default svg assets in `public/` if present)

**Interfaces:**
- Produces: `site` const (`name`, `domain`, `url`, `tagline`, `description`, `phone`, `phoneDisplay`, `whatsapp`, `email`), `telHref(): string | null`, `whatsappHref(): string | null`; `trackEvent(event: ConversionEvent, params?: Record<string, string | number>): void` with `ConversionEvent = "search_started" | "quote_form_started" | "quote_form_submitted" | "call_clicked" | "whatsapp_clicked" | "vehicle_clicked" | "location_clicked"`; CSS token classes `bg-surface`, `bg-surface-raised`, `text-ink`, `text-ink-muted`, `bg-brand`, `text-brand`, `bg-mint`, `border-line`, `bg-ink` (footer), `text-on-brand`, `text-on-ink`.

- [ ] Write `globals.css`: Tailwind v4 import, `:root` tokens from the palette, `@theme inline` mapping to `--color-*` names above, Inter as `--font-sans`, focus-visible outline in emerald, `::selection` mint, reduced-motion block, small keyframes (`fade-up`, `rise-in`) used by section reveals.
- [ ] Write `lib/site.ts` and `lib/analytics.ts` (CarsonRento pattern, CarRentalO strings/events — add `vehicle_clicked`, `location_clicked`).
- [ ] Write `layout.tsx`: Inter via `next/font/google`, metadata (`metadataBase`, title default `CarRentalO — Find Your Ride. Start Your Journey.` + template `%s | CarRentalO`, description, OG, robots), skip link, `<main id="main">`, GA scripts gated on `GA_ID`. Header/Footer/StickyMobileCTA imports added in Task 5 — for now render children only.
- [ ] Write `.env.example` documenting `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_PHONE_DISPLAY`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_GA_ID`, `LEAD_WEBHOOK_URL`.
- [ ] Run `npm run lint` and `npm run build` → both pass.
- [ ] Commit `feat: design tokens, site config, layout shell`.

### Task 2: Data modules

**Files:**
- Create: `src/data/images.ts`, `src/data/vehicles.ts`, `src/data/journey-types.ts`, `src/data/locations.ts`, `src/data/faqs.ts`, `src/data/navigation.ts`, `src/data/campaigns.ts`

**Interfaces:**
- Produces:
  - `images.ts`: `vehicleImages: Record<VehicleSlug, string>`, `journeyImages`, `heroImages` (`home`, per-campaign slugs, `cta`), `travelImages` (`story`, `locations`).
  - `vehicles.ts`: `type Vehicle = { slug: "suv" | "sedan" | "luxury" | "family" | "economy" | "compact"; name: string; tagline: string; description: string; seats?: string; featured?: boolean }`; `export const vehicles: Vehicle[]` (SUV `featured: true`, tagline "Space for every adventure"). **No price fields.**
  - `journey-types.ts`: `type JourneyType = { slug: "airport" | "business" | "weekend" | "road-trip"; name: string; blurb: string; image: string }`; `journeyTypes: JourneyType[]`.
  - `locations.ts`: `type RentalLocation = { city: string; country: string; slug: string; image: string }`; `locations: RentalLocation[]` — same 4 placeholder cities as CarsonRento (Dubai, London, New York, Singapore) with a `// PLACEHOLDER — replace with real served locations before launch` comment.
  - `faqs.ts`: `type Faq = { question: string; answer: string }`; `faqs: Faq[]` for the 7 spec questions, factual process answers only (enquiry → team replies with options/quote; no invented policies).
  - `navigation.ts`: `mainNav: { label: string; href: string }[]` (Cars→`/car-rental`, Airport→`/airport-car-rental`, Locations→`/locations`, FAQ→`/faq`, Contact→`/contact`) and `footerColumns: { heading: string; links: {label, href}[] }[]` for Cars / Locations / Support / Company.
  - `campaigns.ts`: `type Campaign = { slug: string; h1: string; metaTitle: string; metaDescription: string; heroImage: string; intro: string; eyebrow: string; vehicleSlugs: Vehicle["slug"][]; benefits: { title: string; text: string }[]; faqSlice: [number, number] }`; `campaigns: Campaign[]` for `car-rental`, `airport-car-rental`, `suv-rental`, `luxury-car-rental`, `monthly-car-rental`; `getCampaign(slug: string): Campaign | undefined`. Airport lander H1 "Find Your Airport Rental Car"; each lander campaign-specific H1/meta, natural copy, zero invented claims.
- [ ] Write all seven modules with real copy (short, human, travel-toned).
- [ ] `npm run lint` && `npm run build` pass (stub page may import nothing yet — modules just typecheck).
- [ ] Commit `feat: content data modules`.

### Task 3: Placeholder image assets

**Files:**
- Create: `public/images/vehicles/{economy,compact,sedan,suv,luxury,family}.svg`, `public/images/journeys/{airport,business,weekend,road-trip}.svg`, `public/images/heroes/{home,car-rental,airport-car-rental,suv-rental,luxury-car-rental,monthly-car-rental,cta}.svg`, `public/images/travel/{story,locations}.svg`

**Interfaces:**
- Produces: files at exactly the paths `data/images.ts` references.

- [ ] Draw bright flat-style SVGs in the CarRentalO palette (mint/emerald/warm-white; simple car silhouettes, route lines, location pins, horizon panoramas — clearly placeholder, visually on-brand, each labeled with its category name as text).
- [ ] `npm run build` passes; spot-check one image serves in `next dev`.
- [ ] Commit `feat: placeholder image assets`.

### Task 4: UI primitives

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/Field.tsx`, `src/components/ui/Badge.tsx`

**Interfaces:**
- Produces:
  - `Button`: `{ variant?: "primary" | "secondary" | "ghost" | "onBrand"; size?: "md" | "lg"; href?: string } & button/anchor props` — renders `Link` when `href` given; primary = emerald pill, secondary = charcoal outline, onBrand = white on green sections. Rounded-full, 44px+ tap target.
  - `Field.tsx`: `TextField`, `SelectField`, `TextAreaField` — each `{ label: string; name: string; error?: string; ... }` with visible `<label htmlFor>`, rounded-xl inputs, mint focus ring, error text `aria-describedby`.
  - `Badge`: small mint pill with emerald text.
- [ ] Implement all three files.
- [ ] `npm run lint` && `npm run build` pass.
- [ ] Commit `feat: ui primitives`.

### Task 5: Header, MobileMenu, Footer, StickyMobileCTA

**Files:**
- Create: `src/components/Header.tsx` (client — scroll state + menu toggle), `src/components/Footer.tsx`, `src/components/StickyMobileCTA.tsx` (client)
- Modify: `src/app/layout.tsx` (mount them)

**Interfaces:**
- Consumes: `mainNav`, `footerColumns`, `site`, `telHref`, `whatsappHref`, `trackEvent`, `Button`.
- Produces: `<Header />`, `<Footer />`, `<StickyMobileCTA />` (no props — read config internally).

- [ ] Header: warm-white translucent bar, wordmark "CarRentalO" with emerald dot/pin motif, centered nav links, right side [call button if `telHref()`] + primary "Get a Quote" → `/contact#quote`; hamburger opens full-screen mobile menu (focus-trapped, Esc closes, `aria-expanded`).
- [ ] Footer: `bg-ink` dark charcoal, brand blurb column + `footerColumns`, legal row (Privacy Policy, Terms, Contact), no social links.
- [ ] StickyMobileCTA: fixed bottom bar `md:hidden` — [Call] (only when phone set; fires `call_clicked`) + [Get Quote]; body bottom padding so content never hides under it.
- [ ] Render check in `next dev`: with no env set, call buttons absent, quote CTA intact (Review Focus 3).
- [ ] `npm run lint` && `npm run build`; commit `feat: chrome — header, footer, sticky CTA`.

### Task 6: Search widget, quote server action, quote form, contact page

**Files:**
- Create: `src/app/actions/quote.ts`, `src/components/SearchWidget.tsx` (client), `src/components/QuoteForm.tsx` (client), `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: Field primitives, `Button`, `trackEvent`, `site`.
- Produces:
  - `submitQuote(prev: QuoteFormState, formData: FormData): Promise<QuoteFormState>` with `QuoteFormState = { status: "idle" | "success" | "error"; message: string; fieldErrors: Partial<Record<string, string>> }` — honeypot field `company`, control-char strip + 2000-char clamp, requires name≥2/valid email/pickup location, rejects dropoffDate < pickupDate, posts JSON to `LEAD_WEBHOOK_URL` else `console.log`s the lead.
  - `SearchWidget` props `{ compact?: boolean }`: fields pickupLocation, dropoffLocation, pickupDate, dropoffDate, vehicle select; submit fires `search_started` then `router.push("/contact?" + params + "#quote")`, omitting empty params (Review Focus 5). CTA label "Find Cars"; helper line "No live availability yet — we reply with a personal quote."-style honesty per spec.
  - `QuoteForm` props `{ defaults?: Partial<Record<"pickupLocation" | "dropoffLocation" | "pickupDate" | "dropoffDate" | "vehiclePreference", string>>; source?: string }`: `useActionState(submitQuote, …)`, fires `quote_form_started` on first focus and `quote_form_submitted` on success, client-side required checks mirroring server, success panel replaces form.
  - Contact page: metadata + canonical `/contact`, H1, contact channels (each only when env set), `<QuoteForm defaults={await searchParams}>` under `id="quote"`.
- [ ] Implement action, widget, form, page as specified.
- [ ] Dev-render checks: submit with webhook unset → success + `[lead]` log (RF 1); dropoff \< pickup → inline error (RF 2); search with all fields empty → clean `/contact#quote` (RF 5).
- [ ] `npm run lint` && `npm run build`; commit `feat: search-to-enquiry flow and lead form`.

### Task 7: Homepage sections + assembly

**Files:**
- Create: `src/components/sections/Hero.tsx`, `BenefitStrip.tsx`, `VehicleShowcase.tsx`, `JourneyTypes.tsx`, `WhyCarRentalO.tsx`, `LocationExplorer.tsx`, `HowItWorks.tsx`, `TravelStory.tsx`, `TrustPoints.tsx`, `FAQAccordion.tsx` (client), `FinalCTA.tsx`
- Modify: `src/app/page.tsx` (assemble in spec order)

**Interfaces:**
- Consumes: all data modules, primitives, `SearchWidget`.
- Produces: server components (FAQAccordion client) with props: `VehicleShowcase { vehicles }`, `JourneyTypes { journeys }`, `LocationExplorer { locations }`, `FAQAccordion { faqs }`, others prop-less; each section semantic `<section>` with heading hierarchy (single page H1 lives in Hero).
- [ ] Hero: asymmetric grid — left eyebrow "CAR RENTAL MADE SIMPLE", H1 "Find a Car That Fits Your Journey.", copy, [Find a Car → #vehicles][Get a Quote → /contact#quote]; right rounded-3xl hero image (`priority`) over decorative dashed route/pin SVG shapes; `SearchWidget` floats overlapping the hero bottom.
- [ ] BenefitStrip: compact bordered strip, 4 items with inline icons, horizontal scroll on mobile.
- [ ] VehicleShowcase (`id="vehicles"`): asymmetric grid — SUV spans 2×2 with large image, sedan/luxury/family/economy/compact as smaller mixed cards; each links to matching campaign page (fires `vehicle_clicked`); no prices.
- [ ] JourneyTypes: "One Rental. Many Reasons to Drive." — 4 visually distinct tiles (varying image ratios/offsets).
- [ ] WhyCarRentalO: "Everything You Need to Get Moving." — large emerald feature block + 3 small white benefit cards.
- [ ] LocationExplorer: split — left large travel image, right location rows (city, country, "Explore" → `/locations`, fires `location_clicked`).
- [ ] HowItWorks: numbered 4-step horizontal timeline with connecting line; vertical on mobile.
- [ ] TravelStory: panoramic image band, floating card "Plan your next drive" + [Explore Cars].
- [ ] TrustPoints: "Built Around Your Journey" — factual points, no testimonials.
- [ ] FAQAccordion: accessible disclosure list (`<details>`-style or button+region with `aria-expanded`).
- [ ] FinalCTA: emerald section, road/path line SVG background, "Ready to Find Your Ride?" + both CTAs (onBrand variant).
- [ ] Assemble `page.tsx` in order 1–12 from spec; mobile order verified.
- [ ] Dev-render check at 375px, 768px, 1280px; `npm run lint` && `npm run build`; commit `feat: homepage`.

### Task 8: Campaign landing pages

**Files:**
- Create: `src/components/CampaignLanding.tsx`, `src/app/[campaign]/page.tsx`

**Interfaces:**
- Consumes: `campaigns`, `getCampaign`, `vehicles`, `faqs`, section components (BenefitStrip-style benefits, HowItWorks, FAQAccordion, FinalCTA), `SearchWidget`, `QuoteForm`.
- Produces: `/[campaign]` static pages with `dynamicParams = false`, `generateStaticParams`, `generateMetadata` (absolute title, description, canonical `/${slug}`, OG) — Next 16 pattern: `PageProps<"/[campaign]">`, `const { campaign } = await params`.
- [ ] CampaignLanding: campaign hero (specific H1 + image + eyebrow), SearchWidget, filtered vehicle cards, benefits grid, HowItWorks, FAQ slice, FinalCTA.
- [ ] Route file with static params + metadata + `notFound()` guard.
- [ ] Verify build emits all 5 slugs statically; `/van-rental` 404s in dev (RF 4).
- [ ] `npm run lint` && `npm run build`; commit `feat: campaign landing pages`.

### Task 9: Locations, FAQ, legal pages, 404

**Files:**
- Create: `src/app/locations/page.tsx`, `src/app/faq/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`, `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `locations`, `faqs`, `FAQAccordion`, `FinalCTA`, `Button`, `site`.
- [ ] Locations: H1, grid of location cards (image, city, country, enquiry CTA), note that coverage is confirmed on enquiry; metadata + canonical.
- [ ] FAQ: full accordion + contact pointer + FinalCTA; metadata + canonical.
- [ ] Privacy/Terms: honest generic-but-real policy text for a lead-gen site (data collected = form fields, used to respond to enquiry; no invented legal entities), `lastUpdated` date constant; metadata + canonical + `robots: { index: false }` not needed — keep indexable.
- [ ] not-found: friendly 404 with route-line graphic, links home/contact.
- [ ] `npm run lint` && `npm run build`; commit `feat: support pages`.

### Task 10: SEO plumbing, docs, final verification

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `README.md` (replace scaffold), `CLAUDE.md` already `@AGENTS.md` (leave)
- Modify: anything the check below flags

**Interfaces:**
- Consumes: `site.url`, `campaigns`.
- [ ] sitemap: static routes + campaign slugs; robots: allow all + sitemap URL.
- [ ] README: project purpose, env vars table, how leads flow, how to replace placeholder images/locations, dev/build commands.
- [ ] Full check pass from spec §34: nav links, search, quote form, FAQ, campaign pages, metadata/canonicals in page source, 404, mobile/tablet/desktop renders, reduced-motion, focus states.
- [ ] CarsonRento divergence review (spec table): hero, header, search, cards, benefits, locations, CTA, footer all structurally different — fix any lookalikes.
- [ ] `npm run lint` && `npm run build` clean; commit `feat: seo plumbing and docs`.
