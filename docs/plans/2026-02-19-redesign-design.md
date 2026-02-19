# Alto Waitlist Redesign — Design Document
**Date:** 2026-02-19
**Status:** Approved

---

## Overview

Redesign the waitlist landing page for a more sophisticated, editorial feel. The hero section becomes full-bleed and full-viewport with a radial gradient bloom. Typography mixes DM Serif Display Italic (headline) with Plus Jakarta Sans (body) and Geist Mono (badges/labels). The form moves to a dedicated `/reserve` page that carries the same visual language as the landing page.

---

## Typography System

| Role | Font | Size | Style |
|------|------|------|-------|
| Hero headline | DM Serif Display | ~5.5rem | Italic, tight leading |
| Hero headline accent | DM Serif Display | ~5.5rem | Italic, teal (#0d9488) |
| Subheadline | Plus Jakarta Sans | 1.125rem | Regular, text-gray-500 |
| Badge/label | Geist Mono | 0.65rem | All-caps, tracked wide |
| Section heading | Plus Jakarta Sans | 1.5rem | Semibold |
| Body/card text | Plus Jakarta Sans | 0.9rem | Regular, text-gray-500 |
| /reserve card heading | DM Serif Display | ~1.75rem | Italic |

**New font to load:** `DM_Serif_Display` from `next/font/google`, italic style, bound to CSS variable `--font-serif`.

---

## Color & Background

**Hero gradient (full-bleed, edge to edge):**
```css
background: radial-gradient(
  ellipse 120% 80% at 50% -10%,
  #fdfcfb 0%,
  #f0faf8 45%,
  #f3f4f6 100%
);
```

**Below-fold / value props section:** `#f3f4f6` (unchanged)

**Accent:** `#0d9488` teal (unchanged)

---

## Page Structure

### `/` — Landing Page

**Header:** Transparent background, floats over hero gradient. Logo left (`alto.`), Geist Mono tagline right.

**Hero section (min-height: 100vh):**
- Content vertically centered in remaining space below header
- Max-width: `max-w-4xl` (wider than current `max-w-2xl`)
- Stacked vertically:
  1. Geist Mono badge: "EARLY ACCESS — LIMITED SPOTS" (teal pill)
  2. `h1` in DM Serif Display Italic (~5.5rem): "Your AI marketing agency. On autopilot." — "On autopilot." in teal
  3. Subhead in Plus Jakarta Sans: existing copy
  4. Teal CTA button: "Reserve My Spot →" — links to `/reserve`
  5. Fine print below button: "$100 refundable deposit" in tiny Geist Mono

**No form on this page.** Form card removed entirely.

**Below-fold section:**
- 3 `ValuePropCard` components (reused as-is)
- Subtle horizontal divider between hero and this section
- Background: `#f3f4f6`

---

### `/reserve` — Form Page

**Same header and radial gradient as landing page.** Full-screen centered layout.

**Centered form card (`.panel`, `max-w-sm`, teal top accent bar):**
- Small logo mark at top of card: "alto." in DM Serif Display
- Heading: "Secure your early access spot" (DM Serif Display Italic, ~1.75rem)
- Subtext: "One step away from preferred pricing and early access."
- `WaitlistForm` component (reused, no logic changes)
- Back link below card: "← Back" → `/`

---

## Files to Change

| File | Change |
|------|--------|
| `src/app/layout.tsx` | Add `DM_Serif_Display` font, expose `--font-serif` variable |
| `src/app/globals.css` | Add `--font-serif` to `@theme inline`, add `.font-serif` utility |
| `src/app/page.tsx` | Full hero redesign, remove form, add CTA button to `/reserve` |
| `src/app/reserve/page.tsx` | New page — continuation form page |

**No changes to:** `WaitlistForm`, `ValuePropCard`, API routes, Supabase, Resend.

---

## WaitlistForm routing update

`WaitlistForm` currently sets `window.location.href = url` on success — no change needed. The form on `/reserve` works identically to before. Stripe still redirects to `/thank-you`.
