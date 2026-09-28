export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Airport", href: "/airport-car-rental" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Cars",
    links: [
      { label: "All rentals", href: "/car-rental" },
      { label: "SUV rental", href: "/suv-rental" },
      { label: "Luxury rental", href: "/luxury-car-rental" },
      { label: "Monthly rental", href: "/monthly-car-rental" },
    ],
  },
  {
    heading: "Travel",
    links: [
      { label: "Airport rental", href: "/airport-car-rental" },
      { label: "Locations", href: "/locations" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Get a quote", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
