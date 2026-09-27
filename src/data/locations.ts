export type RentalLocation = {
  city: string;
  state?: string;
  country: string;
  slug: string;
  image: string;
  airportCode: string;
  startingPrice: number;
  highlight: string;
  isUsa?: boolean;
};

export const locations: RentalLocation[] = [
  {
    city: "Orlando",
    state: "Florida",
    country: "United States",
    slug: "orlando",
    image: "/images/locations/orlando.jpg",
    airportCode: "MCO",
    startingPrice: 25,
    highlight: "Theme Parks & Resorts",
    isUsa: true,
  },
  {
    city: "Miami",
    state: "Florida",
    country: "United States",
    slug: "miami",
    image: "/images/locations/miami.jpg",
    airportCode: "MIA",
    startingPrice: 31,
    highlight: "South Beach & Coast",
    isUsa: true,
  },
  {
    city: "New York",
    state: "New York",
    country: "United States",
    slug: "new-york",
    image: "/images/locations/new-york.webp",
    airportCode: "JFK / LGA",
    startingPrice: 39,
    highlight: "City & Tri-State",
    isUsa: true,
  },
  {
    city: "Chicago",
    state: "Illinois",
    country: "United States",
    slug: "chicago",
    image: "/images/locations/chicago.jpg",
    airportCode: "ORD / MDW",
    startingPrice: 34,
    highlight: "Downtown & Lakeshore",
    isUsa: true,
  },
  {
    city: "Los Angeles",
    state: "California",
    country: "United States",
    slug: "los-angeles",
    image: "/images/locations/los-angeles.jpg",
    airportCode: "LAX",
    startingPrice: 33,
    highlight: "Coastline & Highway 1",
    isUsa: true,
  },
  {
    city: "Las Vegas",
    state: "Nevada",
    country: "United States",
    slug: "las-vegas",
    image: "/images/locations/las-vegas.jpg",
    airportCode: "LAS",
    startingPrice: 28,
    highlight: "The Strip & Canyons",
    isUsa: true,
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    slug: "dubai",
    image: "/images/locations/dubai.webp",
    airportCode: "DXB",
    startingPrice: 45,
    highlight: "Luxury City & Desert",
    isUsa: false,
  },
  {
    city: "London",
    country: "United Kingdom",
    slug: "london",
    image: "/images/locations/london.webp",
    airportCode: "LHR",
    startingPrice: 42,
    highlight: "Historic Hub & Countryside",
    isUsa: false,
  },
  {
    city: "Singapore",
    country: "Singapore",
    slug: "singapore",
    image: "/images/locations/singapore.webp",
    airportCode: "SIN",
    startingPrice: 49,
    highlight: "Island City State",
    isUsa: false,
  },
];
