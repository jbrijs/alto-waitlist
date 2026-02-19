# Alto Waitlist Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the waitlist landing page with a full-bleed editorial hero (DM Serif Display, radial gradient), and move the signup form to a dedicated `/reserve` page.

**Architecture:** Pure UI changes — no API routes, no data layer changes. Add `DM_Serif_Display` font to the Next.js font system, update `globals.css` with the serif token, rewrite `page.tsx` for the new hero layout, and create `src/app/reserve/page.tsx` that reuses `WaitlistForm` unchanged.

**Tech Stack:** Next.js 16 App Router, Plus Jakarta Sans (existing), DM Serif Display (new), Geist Mono (existing), Tailwind v4, shadcn

---

## Task 1: Add DM Serif Display font

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Update `src/app/layout.tsx`**

Add `DM_Serif_Display` import and variable alongside the existing fonts. The full file should be:

```tsx
import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Alto — Early Access",
  description:
    "Alto is an AI-native digital marketing agency that autonomously manages your SEO, AEO, and online presence. Join the waitlist.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${geistMono.variable} ${dmSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Add `--font-serif` to `src/app/globals.css`**

In the `@theme inline` block, add one line after `--font-mono`:

```css
  --font-serif:               var(--font-serif);
```

So the block reads:
```css
@theme inline {
  --color-background:         var(--background);
  --color-foreground:         var(--foreground);
  --font-sans:                var(--font-jakarta);
  --font-mono:                var(--font-geist-mono);
  --font-serif:               var(--font-serif);
  /* ... rest unchanged */
}
```

**Step 3: Verify TypeScript compiles**

```bash
cd /Users/joebrijs/alto/alto-waitlist && npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors.

**Step 4: Commit**

```bash
cd /Users/joebrijs/alto/alto-waitlist && git add src/app/layout.tsx src/app/globals.css && git commit -m "feat: add DM Serif Display font variable"
```

---

## Task 2: Redesign the landing page (`/`)

**Files:**
- Modify: `src/app/page.tsx`

This is a full rewrite of the page. The form card is removed entirely. A teal CTA button links to `/reserve`.

**Step 1: Replace `src/app/page.tsx` with the full redesign**

```tsx
import Link from "next/link";
import { Zap, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValuePropCard } from "@/components/ValuePropCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Full-bleed hero with radial gradient */}
      <div
        className="relative min-h-screen flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -10%, #fdfcfb 0%, #f0faf8 45%, #f3f4f6 100%)",
        }}
      >
        {/* Floating header */}
        <header className="flex items-center justify-between px-8 py-6 w-full">
          <div className="flex items-baseline gap-0.5">
            <span
              className="text-xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
            >
              alto
            </span>
            <span className="text-xl font-bold" style={{ color: "#0d9488" }}>
              .
            </span>
          </div>
          <p
            className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Digital Marketing, Automated
          </p>
        </header>

        {/* Hero content — vertically centered in remaining space */}
        <div className="flex-1 flex items-center justify-center px-8 pb-20">
          <div className="max-w-4xl w-full flex flex-col gap-7">
            {/* Badge */}
            <span
              className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: "rgba(13, 148, 136, 0.08)",
                color: "#0d9488",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#0d9488" }}
              />
              Early Access — Limited Spots
            </span>

            {/* Headline */}
            <h1
              className="text-[3.75rem] sm:text-[5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight text-gray-900"
              style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic" }}
            >
              Your AI marketing agency.{" "}
              <span style={{ color: "#0d9488" }}>On autopilot.</span>
            </h1>

            {/* Subhead */}
            <p
              className="text-lg text-gray-500 leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
            >
              Alto autonomously manages your SEO, AEO, and Google Business
              Profile — no agency, no manual work, at a fraction of the cost.
            </p>

            {/* CTA */}
            <div className="flex flex-col gap-2 self-start">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-sm font-semibold rounded-lg text-white"
                style={{ background: "#0d9488" }}
              >
                <Link href="/reserve">Reserve My Spot →</Link>
              </Button>
              <p
                className="text-xs text-gray-400 px-1"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                $100 refundable deposit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Value props below the fold */}
      <div style={{ background: "#f3f4f6" }}>
        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, #e5e7eb, transparent)" }}
        />
        <div className="max-w-3xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ValuePropCard
              icon={<Zap size={16} />}
              title="Autonomous execution"
              description="Continuously optimizes your SEO, AEO, and Google Business Profile — no manual work required."
            />
            <ValuePropCard
              icon={<DollarSign size={16} />}
              title="Fraction of the cost"
              description="Agencies charge $3k–$10k/month. Alto starts at $500."
            />
            <ValuePropCard
              icon={<Users size={16} />}
              title="Built for founders"
              description="No dashboards to manage. No agency to babysit. Just results."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Run dev server and visually verify**

```bash
cd /Users/joebrijs/alto/alto-waitlist && pnpm dev
```

Open `http://localhost:3000`. Verify:
- Full-viewport hero with radial gradient (warm cream center → faint teal mist → gray)
- DM Serif Display italic headline at ~5.5rem
- "On autopilot." in teal
- Badge in Geist Mono caps
- "Reserve My Spot →" teal button
- "$100 refundable deposit" in small mono text
- 3 value prop cards visible when scrolling down

