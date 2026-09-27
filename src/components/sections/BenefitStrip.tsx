const benefits = [
  {
    label: "Flexible Rental Options",
    icon: <path d="M12 8v4l2.5 2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />,
  },
  {
    label: "Multiple Vehicle Categories",
    icon: (
      <path d="M5 17h14M6 12l1.5-4.5A2 2 0 0 1 9.4 6h5.2a2 2 0 0 1 1.9 1.5L18 12m-13 0h14a1 1 0 0 1 1 1v3h-2m-12 0H4v-3a1 1 0 0 1 1-1zm3 4a1.5 1.5 0 1 1-3 0m14 0a1.5 1.5 0 1 1-3 0" />
    ),
  },
  {
    label: "Airport & City Rentals",
    icon: <path d="M10.5 19.5L21 12 10.5 4.5v6L3 12l7.5 1.5v6z" />,
  },
  {
    label: "Helpful Customer Support",
    icon: (
      <path d="M4 13a8 8 0 1 1 16 0m-16 0v3a2 2 0 0 0 2 2h1v-5H4zm16 0v3a2 2 0 0 1-2 2h-1v-5h3z" />
    ),
  },
];

export function BenefitStrip() {
  return (
    <section aria-label="Why rent with us" className="border-y border-line bg-surface-raised">
      <ul className="mx-auto flex max-w-[1400px] items-stretch gap-2 overflow-x-auto px-3 py-4 sm:px-6 md:justify-between">
        {benefits.map((b) => (
          <li
            key={b.label}
            className="flex shrink-0 items-center gap-2.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-soft"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-brand"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {b.icon}
            </svg>
            {b.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
