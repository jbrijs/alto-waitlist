# Alto Waitlist Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a lean waitlist landing page for Alto that collects a $100 deposit via Stripe Checkout, saves leads to Supabase, and sends a Resend email notification on each signup.

**Architecture:** Stripe Checkout Session flow — form collects name/email/business, server creates a Checkout Session with that metadata, user pays on Stripe-hosted page, Stripe webhook fires to save lead to Supabase and send notification email. Thank-you page shown on redirect back.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, shadcn (new-york), Stripe Node SDK, @supabase/supabase-js, Resend, Vitest + React Testing Library, pnpm

---

## Environment Setup

Before starting, create `src/.env.local` from this template (fill in real values):

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=you@youremail.com

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

> Note: `NEXT_PUBLIC_URL` must be your public URL (e.g. ngrok URL) when testing webhooks locally.

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via pnpm)

**Step 1: Install runtime dependencies**

```bash
cd /Users/joebrijs/alto/alto-waitlist
pnpm add stripe @supabase/supabase-js resend
```

Expected: packages install without errors.

**Step 2: Install test dependencies**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom
```

**Step 3: Add shadcn Input and Label components**

```bash
pnpm dlx shadcn@latest add input label
```

Expected: `src/components/ui/input.tsx` and `src/components/ui/label.tsx` created.

**Step 4: Add vitest config to `vitest.config.ts` (create this file)**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 5: Create test setup file**

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom";
```

**Step 6: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: install stripe, supabase, resend, vitest; add shadcn input/label"
```

---

## Task 2: Update globals.css with Alto design tokens

**Files:**
- Modify: `src/app/globals.css`

The current file has generic shadcn defaults. Replace it entirely with Alto's design tokens, which match the prototype.

**Step 1: Replace `src/app/globals.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

/* ─── Alto design tokens ──────────────────────────────────────── */
:root {
  --bg-base:       #f3f4f6;
  --bg-card:       #ffffff;
  --bg-surface:    #f9fafb;
  --border:        #e5e7eb;
  --border-subtle: #f1f5f9;

  --accent:        #0d9488;
  --accent-light:  rgba(13, 148, 136, 0.08);

  --text-primary:   #111827;
  --text-secondary: #4b5563;
  --text-muted:     #9ca3af;

  --font-sans: var(--font-jakarta);
  --font-mono: var(--font-geist-mono);

  --radius: 0.625rem;

  /* shadcn compatibility */
  --background:           var(--bg-base);
  --foreground:           var(--text-primary);
  --card:                 var(--bg-card);
  --card-foreground:      var(--text-primary);
  --popover:              var(--bg-card);
  --popover-foreground:   var(--text-primary);
  --primary:              var(--accent);
  --primary-foreground:   #ffffff;
  --secondary:            var(--bg-surface);
  --secondary-foreground: var(--text-primary);
  --muted:                var(--bg-surface);
  --muted-foreground:     var(--text-secondary);
  --accent-ui:            var(--accent-light);
  --accent-ui-foreground: var(--text-primary);
  --destructive:          oklch(0.577 0.245 27.325);
  --border-color:         var(--border);
  --input:                var(--bg-card);
  --ring:                 rgba(13, 148, 136, 0.3);
}

@theme inline {
  --color-background:         var(--background);
  --color-foreground:         var(--foreground);
  --font-sans:                var(--font-jakarta);
  --font-mono:                var(--font-geist-mono);
  --radius-sm:                calc(var(--radius) - 2px);
  --radius-md:                var(--radius);
  --radius-lg:                calc(var(--radius) + 2px);
  --radius-xl:                calc(var(--radius) + 6px);
  --color-card:               var(--card);
  --color-card-foreground:    var(--card-foreground);
  --color-popover:            var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary:            var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary:          var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted:              var(--muted);
  --color-muted-foreground:   var(--muted-foreground);
  --color-accent:             var(--accent-ui);
  --color-accent-foreground:  var(--accent-ui-foreground);
  --color-destructive:        var(--destructive);
  --color-border:             var(--border-color);
  --color-input:              var(--input);
  --color-ring:               var(--ring);
}

