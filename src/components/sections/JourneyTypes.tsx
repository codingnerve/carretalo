import Image from "next/image";
import type { JourneyType } from "@/data/journey-types";

/**
 * Four deliberately non-uniform tiles: alternating aspect ratios and
 * vertical offsets give the section a masonry rhythm.
 */
const tileStyles = [
  "sm:mt-0 aspect-[3/4]",
  "sm:mt-10 aspect-square",
  "sm:mt-4 aspect-square",
  "sm:mt-14 aspect-[3/4]",
];

export function JourneyTypes({ journeys }: { journeys: JourneyType[] }) {
  return (
    <section aria-labelledby="journeys-heading" className="bg-beige/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-strong">
          Journey types
        </p>
        <h2 id="journeys-heading" className="mt-2 max-w-lg text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          One rental. Many reasons to drive.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {journeys.map((j, i) => (
            <div
              key={j.slug}
              className={`group relative overflow-hidden rounded-3xl ${tileStyles[i % tileStyles.length]}`}
            >
              <Image
                src={j.image}
                alt={`${j.name} trips`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-5 pt-14">
                <h3 className="text-lg font-bold text-surface-raised">{j.name}</h3>
                <p className="mt-1 text-sm text-on-ink/85">{j.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
