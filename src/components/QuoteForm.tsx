"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { submitQuote, type QuoteFormState } from "@/app/actions/quote";
import { vehicles } from "@/data/vehicles";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { TextField, SelectField, TextAreaField } from "@/components/ui/Field";

const initialState: QuoteFormState = { status: "idle", message: "", fieldErrors: {} };

export type QuoteDefaults = Partial<
  Record<
    "pickupLocation" | "dropoffLocation" | "pickupDate" | "dropoffDate" | "vehiclePreference",
    string
  >
>;

export function QuoteForm({
  defaults = {},
  source = "website",
}: {
  defaults?: QuoteDefaults;
  source?: string;
}) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const startedRef = useRef(false);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("quote_form_submitted", { source });
    }
  }, [state.status, source]);

  function onFirstInteraction() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("quote_form_started", { source });
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand/30 bg-mint p-8 text-center"
      >
        <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 text-brand-strong" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12.5l2.5 2.5L16 9" />
        </svg>
        <h3 className="mt-3 text-lg font-bold text-ink">Enquiry sent</h3>
        <p className="mt-2 text-sm text-ink-soft">{state.message}</p>
      </div>
    );
  }

  // Submit manually instead of via the form `action` prop: React 19 resets
  // uncontrolled fields after an action submission, which would wipe the
  // user's input when the server returns a validation error.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      aria-describedby={state.status === "error" ? "quote-form-message" : undefined}
    >
      {/* Honeypot — hidden from humans, tempting for bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="source" value={source} />

      <TextField
        label="Name"
        name="fullName"
        autoComplete="name"
        required
        error={state.fieldErrors.fullName}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={state.fieldErrors.email}
      />
      <TextField
        label="Phone (optional)"
        name="phone"
        type="tel"
        autoComplete="tel"
        error={state.fieldErrors.phone}
      />
      <SelectField
        label="Vehicle preference"
        name="vehiclePreference"
        placeholder="No preference"
        defaultValue={defaults.vehiclePreference ?? ""}
        options={vehicles.map((v) => ({ value: v.name, label: v.name }))}
      />
      <TextField
        label="Pick-up location"
        name="pickupLocation"
        placeholder="City or airport"
        required
        defaultValue={defaults.pickupLocation ?? ""}
        error={state.fieldErrors.pickupLocation}
      />
      <TextField
        label="Drop-off location"
        name="dropoffLocation"
        placeholder="Same as pick-up"
        defaultValue={defaults.dropoffLocation ?? ""}
        error={state.fieldErrors.dropoffLocation}
      />
      <TextField
        label="Pick-up date"
        name="pickupDate"
        type="date"
        defaultValue={defaults.pickupDate ?? ""}
        error={state.fieldErrors.pickupDate}
      />
      <TextField
        label="Drop-off date"
        name="dropoffDate"
        type="date"
        defaultValue={defaults.dropoffDate ?? ""}
        error={state.fieldErrors.dropoffDate}
      />
      <div className="sm:col-span-2">
        <TextAreaField
          label="Anything else? (optional)"
          name="message"
          placeholder="Flight time, child seats, a specific model…"
        />
      </div>

      {state.status === "error" && (
        <p id="quote-form-message" role="alert" className="text-sm font-medium text-danger sm:col-span-2">
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : "Request a Quote"}
        </Button>
      </div>
    </form>
  );
}