body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-jakarta), sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ─── White panel card ───────────────────────────────────────── */
.panel {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "style: replace globals.css with Alto design tokens"
```

---

## Task 3: Update layout.tsx with Alto fonts and metadata

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
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
        className={`${jakarta.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "style: update layout with Alto fonts and metadata"
```

---

## Task 4: Create lib singletons

**Files:**
- Create: `src/lib/stripe.ts`
- Create: `src/lib/supabase.ts`
- Create: `src/lib/resend.ts`

These are thin wrappers that initialize each client once.

**Step 1: Create `src/lib/stripe.ts`**

```ts
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
});
```

**Step 2: Create `src/lib/supabase.ts`**

```ts
import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
```

**Step 3: Create `src/lib/resend.ts`**

```ts
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
```

**Step 4: Commit**

```bash
git add src/lib/stripe.ts src/lib/supabase.ts src/lib/resend.ts
git commit -m "feat: add stripe, supabase, and resend lib singletons"
```

---

## Task 5: Create Supabase waitlist table

The `waitlist` table stores each successful signup with their Stripe session ID as a unique key (prevents duplicate inserts if the webhook fires more than once).

**Step 1: Run this SQL in Supabase**

Go to your Supabase project → SQL Editor and run:

```sql
create table waitlist (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text not null,
  business_name    text not null,
  stripe_session_id text unique not null,
  created_at       timestamptz default now()
);

-- Only the service role key can insert (no public access)
alter table waitlist enable row level security;
```

Alternatively, use the Supabase MCP tool (`apply_migration`) with the SQL above and project ID from `SUPABASE_URL`.

**Step 2: Verify the table exists**

In Supabase Table Editor, confirm `waitlist` appears with the correct columns.

---

## Task 6: Create `/api/checkout` route (TDD)

**Files:**
- Create: `src/app/api/checkout/route.ts`
- Create: `src/test/api/checkout.test.ts`

**Step 1: Write the failing test**

Create `src/test/api/checkout.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the stripe singleton before importing the route
vi.mock("@/lib/stripe", () => ({
  stripe: {
    checkout: {
      sessions: {
        create: vi.fn(),
      },
    },
  },
}));

import { stripe } from "@/lib/stripe";
import { POST } from "@/app/api/checkout/route";

describe("POST /api/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_URL = "http://localhost:3000";
  });

  it("returns 400 when required fields are missing", async () => {
    const req = new Request("http://localhost:3000/api/checkout", {
      method: "POST",
      body: JSON.stringify({ name: "", email: "", businessName: "" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it("creates a stripe checkout session and returns url", async () => {
    vi.mocked(stripe.checkout.sessions.create).mockResolvedValue({
      url: "https://checkout.stripe.com/test",
    } as any);

    const req = new Request("http://localhost:3000/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        name: "Jane Doe",
        email: "jane@example.com",
        businessName: "Sunrise Care",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toBe("https://checkout.stripe.com/test");
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: {
          name: "Jane Doe",
          email: "jane@example.com",
          businessName: "Sunrise Care",
        },
      }),
    );
  });
});
```

**Step 2: Run test — verify it fails**

```bash
pnpm test src/test/api/checkout.test.ts
```

Expected: FAIL — "Cannot find module '@/app/api/checkout/route'"

**Step 3: Create `src/app/api/checkout/route.ts`**

```ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { name, email, businessName } = await req.json();

  if (!name?.trim() || !email?.trim() || !businessName?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and business name are required." },
      { status: 400 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Alto Early Access — Refundable Deposit",
            description:
              "Secures your spot for Alto early access and preferred pricing. Fully refundable if Alto isn't a fit.",
          },
          unit_amount: 10000, // $100.00
        },
        quantity: 1,
      },
    ],
    customer_email: email,
    metadata: { name, email, businessName },
    success_url: `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
```

**Step 4: Run test — verify it passes**

```bash
pnpm test src/test/api/checkout.test.ts
```

Expected: PASS (2 tests)

**Step 5: Commit**

```bash
git add src/app/api/checkout/route.ts src/test/api/checkout.test.ts
git commit -m "feat: add checkout API route with tests"
```

---

## Task 7: Create `/api/webhooks/stripe` route (TDD)

**Files:**
- Create: `src/app/api/webhooks/stripe/route.ts`
- Create: `src/test/api/webhook.test.ts`

**Step 1: Write the failing test**

