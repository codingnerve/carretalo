/**
 * Central image registry. Every visual asset is referenced through this
 * module so real commercial photography (.webp) can replace the branded
 * SVG placeholders without touching component code.
 */
export const vehicleImages = {
  economy: "/images/vehicles/economy.svg",
  compact: "/images/vehicles/compact.svg",
  sedan: "/images/vehicles/sedan.svg",
  suv: "/images/vehicles/suv.svg",
  luxury: "/images/vehicles/luxury.svg",
  family: "/images/vehicles/family.svg",
} as const;

export const journeyImages = {
  airport: "/images/journeys/airport.svg",
  business: "/images/journeys/business.svg",
  weekend: "/images/journeys/weekend.svg",
  "road-trip": "/images/journeys/road-trip.svg",
} as const;

export const heroImages = {
  home: "/images/heroes/home.svg",
  "car-rental": "/images/heroes/car-rental.svg",
  "airport-car-rental": "/images/heroes/airport-car-rental.svg",
  "suv-rental": "/images/heroes/suv-rental.svg",
  "luxury-car-rental": "/images/heroes/luxury-car-rental.svg",
  "monthly-car-rental": "/images/heroes/monthly-car-rental.svg",
  cta: "/images/heroes/cta.svg",
} as const;

export const travelImages = {
  story: "/images/travel/story.svg",
  locations: "/images/travel/locations.svg",
} as const;
