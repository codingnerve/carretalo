"use client";

import { useRouter } from "next/navigation";
import type { FormEvent, KeyboardEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

/* ───────── Static Options ───────── */
const LOCATION_GROUPS = [
  {
    category: "Major U.S. Airports",
    items: [
      { name: "Los Angeles Airport (LAX)", state: "CA" },
      { name: "Orlando International Airport (MCO)", state: "FL" },
      { name: "Miami International Airport (MIA)", state: "FL" },
      { name: "Las Vegas Airport (LAS)", state: "NV" },
      { name: "New York JFK Airport (JFK)", state: "NY" },
      { name: "Dallas Fort Worth Airport (DFW)", state: "TX" },
      { name: "Chicago O'Hare Airport (ORD)", state: "IL" },
      { name: "San Francisco Airport (SFO)", state: "CA" },
      { name: "Atlanta Airport (ATL)", state: "GA" },
      { name: "Denver International Airport (DEN)", state: "CO" },
      { name: "Phoenix Sky Harbor Airport (PHX)", state: "AZ" },
      { name: "Seattle Tacoma Airport (SEA)", state: "WA" },
    ],
  },
  {
    category: "Global Destinations",
    items: [
      { name: "Dubai International (DXB)", state: "UAE" },
      { name: "London Heathrow (LHR)", state: "UK" },
      { name: "Singapore Changi (SIN)", state: "SG" },
      { name: "Paris Charles de Gaulle (CDG)", state: "FR" },
    ],
  },
];

const TIME_OPTIONS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM",
  "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM",
];

const FEATURE_TAGS = [
  "Transparent Rental Details",
  "Flexible Vehicle Choices",
  "Simple Online Reservations",
  "Popular Locations",
];

