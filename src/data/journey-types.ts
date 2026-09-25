import { journeyImages } from "./images";

export type JourneyType = {
  slug: "airport" | "business" | "weekend" | "road-trip";
  name: string;
  blurb: string;
  image: string;
};

export const journeyTypes: JourneyType[] = [
  {
    slug: "airport",
    name: "Airport",
    blurb: "Land, pick up your car and go — arrivals made easy.",
    image: journeyImages.airport,
  },
  {
    slug: "business",
    name: "Business",
    blurb: "Reliable cars that keep your schedule on schedule.",
    image: journeyImages.business,
  },
  {
    slug: "weekend",
    name: "Weekend",
    blurb: "Two days, one car, zero complications.",
    image: journeyImages.weekend,
  },
  {
    slug: "road-trip",
    name: "Road Trip",
    blurb: "Comfort and space for the long way around.",
    image: journeyImages["road-trip"],
  },
];
