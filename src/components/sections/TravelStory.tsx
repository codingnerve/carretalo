import Image from "next/image";
import { travelImages } from "@/data/images";
import { Button } from "@/components/ui/Button";

export function TravelStory() {
  return (
    <section aria-labelledby="story-heading" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src={travelImages.story}
          alt="Open road stretching toward the horizon"
          width={1920}
          height={760}
          sizes="(min-width: 1152px) 1104px, 100vw"
          className="h-72 w-full object-cover sm:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
        <div className="absolute inset-0 flex items-end p-6 sm:items-center sm:p-12">
          <div className="max-w-sm rounded-2xl bg-surface-raised/95 p-6 shadow-lg backdrop-blur sm:p-7">
            <h2 id="story-heading" className="text-2xl font-extrabold tracking-tight text-ink">
              Where will the road take you?
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Plan your next drive — explore rental options for your trip.
            </p>
            <div className="mt-5">
              <Button href="#vehicles">Explore Cars</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
