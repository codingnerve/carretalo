"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { site, telHref } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-1.5 text-lg font-extrabold tracking-tight text-ink">
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand" aria-hidden="true">
        <path
          d="M12 2a8 8 0 0 1 8 8c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 0 1 8-8z"
          fill="currentColor"
        />
        <circle cx="12" cy="10" r="3.2" fill="#fff" />
      </svg>
      CarRental<span className="text-brand">O</span>
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const tel = telHref();

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
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled || menuOpen
          ? "border-line bg-surface/95 backdrop-blur"
          : "border-transparent bg-surface"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
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
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink hover:bg-mint"
            >
              {site.phoneDisplay || "Call us"}
            </a>
          )}
          <Button href="/contact#quote">Get a Quote</Button>
        </div>

        <button
          type="button"
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
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-surface md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-6">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-2xl px-4 py-3.5 text-lg font-semibold ${
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