Create `src/test/api/webhook.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/stripe", () => ({
  stripe: {
    webhooks: {
      constructEvent: vi.fn(),
    },
  },
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    })),
  },
}));

vi.mock("@/lib/resend", () => ({
  resend: {
    emails: {
      send: vi.fn().mockResolvedValue({ id: "email-id" }),
    },
  },
}));

import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { POST } from "@/app/api/webhooks/stripe/route";

const makeRequest = (body: string, signature = "valid-sig") =>
  new Request("http://localhost:3000/api/webhooks/stripe", {
    method: "POST",
    headers: { "stripe-signature": signature },
    body,
  });

describe("POST /api/webhooks/stripe", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    process.env.NOTIFICATION_EMAIL = "admin@alto.com";
  });

  it("returns 400 when signature verification fails", async () => {
    vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
      throw new Error("Invalid signature");
    });

    const res = await POST(makeRequest("{}"));
    expect(res.status).toBe(400);
  });

  it("ignores unhandled event types and returns 200", async () => {
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue({
      type: "payment_intent.created",
      data: { object: {} },
    } as any);

    const res = await POST(makeRequest("{}"));
    expect(res.status).toBe(200);
  });

  it("inserts to supabase and sends email on checkout.session.completed", async () => {
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_123",
          metadata: {
            name: "Jane Doe",
            email: "jane@example.com",
            businessName: "Sunrise Care",
          },
        },
      },
    } as any);

    const insertMock = vi.fn().mockResolvedValue({ error: null });
    vi.mocked(supabase.from).mockReturnValue({ insert: insertMock } as any);

    const res = await POST(makeRequest("{}"));
    expect(res.status).toBe(200);

    expect(supabase.from).toHaveBeenCalledWith("waitlist");
    expect(insertMock).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@example.com",
      business_name: "Sunrise Care",
      stripe_session_id: "cs_test_123",
    });

    expect(resend.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "admin@alto.com",
        subject: expect.stringContaining("Jane Doe"),
      }),
    );
  });
});
```

**Step 2: Run test — verify it fails**

```bash
pnpm test src/test/api/webhook.test.ts
```

Expected: FAIL — "Cannot find module '@/app/api/webhooks/stripe/route'"

**Step 3: Create `src/app/api/webhooks/stripe/route.ts`**

```ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as {
      id: string;
      metadata: { name: string; email: string; businessName: string };
    };

    const { name, email, businessName } = session.metadata;

    await supabase.from("waitlist").insert({
      name,
      email,
      business_name: businessName,
      stripe_session_id: session.id,
    });

    await resend.emails.send({
      from: "Alto <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New Alto waitlist signup: ${name} — ${businessName}`,
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Stripe Session:</strong> ${session.id}</p>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
```

**Step 4: Run all tests — verify they pass**

```bash
pnpm test
```

Expected: PASS (5 tests total)

**Step 5: Commit**

```bash
git add src/app/api/webhooks/stripe/route.ts src/test/api/webhook.test.ts
git commit -m "feat: add stripe webhook handler with supabase insert and resend notification"
```

---

## Task 8: Create ValuePropCard component

**Files:**
- Create: `src/components/ValuePropCard.tsx`

No test needed — pure presentational component.

**Step 1: Create `src/components/ValuePropCard.tsx`**

```tsx
interface ValuePropCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ValuePropCard({ icon, title, description }: ValuePropCardProps) {
  return (
    <div className="panel p-6 flex flex-col gap-3">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(13, 148, 136, 0.08)" }}
      >
        <span style={{ color: "#0d9488" }}>{icon}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ValuePropCard.tsx
git commit -m "feat: add ValuePropCard component"
```

---

## Task 9: Create WaitlistForm component

**Files:**
- Create: `src/components/WaitlistForm.tsx`

This is a client component. It validates locally, posts to `/api/checkout`, then redirects to Stripe.

**Step 1: Create `src/components/WaitlistForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WaitlistForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.businessName.trim()) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong.");
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="bg-white border-gray-200 focus-visible:ring-teal-500/30"
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="jane@yourcompany.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="bg-white border-gray-200 focus-visible:ring-teal-500/30"
          disabled={loading}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="businessName"
          className="text-sm font-medium text-gray-700"
        >
          Business Name
        </Label>
        <Input
          id="businessName"
          type="text"
          placeholder="Sunrise Home Care"
          value={form.businessName}
          onChange={(e) =>
            setForm((f) => ({ ...f, businessName: e.target.value }))
          }
          className="bg-white border-gray-200 focus-visible:ring-teal-500/30"
          disabled={loading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 text-sm font-semibold rounded-lg text-white"
        style={{ background: loading ? "#5eada8" : "#0d9488" }}
      >
        {loading ? "Redirecting to checkout..." : "Reserve My Spot — $100 →"}
      </Button>

      <p className="text-center text-xs text-gray-400">
        $100 deposit is fully refundable if Alto isn&apos;t a fit.
      </p>
    </form>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/WaitlistForm.tsx
git commit -m "feat: add WaitlistForm client component"
```

---

## Task 10: Build the landing page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace `src/app/page.tsx`**

```tsx
import { Zap, DollarSign, Users } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ValuePropCard } from "@/components/ValuePropCard";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#f3f4f6" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 max-w-3xl mx-auto">
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
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400">
          Digital Marketing, Automated
        </p>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-24 flex flex-col gap-12">
        {/* Hero */}
        <div className="flex flex-col gap-5">
          <span
            className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(13, 148, 136, 0.08)",
              color: "#0d9488",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#0d9488" }}
            />
            Early Access — Limited Spots
          </span>