**Step 3: Commit**

```bash
cd /Users/joebrijs/alto/alto-waitlist && git add src/app/page.tsx && git commit -m "feat: redesign landing page with editorial serif hero"
```

---

## Task 3: Create the `/reserve` form page

**Files:**
- Create: `src/app/reserve/page.tsx`

**Step 1: Create `src/app/reserve/page.tsx`**

```tsx
import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function ReservePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% -10%, #fdfcfb 0%, #f0faf8 45%, #f3f4f6 100%)",
      }}
    >
      {/* Floating header */}
      <header className="flex items-center justify-between px-8 py-6 w-full">
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
        <p
          className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          Digital Marketing, Automated
        </p>
      </header>

      {/* Centered form card */}
      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="panel relative overflow-hidden p-8 w-full max-w-sm">
          {/* Teal top accent */}
          <div
            className="absolute inset-x-0 top-0 h-[3px] rounded-t-[10px]"
            style={{ background: "#0d9488" }}
          />

          <div className="flex flex-col gap-6">
            {/* Card header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-0.5">
                <span
                  className="text-sm font-bold tracking-tight text-gray-900"
                  style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
                >
                  alto
                </span>
                <span className="text-sm font-bold" style={{ color: "#0d9488" }}>
                  .
                </span>
              </div>
              <h1
                className="text-[1.75rem] leading-tight text-gray-900"
                style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic" }}
              >
                Secure your early access spot.
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                One step away from preferred pricing and early access.
              </p>
            </div>

            <WaitlistForm />
          </div>
        </div>

        {/* Back link below card */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Visually verify `/reserve`**

Navigate to `http://localhost:3000/reserve`. Verify:
- Same gradient background as landing page
- Same floating header (logo links back to `/`)
- Centered panel card with teal top accent
- Small "alto." logo mark in card header
- DM Serif Display italic heading "Secure your early access spot."
- All 3 form fields, teal submit button, fine print
- "← Back" link at bottom

**Step 3: Run all tests to confirm nothing broke**

```bash
cd /Users/joebrijs/alto/alto-waitlist && pnpm test 2>&1 | tail -10
```

Expected: 5 tests passing.

**Step 4: Commit**

```bash
cd /Users/joebrijs/alto/alto-waitlist && git add src/app/reserve/page.tsx && git commit -m "feat: add /reserve form page with continuation aesthetic"
```

---

## Task 4: Final build check

**Step 1: Run TypeScript check**

```bash
cd /Users/joebrijs/alto/alto-waitlist && npx tsc --noEmit 2>&1 | head -20
```

Expected: No TypeScript errors.

**Step 2: Run build**

```bash
cd /Users/joebrijs/alto/alto-waitlist && pnpm build 2>&1 | tail -20
```

Expected: Build succeeds or fails only on missing env vars (runtime), not on TypeScript/JSX errors.

**Step 3: Run all tests one final time**

```bash
cd /Users/joebrijs/alto/alto-waitlist && pnpm test
```

Expected: 5 tests passing.
