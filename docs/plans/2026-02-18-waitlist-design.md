# Alto Waitlist — Design Document
**Date:** 2026-02-18
**Status:** Approved

---

## Overview

A lean, single-page waitlist landing page for Alto — an AI-native digital marketing agency. Collects a $100 refundable deposit via Stripe Checkout to capture high-intent early adopters. Saves leads to Supabase and sends an email notification via Resend on each successful signup.

---

## Page Structure

**Single page, no navigation.** Centered layout, max-width ~680px.

### Sections (top to bottom)
1. **Header** — "alto." logo (lowercase + teal dot), tagline "Digital Marketing, Automated"
2. **Hero** — Large bold headline, punchy subheadline, early access badge (teal pill)
3. **Value Props** — 3 cards in a row (desktop) / stacked (mobile)
4. **Waitlist Form Card** — Name, Email, Business Name fields + CTA button
5. **Thank-you page** — `/thank-you` route, simple confirmation

### Routes
- `/` — landing page
- `/thank-you` — post-payment confirmation (Stripe redirects here)
- `/api/checkout` — POST: creates Stripe Checkout Session
- `/api/webhooks/stripe` — POST: handles `checkout.session.completed`

---

## Visual Design

Mirrors alto-prototype design language exactly:

| Token | Value |
|-------|-------|
| Background | `#f3f4f6` |
| Card/form bg | `#ffffff` |
| Border | `1px solid #e5e7eb` |
| Accent | `#0d9488` (teal) |
| Text primary | `#111827` |
| Text secondary | `#4b5563` |
| Text muted | `#9ca3af` |
| Font | Plus Jakarta Sans |
| Border radius | 10px |

Key design details:
- Teal 3px top accent bar on the form card (matches KPICard pattern)
- CTA button: teal background, white text
- Logo: lowercase "alto" + teal dot
- Value prop cards: white panels with subtle shadow

---

## Architecture

### File Structure
```
src/
  app/
    page.tsx                       ← landing page
    thank-you/page.tsx             ← confirmation page
    api/
      checkout/route.ts            ← create Stripe Checkout Session
      webhooks/stripe/route.ts     ← handle Stripe webhook events
    globals.css                    ← design tokens (from prototype)
    layout.tsx                     ← fonts + metadata
  components/
    WaitlistForm.tsx               ← form with client-side validation
    ValuePropCard.tsx              ← reusable value prop card
  lib/
    stripe.ts                      ← Stripe client singleton
    supabase.ts                    ← Supabase client singleton
    resend.ts                      ← Resend client singleton
```

### Data Flow
1. User fills name/email/business name → clicks "Reserve My Spot — $100"
2. `POST /api/checkout` creates Stripe Checkout Session with metadata attached; returns `url`
3. Client redirects to Stripe-hosted checkout
4. Stripe redirects to `/thank-you?session_id=...` on success
5. Stripe fires `checkout.session.completed` webhook to `/api/webhooks/stripe`
6. Webhook: reads metadata → inserts into Supabase `waitlist` table → sends Resend notification email

### Supabase Table: `waitlist`
```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business_name text not null,
  stripe_session_id text unique not null,
  created_at timestamptz default now()
);
```

### Environment Variables
```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
NOTIFICATION_EMAIL
NEXT_PUBLIC_URL                    ← base URL for Stripe success/cancel redirects
```

---

## Copy

**Headline:** "Your AI marketing agency. On autopilot."
**Subheadline:** "Alto autonomously manages your SEO, AEO, and Google Business Profile — no agency, no manual work, at a fraction of the cost."
**Badge:** "Early Access — Limited Spots"
**CTA:** "Reserve My Spot — $100 →"
**Fine print:** "$100 deposit is fully refundable if Alto isn't a fit."

**Value Props:**
- "Autonomous execution" — Continuously optimizes your SEO, AEO, and Google Business Profile — no manual work required.
- "Fraction of the cost" — Agencies charge $3k–$10k/month. Alto starts at $500.
- "Built for founders" — No dashboards to manage. No agency to babysit. Just results.

---

## Dependencies to Install
- `stripe` — Stripe Node SDK
- `@supabase/supabase-js` — Supabase client
- `resend` — Resend email SDK
- shadcn components: `input`, `label` (button already present)
