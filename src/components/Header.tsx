"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { site, telHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

function Wordmark() {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="CarRentalO Home">
      <Image
        src="/images/logo.png"
        alt="CarRentalO"
        width={160}
        height={54}
        className="h-9 w-auto object-contain sm:h-11"
        priority
      />
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const tel = telHref();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjustment during render,
  // per react.dev "you might not need an effect") and lock scroll while open.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  // Focus trap: move focus into the menu on open, wrap Tab at the ends,
  // close on Escape, and restore focus to the toggle on close.
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const focusables = () =>
      menu
        ? Array.from(
            menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
          )
        : [];
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggle, ...focusables()].filter(
        (el): el is HTMLElement => el != null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled || menuOpen
          ? "border-line bg-surface/95 backdrop-blur"
          : "border-line/70 bg-surface"
      }`}
    >
      {/* Upside Topbar: Tagline, Email, Phone */}
      <div className="border-b border-line/80 bg-[#f8fafc] text-ink-soft">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-1 px-3 py-2 sm:flex-row sm:gap-4 sm:px-6 sm:py-2.5">
          <p className="text-center text-xs font-semibold tracking-tight text-ink sm:text-left sm:text-[13px]">
            {site.topbarTagline}
          </p>
          <div className="flex shrink-0 items-center gap-3 text-xs sm:text-[13px]">
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-ink-soft transition-colors hover:text-brand"
              >
                {site.email}
              </a>
            )}
            {site.email && (site.phoneDisplay || tel) && (
              <span className="select-none text-slate-300" aria-hidden="true">
                |
              </span>
            )}
            {(site.phoneDisplay || tel) && (
              <a
                href={tel || `tel:${site.phone}`}
                onClick={() => trackEvent("call_clicked", { placement: "topbar" })}
                className="inline-flex items-center gap-1.5 rounded-md bg-mint/50 px-2 py-0.5 font-extrabold text-brand-strong transition-colors hover:bg-mint hover:text-brand"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 shrink-0 text-brand"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{site.phoneDisplay || site.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-3 sm:px-4">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-mint hover:text-brand-strong ${
                pathname === link.href ? "bg-mint text-brand-strong" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {tel && (
            <a
              href={tel}
              onClick={() => trackEvent("call_clicked", { placement: "header" })}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-3 py-2 text-sm font-semibold text-ink shadow-xs transition-colors hover:border-brand/40 hover:bg-mint"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-brand"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{site.phoneDisplay || "Call us"}</span>
            </a>
          )}
          <Button href="/contact#quote">Get a Quote</Button>
        </div>

        <button
          type="button"
          ref={toggleRef}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-mint md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-line bg-surface shadow-xl md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-3 py-6">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-2xl px-3 py-3.5 text-lg font-semibold ${
                  pathname === link.href ? "bg-mint text-brand-strong" : "text-ink hover:bg-mint"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
              {tel && (
                <Button
                  href={tel}
                  variant="secondary"
                  size="lg"
                  onClick={() => trackEvent("call_clicked", { placement: "mobile_menu" })}
                >
                  Call {site.phoneDisplay || "us"}
                </Button>
              )}
              <Button href="/contact#quote" size="lg" onClick={() => setMenuOpen(false)}>
                Get a Quote
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
