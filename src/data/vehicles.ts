import { vehicleImages } from "./images";

export type Vehicle = {
  slug: "suv" | "sedan" | "luxury" | "family" | "economy" | "compact";
  name: string;
  tagline: string;
  description: string;
  seats?: string;
  image: string;
  featured?: boolean;
};

/**
 * Vehicle categories only — no prices. Pricing depends on location and
 * dates and is quoted per enquiry; never add price fields without
 * verified rates.
 */
export const vehicles: Vehicle[] = [
  {
    slug: "suv",
    name: "SUV",
    tagline: "Space for every adventure",
    description:
      "Room for people, luggage and long distances — a comfortable pick for families and road trips alike.",
    seats: "5–7 seats",
    image: vehicleImages.suv,
    featured: true,
  },
  {
    slug: "sedan",
    name: "Sedan",
    tagline: "Comfort for the everyday",
    description:
      "A smooth, quiet ride that works just as well for business trips as for city getaways.",
    seats: "5 seats",
    image: vehicleImages.sedan,
  },
  {
    slug: "luxury",
    name: "Luxury",
    tagline: "Arrive the way you want to",
    description:
      "Premium models with the comfort and finish to match special occasions and important meetings.",
    seats: "4–5 seats",
    image: vehicleImages.luxury,
  },
  {
    slug: "family",
    name: "Family",
    tagline: "Everyone comes along",
    description:
      "Vans and larger vehicles with the seats and boot space a whole family actually needs.",
    seats: "7+ seats",
    image: vehicleImages.family,
  },
  {
    slug: "economy",
    name: "Economy",
    tagline: "Simple, sensible, easy",
    description:
      "Compact on cost and fuel without giving up the essentials — great for city driving.",
    seats: "4–5 seats",
    image: vehicleImages.economy,
  },
  {
    slug: "compact",
    name: "Compact",
    tagline: "Nimble around town",
    description:
      "Easy to park, easy to drive — the right size for short trips and busy streets.",
    seats: "4 seats",
    image: vehicleImages.compact,
  },
];

export function getVehicle(slug: Vehicle["slug"]): Vehicle {
  return vehicles.find((v) => v.slug === slug)!;
}
