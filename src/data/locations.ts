export type RentalLocation = {
  city: string;
  country: string;
  slug: string;
  image: string;
};

/**
 * PLACEHOLDER — replace with the locations actually served before launch.
 * The UI renders whatever is listed here; nothing else hardcodes cities.
 * (Future: /car-rental/[location] pages can be generated from this list.)
 */
export const locations: RentalLocation[] = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    slug: "dubai",
    image: "/images/locations/dubai.svg",
  },
  {
    city: "London",
    country: "United Kingdom",
    slug: "london",
    image: "/images/locations/london.svg",
  },
  {
    city: "New York",
    country: "United States",
    slug: "new-york",
    image: "/images/locations/new-york.svg",
  },
  {
    city: "Singapore",
    country: "Singapore",
    slug: "singapore",
    image: "/images/locations/singapore.svg",
  },
];
