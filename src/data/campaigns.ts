import { heroImages } from "./images";
import type { Vehicle } from "./vehicles";

export type Campaign = {
  slug: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  intro: string;
  vehicleSlugs: Vehicle["slug"][];
  benefits: { title: string; text: string }[];
  /** [start, end) slice of the shared FAQ list shown on this lander. */
  faqSlice: [number, number];
};

/**
 * Google Ads landing pages. Add an entry here and the page exists at
 * /<slug> — campaign-specific H1, metadata and content, no code changes.
 */
export const campaigns: Campaign[] = [
  {
    slug: "car-rental",
    eyebrow: "Car rental made simple",
    h1: "Find the Right Rental Car for Your Trip",
    metaTitle: "Car Rental Enquiries Made Simple | CarRentalO",
    metaDescription:
      "Tell us where you're going and we'll help you find the right rental car — economy to luxury — with a quick enquiry and a personal quote.",
    heroImage: heroImages["car-rental"],
    intro:
      "Skip the endless comparison tabs. Send one enquiry and get concrete vehicle options for your route and dates.",
    vehicleSlugs: ["economy", "compact", "sedan", "suv", "family", "luxury"],
    benefits: [
      {
        title: "Every category",
        text: "From city runabouts to seven-seaters — tell us what your trip needs.",
      },
      {
        title: "One simple enquiry",
        text: "A short form instead of account sign-ups and checkout flows.",
      },
      {
        title: "A personal reply",
        text: "A real person answers with options and a quote for your dates.",
      },
    ],
    faqSlice: [0, 4],
  },
  {
    slug: "airport-car-rental",
    eyebrow: "Airport pick-ups",
    h1: "Find Your Airport Rental Car",
    metaTitle: "Airport Car Rental Enquiries | CarRentalO",
    metaDescription:
      "Landing soon? Request an airport rental car with one enquiry — tell us your airport, flight time and dates and get a personal quote.",
    heroImage: heroImages["airport-car-rental"],
    intro:
      "Tell us which airport you're flying into and when. We'll propose pick-up arrangements that fit your arrival — so the car is sorted before you board.",
    vehicleSlugs: ["economy", "sedan", "suv", "family"],
    benefits: [
      {
        title: "Arrival-friendly",
        text: "Share your flight time and we plan the pick-up around it.",
      },
      {
        title: "Any trip length",
        text: "From a one-day meeting run to a multi-week stay.",
      },
      {
        title: "Clear next steps",
        text: "You'll know exactly where and how to collect the car before you fly.",
      },
    ],
    faqSlice: [0, 4],
  },
  {
    slug: "suv-rental",
    eyebrow: "Space and comfort",
    h1: "Rent an SUV Built for the Whole Journey",
    metaTitle: "SUV Rental Enquiries | CarRentalO",
    metaDescription:
      "Need room for people, luggage and long distances? Request an SUV rental with one quick enquiry and get a personal quote for your dates.",
    heroImage: heroImages["suv-rental"],
    intro:
      "Five to seven seats, real boot space and the comfort to make long distances easy — tell us your route and we'll match the SUV to it.",
    vehicleSlugs: ["suv", "family"],
    benefits: [
      {
        title: "Room that matters",
        text: "Seats and luggage space for families, groups and gear.",
      },
      {
        title: "Built for distance",
        text: "Comfortable choices for motorways, mountains and everything between.",
      },
      {
        title: "Matched to your route",
        text: "Tell us the terrain and distance — we suggest the right model.",
      },
    ],
    faqSlice: [3, 7],
  },
  {
    slug: "luxury-car-rental",
    eyebrow: "Premium rentals",
    h1: "Rent a Luxury Car for the Occasion",
    metaTitle: "Luxury Car Rental Enquiries | CarRentalO",
    metaDescription:
      "Weddings, business, special trips — request a luxury rental car with one enquiry and get personally matched options and a quote.",
    heroImage: heroImages["luxury-car-rental"],
    intro:
      "Whether it's a wedding day, an important client or simply the trip you've been waiting for, tell us the occasion and we'll suggest cars that live up to it.",
    vehicleSlugs: ["luxury", "sedan"],
    benefits: [
      {
        title: "Occasion-matched",
        text: "Tell us the event and we propose models with the right presence.",
      },
      {
        title: "Discreet and simple",
        text: "One enquiry, a clear quote, no showroom back-and-forth.",
      },
      {
        title: "Specific requests welcome",
        text: "Name a model you have in mind — we'll try to source it or suggest the closest match.",
      },
    ],
    faqSlice: [3, 7],
  },
  {
    slug: "monthly-car-rental",
    eyebrow: "Long-term rentals",
    h1: "Monthly Car Rental Without the Commitment of Ownership",
    metaTitle: "Monthly Car Rental Enquiries | CarRentalO",
    metaDescription:
      "Staying somewhere longer? Request a monthly car rental with one enquiry — flexible periods, a personal quote, no ownership hassle.",
    heroImage: heroImages["monthly-car-rental"],
    intro:
      "Relocating, on a long project or wintering somewhere warm — a monthly rental keeps you mobile without buying, insuring and reselling a car.",
    vehicleSlugs: ["economy", "sedan", "suv"],
    benefits: [
      {
        title: "Flexible periods",
        text: "One month or several — set the dates that fit your stay.",
      },
      {
        title: "One quote, all-in",
        text: "Know what the full period looks like before you commit.",
      },
      {
        title: "Swap-friendly",
        text: "Needs change mid-stay? Ask us about adjusting the vehicle or period.",
      },
    ],
    faqSlice: [0, 4],
  },
];

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}
