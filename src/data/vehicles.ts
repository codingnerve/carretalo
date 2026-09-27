export type Vehicle = {
  slug:
    | "suv"
    | "luxury"
    | "sedan"
    | "family"
    | "economy"
    | "compact"
    | "electric"
    | "convertible";
  name: string;
  tagline: string;
  description: string;
  image: string;
  seats?: string;
  passengers: number;
  bags: number;
  transmission: string;
  fuel: string;
  highlight: string;
  startingPrice: number;
  featured?: boolean;
};

export const vehicles: Vehicle[] = [
  {
    slug: "suv",
    name: "SUV",
    tagline: "Space, comfort, and capability.",
    description:
      "Our SUVs deliver the perfect blend of cargo space, passenger comfort, and all-terrain confidence — ideal for family road trips or group adventures.",
    image: "/images/vehicles/suv.webp",
    seats: "7 seats",
    passengers: 7,
    bags: 4,
    transmission: "Automatic",
    fuel: "Fuel Efficient",
    highlight: "Road Trip Ready",
    startingPrice: 59,
    featured: true,
  },
  {
    slug: "economy",
    name: "Economy",
    tagline: "Smart travel, lower cost.",
    description:
      "Get where you need to go without breaking the bank. Our economy cars are fuel-efficient and easy to park.",
    image: "/images/vehicles/economy.webp",
    seats: "5 seats",
    passengers: 5,
    bags: 2,
    transmission: "Automatic",
    fuel: "Fuel Efficient",
    highlight: "Smart Value",
    startingPrice: 35,
  },
  {
    slug: "sedan",
    name: "Sedan",
    tagline: "The classic everyday choice.",
    description:
      "Reliable, fuel-efficient, and comfortable — sedans are the go-to for city commutes and airport transfers.",
    image: "/images/vehicles/sedan.webp",
    seats: "5 seats",
    passengers: 5,
    bags: 3,
    transmission: "Automatic",
    fuel: "Fuel Efficient",
    highlight: "Comfort Cabin",
    startingPrice: 45,
  },
  {
    slug: "compact",
    name: "Compact",
    tagline: "Nimble in the city.",
    description:
      "Perfect for urban exploration — compact cars are easy to manoeuvre and fit in tight spots while still offering a comfortable ride.",
    image: "/images/vehicles/compact.webp",
    seats: "5 seats",
    passengers: 5,
    bags: 2,
    transmission: "Automatic",
    fuel: "Fuel Efficient",
    highlight: "Smart Value",
    startingPrice: 38,
  },
  {
    slug: "electric",
    name: "Electric (EV)",
    tagline: "Eco-friendly, smooth & quiet.",
    description:
      "Modern electric vehicles offering instant acceleration, high-tech cockpits, and zero emissions for sustainable travel.",
    image: "/images/vehicles/electric.jpg",
    seats: "5 seats",
    passengers: 5,
    bags: 3,
    transmission: "Automatic",
    fuel: "100% Electric",
    highlight: "Zero Emissions",
    startingPrice: 55,
  },
  {
    slug: "luxury",
    name: "Luxury",
    tagline: "Arrive in style.",
    description:
      "Premium interiors, cutting-edge tech, and a refined drive. Reserve a luxury vehicle for business travel or a special occasion.",
    image: "/images/vehicles/luxury.webp",
    seats: "5 seats",
    passengers: 5,
    bags: 3,
    transmission: "Automatic",
    fuel: "Premium Comfort",
    highlight: "Arrive in Style",
    startingPrice: 95,
  },
  {
    slug: "convertible",
    name: "Convertible",
    tagline: "Open-air thrills & coastal drives.",
    description:
      "Drop the top and soak up the sunshine. Perfect for scenic coastal highways, weekend escapes, and unforgettable drives.",
    image: "/images/vehicles/convertible.jpg",
    seats: "4 seats",
    passengers: 4,
    bags: 2,
    transmission: "Automatic",
    fuel: "Performance V6",
    highlight: "Open Top Thrill",
    startingPrice: 109,
  },
  {
    slug: "family",
    name: "Family Minivan",
    tagline: "Room for everyone and everything.",
    description:
      "Spacious minivans and large passenger haulers designed to keep the whole family comfortable, no matter how long the journey.",
    image: "/images/vehicles/family.webp",
    seats: "8 seats",
    passengers: 8,
    bags: 5,
    transmission: "Automatic",
    fuel: "Family Cruiser",
    highlight: "Max Space",
    startingPrice: 69,
  },
];

/** Look up a vehicle by slug. Throws if the slug doesn't exist. */
export function getVehicle(slug: Vehicle["slug"]): Vehicle {
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) throw new Error(`Unknown vehicle slug: "${slug}"`);
  return vehicle;
}