          <h1
            className="text-[2.75rem] font-bold leading-tight tracking-tight text-gray-900"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            Your AI marketing agency.{" "}
            <span style={{ color: "#0d9488" }}>On autopilot.</span>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
            Alto autonomously manages your SEO, AEO, and Google Business
            Profile — no agency, no manual work, at a fraction of the cost.
          </p>
        </div>

        {/* Value Props */}
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

        {/* Form Card */}
        <div className="panel relative overflow-hidden p-8">
          {/* Teal top accent */}
          <div
            className="absolute inset-x-0 top-0 h-[3px] rounded-t-[10px]"
            style={{ background: "#0d9488" }}
          />

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Reserve your spot
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Join the early access waitlist and lock in preferred pricing.
              </p>
            </div>

            <WaitlistForm />
          </div>
        </div>
      </main>
    </div>
  );
}
```

**Step 2: Run the dev server to visually verify**

```bash
pnpm dev
```

Open `http://localhost:3000`. Verify:
- Header with "alto." logo and teal dot
- Large bold headline with teal accent on "On autopilot."
- 3 value prop cards in a row
- White form card with teal top bar
- 3 labeled input fields
- Teal "Reserve My Spot — $100 →" button

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: build waitlist landing page"
```

---

## Task 11: Build the thank-you page

**Files:**
- Create: `src/app/thank-you/page.tsx`

**Step 1: Create `src/app/thank-you/page.tsx`**

```tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#f3f4f6" }}>
      <div className="panel max-w-md w-full p-10 flex flex-col items-center gap-6 text-center relative overflow-hidden">
        {/* Teal top accent */}
        <div
          className="absolute inset-x-0 top-0 h-[3px] rounded-t-[10px]"
          style={{ background: "#0d9488" }}
        />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(13, 148, 136, 0.08)" }}
        >
          <CheckCircle size={28} style={{ color: "#0d9488" }} />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900">
            You&apos;re on the list.
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your $100 deposit is confirmed. We&apos;ll be in touch soon with
            early access details and your preferred pricing.
          </p>
        </div>

        <div
          className="w-full rounded-lg px-4 py-3 text-sm text-left"
          style={{
            background: "rgba(13, 148, 136, 0.06)",
            border: "1px solid rgba(13, 148, 136, 0.15)",
          }}
        >
          <p className="font-semibold text-teal-700 mb-1">What happens next</p>
          <ul className="text-gray-600 space-y-1 text-[13px]">
            <li>→ You&apos;ll receive a confirmation email shortly</li>
            <li>→ We&apos;ll reach out to schedule your onboarding</li>
            <li>→ Your preferred pricing is locked in</li>
          </ul>
        </div>

        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Back to alto.
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Verify in browser**

Navigate to `http://localhost:3000/thank-you`. Verify:
- Teal checkmark icon
- "You're on the list." heading
- "What happens next" section
- Back link

**Step 3: Run all tests one final time**

```bash
pnpm test
```

Expected: PASS (5 tests)

**Step 4: Commit**

```bash
git add src/app/thank-you/page.tsx
git commit -m "feat: add thank-you confirmation page"
```

---

## Task 12: Configure Stripe webhook for local testing

**Step 1: Install Stripe CLI** (if not already installed)

```bash
brew install stripe/stripe-cli/stripe
stripe login
```

**Step 2: Forward webhooks to local server**

In a separate terminal:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret it prints (starts with `whsec_`) and update `STRIPE_WEBHOOK_SECRET` in `.env.local`.

**Step 3: Run a test checkout**

Fill out the form at `http://localhost:3000` and use Stripe's test card:
- Card: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: any 3 digits

Verify:
1. You land on `/thank-you`
2. Stripe CLI terminal shows `checkout.session.completed` event
3. Supabase `waitlist` table has a new row
4. You receive a notification email at `NOTIFICATION_EMAIL`

---

## Task 13: Final cleanup and push

**Step 1: Create `.env.local.example`**

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=you@youremail.com

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

Save as `.env.local.example` (not `.env.local` — never commit real secrets).

**Step 2: Verify `.env.local` is in `.gitignore`**

```bash
grep ".env.local" .gitignore
```

Expected: `.env.local` appears. If not, add it.

**Step 3: Final test run**

```bash
pnpm test && pnpm build
```

Expected: All tests pass, build succeeds.

**Step 4: Commit**

```bash
git add .env.local.example
git commit -m "chore: add env example file"
```
