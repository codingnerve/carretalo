import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <svg viewBox="0 0 200 80" aria-hidden="true" className="h-20 w-52 text-brand">
        <path
          d="M10 70 C 60 20, 90 75, 130 35 S 180 15, 195 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="1 10"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M195 2 a8 8 0 0 1 8 8 q0 6 -8 14 q-8 -8 -8 -14 a8 8 0 0 1 8 -8z"
          fill="currentColor"
        />
      </svg>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        This road doesn&apos;t go anywhere.
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
        get you back on route.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" size="lg">
          Back to home
        </Button>
        <Button href="/contact#quote" variant="secondary" size="lg">
          Get a Quote
        </Button>
      </div>
    </div>
  );
}