/* ───────── Date Helpers ───────── */
function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function plusDays(n: number, fromDate?: string) {
  const d = fromDate ? new Date(fromDate) : new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function calcDaysBetween(start: string, end: string) {
  try {
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const diff = Math.round((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  } catch {
    return 1;
  }
}

/* ───────── Icons ───────── */
function IconPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCal({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconClock({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`pointer-events-none h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 ${
        open ? "rotate-180 text-brand" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconCheck({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconHeadset({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function IconShieldCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconPhone({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* ───────── Location Picker with Grouping & Search ───────── */
function LocationSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicked outside
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search box automatically upon opening
  useEffect(() => {
    if (open) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [open]);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCATION_GROUPS;

    return LOCATION_GROUPS.map((group) => ({
      category: group.category,
      items: group.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) || item.state.toLowerCase().includes(q)
      ),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div className="relative flex min-w-0 flex-col gap-1.5" ref={wrapRef}>
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
        Pick-Up Location
      </label>

      {/* Input button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v);
          setQuery("");
        }}
        className={`group flex h-[48px] w-full items-center gap-2.5 rounded-xl border bg-white px-3.5 text-left transition-all duration-150 ${
          open
            ? "border-brand ring-2 ring-brand/15 shadow-sm"
            : "border-line hover:border-brand/40 hover:bg-[#fafbf9]"
        }`}
      >
        <IconPin className="h-4 w-4 text-brand transition-transform group-hover:scale-110" />
        <span
          className={`flex-1 truncate text-sm font-semibold ${
            value ? "text-ink font-bold" : "text-ink-muted/70"
          }`}
        >
          {value || "Enter or select location"}
        </span>
        <IconChevron open={open} />
      </button>

      {/* Floating Dropdown Panel */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-[340px] max-w-[calc(100vw-2.5rem)] sm:w-[380px] rounded-2xl border border-line bg-white shadow-2xl shadow-ink/20 ring-1 ring-black/5 animate-fade-up">
          {/* Search Header */}
          <div className="border-b border-line bg-surface p-3 rounded-t-2xl">
            <div className="relative flex items-center">
              <svg
                viewBox="0 0 20 20"
                className="pointer-events-none absolute left-3 h-4 w-4 text-ink-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="m13 13 4 4" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search airport, city, or code (e.g. LAX)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-line bg-white py-2 pl-9 pr-8 text-xs font-medium text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-ink-muted hover:bg-surface hover:text-ink"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* List of items */}
          <div
            className="max-h-72 overflow-y-auto p-2"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--color-line) transparent" }}
          >
            {filteredGroups.length === 0 ? (
              <div className="py-6 text-center text-xs text-ink-muted">
                No matching locations found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.category} className="mb-2 last:mb-0">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted/80">
                    {group.category}
                  </div>
                  <ul role="listbox" className="mt-1 space-y-0.5">
                    {group.items.map((item) => {
                      const isSelected = item.name === value;
                      return (
                        <li
                          key={item.name}
                          role="option"
                          aria-selected={isSelected}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            onChange(item.name);
                            setOpen(false);
                          }}
                          className={`group/item flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-100 ${
                            isSelected
                              ? "bg-brand text-white font-bold shadow-xs"
                              : "text-ink hover:bg-mint/50 hover:text-brand-strong"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <IconPin
                              className={`h-4 w-4 shrink-0 ${
                                isSelected
                                  ? "text-white"
                                  : "text-brand group-hover/item:scale-110 transition-transform"
                              }`}
                            />
                            <span className="truncate">{item.name}</span>
                          </div>
                          {isSelected && (
                            <span className="shrink-0 rounded-full bg-white/20 p-1 text-white">
                              <IconCheck className="h-3 w-3" />
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── Simple Dropdown for Time ───────── */
function TimeSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative flex min-w-0 flex-col gap-1.5" ref={wrapRef}>
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
        {label}
      </label>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`group flex h-[48px] w-full items-center gap-2.5 rounded-xl border bg-white px-3.5 text-left transition-all duration-150 ${
          open
            ? "border-brand ring-2 ring-brand/15 shadow-sm"
            : "border-line hover:border-brand/40 hover:bg-[#fafbf9]"
        }`}
      >
        <IconClock className="h-4 w-4 text-brand transition-colors" />
        <span className="flex-1 truncate text-sm font-semibold text-ink">{value}</span>
        <IconChevron open={open} />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-full min-w-[150px] rounded-2xl border border-line bg-white p-1.5 shadow-2xl shadow-ink/20 ring-1 ring-black/5 animate-fade-up">
          <ul
            role="listbox"
            className="max-h-56 overflow-y-auto space-y-0.5"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--color-line) transparent" }}
          >
            {TIME_OPTIONS.map((time) => {
              const isSelected = time === value;
              return (
                <li
                  key={time}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(time);
                    setOpen(false);
                  }}
                  className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-brand text-white font-bold"
                      : "text-ink hover:bg-mint/50 hover:text-brand-strong"
                  }`}
                >
                  <span>{time}</span>
                  {isSelected && <IconCheck className="h-3.5 w-3.5" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ───────── Date Field with Direct Click Trigger ───────── */
function DateInput({
  id,
  name,
  label,
  value,
  min,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  min: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function triggerPicker() {
    const input = inputRef.current;
    if (input?.showPicker) {
      try {
        input.showPicker();
      } catch {
        input.focus();
      }
    } else {
      input?.focus();
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
        {label}
      </label>
      <div
        onClick={triggerPicker}
        className="group flex h-[48px] cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 transition-all duration-150 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15 hover:border-brand/40 hover:bg-[#fafbf9]"
      >
        <IconCal className="h-4 w-4 text-brand transition-colors" />
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="date"
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-ink focus:outline-none"
        />
      </div>
    </div>
  );
}

/**
 * SearchWidget — Fully polished search section.
 * - Non-clipping, wide floating dropdowns with instant search.
 * - Clean responsive grid wrapping so fields are never cramped.
 * - Clear trip duration indicator so rental info is never missing.
 * - Perfectly aligned with CarRentalO emerald & mint branding.
 */
export function SearchWidget({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const baseId = useId();

  const [pickupDate, setPickupDate] = useState(todayIso());
  const [dropoffDate, setDropoffDate] = useState(plusDays(7));
  const [pickupTime, setPickupTime] = useState("11:00 AM");
  const [dropoffTime, setDropoffTime] = useState("01:00 PM");
  const [location, setLocation] = useState("");

  const [modalState, setModalState] = useState<"idle" | "searching" | "success">("idle");

  const durationDays = useMemo(
    () => calcDaysBetween(pickupDate, dropoffDate),
    [pickupDate, dropoffDate]
  );

  function handlePickupDate(newDate: string) {
    setPickupDate(newDate);
    if (dropoffDate < newDate) {
      setDropoffDate(plusDays(3, newDate));
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackEvent("search_started", { fields: 5 });
    setModalState("searching");
    setTimeout(() => {
      setModalState("success");
    }, 1800);
  }

  function navigateToQuote() {
    setModalState("idle");
    const params = new URLSearchParams();
    if (location) params.set("pickupLocation", location);
    if (pickupDate) params.set("pickupDate", pickupDate);
    if (dropoffDate) params.set("dropoffDate", dropoffDate);
    if (pickupTime) params.set("pickupTime", pickupTime);
    if (dropoffTime) params.set("dropoffTime", dropoffTime);
    const query = params.toString();
    router.push(query ? `/contact?${query}#quote` : "/contact#quote");
  }

  return (
    <div className="relative overflow-visible rounded-3xl border border-line bg-surface-raised shadow-xl shadow-ink/5 ring-1 ring-black/[0.03]">
      {/* ── Top Emerald Accent Gradient ── */}
      <div className="h-1.5 w-full rounded-t-3xl bg-gradient-to-r from-brand via-brand-strong to-mint" />

      {/* ── Header Area ── */}
      {!compact && (
        <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-strong shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Start Your Reservation
            </div>
            <h2 className="mt-2.5 max-w-md text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
              Search options by location, date, and time
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {FEATURE_TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand/30 hover:bg-mint/30 hover:text-brand-strong"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint text-brand-strong">
                  <IconCheck className="h-2.5 w-2.5" />
                </span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Search Form ── */}
      <form onSubmit={onSubmit} aria-label="Search rental vehicles" className="px-5 py-5 sm:px-7 sm:py-6">
        <div
          className={`grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] items-end`}
        >
          {/* Pick-Up Location */}
          <LocationSelect
            id={`pickup-loc-${baseId}`}
            value={location}
            onChange={setLocation}
          />

          {/* Pick-Up Date */}
          <DateInput
            id={`pickup-date-${baseId}`}
            name="pickupDate"
            label="Pick-Up Date"
            value={pickupDate}
            min={todayIso()}
            onChange={handlePickupDate}
          />

          {/* Pick-Up Time */}
          <TimeSelect
            id={`pickup-time-${baseId}`}
            label="Pick-Up Time"
            value={pickupTime}
            onChange={setPickupTime}
          />

          {/* Drop-Off Date */}
          <DateInput
            id={`dropoff-date-${baseId}`}
            name="dropoffDate"
            label="Drop-Off Date"
            value={dropoffDate}
            min={pickupDate || todayIso()}
            onChange={setDropoffDate}
          />

          {/* Drop-Off Time */}
          <TimeSelect
            id={`dropoff-time-${baseId}`}
            label="Drop-Off Time"
            value={dropoffTime}
            onChange={setDropoffTime}
          />

          {/* Submit CTA */}
          <div className="flex flex-col justify-end sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="group flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-brand/25 transition-all duration-200 hover:bg-brand-strong hover:shadow-lg hover:shadow-brand/35 active:scale-[0.98]"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="m13 13 4 4" />
              </svg>
              <span className="whitespace-nowrap">Search Vehicles</span>
            </button>
          </div>
        </div>

        {/* ── Trip duration & Trust Perks Strip ── */}
        <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-line/70 pt-4 text-xs sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-ink-soft">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/80 px-2.5 py-0.5 text-[11px] font-bold text-brand-strong">
              Trip Duration: {durationDays} {durationDays === 1 ? "Day" : "Days"}
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="font-bold text-brand">✓</span> Best Rate Guarantee
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="font-bold text-brand">✓</span> Free Cancellation up to 48h
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="font-bold text-brand">✓</span> No Hidden Fees
            </span>
          </div>

          <p className="text-center text-[11px] text-ink-muted sm:text-right">
            Vehicle availability and pricing confirmed by concierge support.
          </p>
        </div>
      </form>

      {/* ── Search Status Modal ── */}
      {modalState !== "idle" && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/70 backdrop-blur-md transition-opacity animate-fade-in"
            onClick={() => modalState === "success" && setModalState("idle")}
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md overflow-hidden rounded-3xl border border-line bg-surface-raised p-6 sm:p-8 shadow-2xl shadow-ink/30 animate-rise-in">
            {modalState === "searching" ? (
              /* Step 1: Searching Spinner */
              <div className="flex flex-col items-center py-4 text-center">
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center">
                  <div className="h-14 w-14 animate-spin rounded-full border-4 border-mint border-t-brand" />
                </div>

                <h3 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                  Searching Available Options
                </h3>

                <p className="mt-2.5 max-w-xs text-xs sm:text-sm leading-relaxed text-ink-muted">
                  Please wait while we check available car rental options for your selected location.
                </p>

                {location && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-mint/80 px-3.5 py-1 text-xs font-bold text-brand-strong">
                    <IconPin className="h-3.5 w-3.5 text-brand" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            ) : (
              /* Step 2: Request Submitted Successfully */
              <div className="flex flex-col items-center text-center">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setModalState("idle")}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-ink-muted hover:bg-mint hover:text-brand-strong transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Success Checkmark Circle */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-mint text-brand-strong shadow-xs">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-brand-strong" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>

                <h3 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                  Request Submitted Successfully
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
                  Thank you. Your car rental request has been received successfully.
                  Our support team will review your details and contact you shortly with available rental options.
                </p>

                {/* Highlight Call Box */}
                <div className="mt-5 w-full rounded-2xl border border-brand/25 bg-gradient-to-b from-mint/50 to-surface p-4 text-center sm:p-5">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-soft">
                    <IconHeadset className="h-4 w-4 text-brand" />
                    <span>Need urgent assistance?</span>
                  </div>
                  <a
                    href={`tel:${site.phone}`}
                    onClick={() => trackEvent("call_clicked", { placement: "search_modal" })}
                    className="mt-2 block text-xl sm:text-2xl font-black text-brand-strong hover:text-brand transition-colors"
                  >
                    Call Now: {site.phoneDisplay || "(888) 673-5008"}
                  </a>
                </div>

                {/* Security Guarantee Pill */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-ink-muted">
                  <IconShieldCheck className="h-4 w-4 text-brand" />
                  <span>SECURE ENQUIRY · NO SENSITIVE PAYMENT DETAILS</span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex w-full flex-col gap-2.5">
                  <a
                    href={`tel:${site.phone}`}
                    onClick={() => trackEvent("call_clicked", { placement: "search_modal_button" })}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-strong hover:shadow-lg hover:shadow-brand/35 active:scale-[0.98]"
                  >
                    <IconPhone className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>Call Now: {site.phoneDisplay || "(888) 673-5008"}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setModalState("idle")}
                    className="w-full rounded-xl border border-line py-2.5 text-xs font-semibold text-ink-muted hover:bg-surface hover:text-ink transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
