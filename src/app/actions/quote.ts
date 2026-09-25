"use server";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<string, string>>;
};

const MAX_LEN = 2000;

function clean(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  // Strip control characters and clamp length; content is treated as
  // plain text everywhere downstream (never rendered as HTML).
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, MAX_LEN);
}

export async function submitQuote(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Honeypot: bots fill every field; humans never see this one.
  if (clean(formData.get("company"))) {
    return { status: "success", message: "Thanks — we received your enquiry.", fieldErrors: {} };
  }

  const lead = {
    fullName: clean(formData.get("fullName")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    pickupLocation: clean(formData.get("pickupLocation")),
    dropoffLocation: clean(formData.get("dropoffLocation")),
    pickupDate: clean(formData.get("pickupDate")),
    dropoffDate: clean(formData.get("dropoffDate")),
    vehiclePreference: clean(formData.get("vehiclePreference")),
    message: clean(formData.get("message")),
    source: clean(formData.get("source")) || "website",
    submittedAt: new Date().toISOString(),
  };

  const fieldErrors: Partial<Record<string, string>> = {};
  if (lead.fullName.length < 2) fieldErrors.fullName = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))
    fieldErrors.email = "Please enter a valid email address.";
  if (!lead.pickupLocation)
    fieldErrors.pickupLocation = "Where should the rental start?";
  if (lead.pickupDate && lead.dropoffDate && lead.dropoffDate < lead.pickupDate)
    fieldErrors.dropoffDate = "Drop-off can't be before pick-up.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      // No delivery channel configured yet — keep a server-side record
      // so leads are never silently lost during setup.
      console.log("[lead] LEAD_WEBHOOK_URL not set; lead logged:", JSON.stringify(lead));
    }
  } catch (err) {
    console.error("[lead] delivery failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please try again in a moment.",
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message:
      "Thanks — your enquiry is on its way. We'll get back to you shortly with options and a personal quote.",
    fieldErrors: {},
  };
}
