"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StickyNav() {
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
        className="pointer-events-auto flex items-center justify-between"
        style={{
          width: scrolled ? "min(900px, calc(100% - 48px))" : "100%",
          padding: scrolled ? "10px 22px" : "16px 8px",
          borderRadius: scrolled ? "9999px" : "0",
          background: scrolled ? "rgba(255, 255, 255, 0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.6)" : "1px solid transparent",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)"
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

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Tagline — fades out on scroll */}
          <p
            className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 whitespace-nowrap overflow-hidden"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              opacity: scrolled ? 0 : 1,
              maxWidth: scrolled ? "0px" : "220px",
              transition: "opacity 0.3s ease, max-width 0.4s ease",
              pointerEvents: "none",
            }}
          >
            Digital Marketing, Automated
          </p>

          {/* How it works anchor */}
          <a
            href="#how-it-works"
            className="text-xs font-medium whitespace-nowrap transition-colors hover:text-gray-900"
            style={{
              color: "#6b7280",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.04em",
            }}
          >
            How it works
          </a>

          {/* Reserve CTA */}
          <Button
            asChild
            size="sm"
            className="text-xs font-semibold rounded-full text-white h-8 px-4 whitespace-nowrap"
            style={{ background: "#0d9488" }}
          >
            <Link href="/reserve">Reserve →</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
