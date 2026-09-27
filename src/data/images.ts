/**
 * Central image registry. Every visual asset is referenced through this
 * module so real commercial photography (.webp) can replace the branded
 * SVG placeholders without touching component code.
 */
export const vehicleImages = {
  economy: "/images/vehicles/economy.webp",
  compact: "/images/vehicles/compact.webp",
  sedan: "/images/vehicles/sedan.webp",
  suv: "/images/vehicles/suv.webp",
  luxury: "/images/vehicles/luxury.webp",
  family: "/images/vehicles/family.webp",
} as const;

export const journeyImages = {
  airport: "/images/journeys/airport.webp",
  business: "/images/journeys/business.webp",
  weekend: "/images/journeys/weekend.webp",
  "road-trip": "/images/journeys/road-trip.webp",
} as const;

export const heroImages = {
  home: "/images/heroes/home.webp",
  "car-rental": "/images/heroes/car-rental.webp",
  "airport-car-rental": "/images/heroes/airport-car-rental.webp",
  "suv-rental": "/images/heroes/suv-rental.webp",
  "luxury-car-rental": "/images/heroes/luxury-car-rental.webp",
  "monthly-car-rental": "/images/heroes/monthly-car-rental.webp",
  cta: "/images/heroes/cta.webp",
} as const;

export const travelImages = {
  story: "/images/travel/story.webp",
  locations: "/images/travel/locations.webp",
} as const;
