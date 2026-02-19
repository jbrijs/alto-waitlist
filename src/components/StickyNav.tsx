"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StickyNav({ showCta = true, showHowItWorks = true }: { showCta?: boolean; showHowItWorks?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4 pointer-events-none">
      <nav
        className="pointer-events-auto relative flex items-center justify-between"
        style={{
          width: scrolled ? "min(900px, calc(100% - 48px))" : "100%",
          padding: scrolled ? "10px 22px" : "16px 8px",
          borderRadius: scrolled ? "9999px" : "0",
          background: scrolled ? "rgba(255, 255, 255, 0.62)" : "transparent",
          backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.75)" : "1px solid transparent",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)"
            : "none",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-0.5 hover:opacity-80 transition-opacity">
          <span
            className="text-xl font-bold tracking-tight text-gray-900"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            alto
          </span>
          <span className="text-xl font-bold" style={{ color: "#0d9488" }}>
            .
          </span>
        </Link>

        {/* Tagline — absolute center, fades out on scroll, hidden on mobile */}
        <p
          className="hidden sm:block absolute left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 whitespace-nowrap pointer-events-none"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            opacity: scrolled ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          Organic Marketing, Automated
        </p>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* How it works anchor — hidden on mobile */}
          {showHowItWorks && (
            <a
              href="#how-it-works"
              className="hidden sm:block text-xs font-medium whitespace-nowrap transition-colors hover:text-gray-900"
              style={{
                color: "#6b7280",
                fontFamily: "var(--font-geist-mono), monospace",
                letterSpacing: "0.04em",
              }}
            >
              How it works
            </a>
          )}

          {/* Reserve CTA */}
          {showCta && (
            <Button
              asChild
              size="sm"
              className="text-xs font-semibold rounded-full text-white h-8 px-4 whitespace-nowrap"
              style={{ background: "#0d9488" }}
            >
              <Link href="/reserve">Reserve →</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
