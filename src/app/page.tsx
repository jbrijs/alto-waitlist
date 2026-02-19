import { CheckoutButton } from "@/components/checkout-button";
import {
  Bot,
  BarChart3,
  Globe,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="text-base font-semibold tracking-tight">Alto</span>
          <CheckoutButton
            size="sm"
            label="Get Early Access"
            className="bg-foreground text-background hover:bg-foreground/90"
          />
        </div>
      </header>

      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-36 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-green-500" />
            Early access now open · Limited spots
          </div>

          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Your AI marketing agency,{" "}
            <span className="text-muted-foreground">always on.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
            Alto autonomously manages your entire online presence — SEO, AEO,
            Google Business Profile, and content — delivering measurable lead
            growth without agencies, manual effort, or guesswork.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <CheckoutButton className="h-12 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full" />
            <p className="text-xs text-muted-foreground">
              $100 deposit · Applied to your first month · Refundable if Alto
              isn't right for you
            </p>
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              The problem
            </p>
            <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Growing online shouldn't require a full marketing team.
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {problems.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-border p-6"
                >
                  <p className="mb-2 font-semibold">{p.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Solution ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            The solution
          </p>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
            <div>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Alto replaces your agency — and outperforms it.
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Alto is an AI-native autonomous digital marketing service. It
                doesn't give you a dashboard and leave you to manage it. It
                acts — continuously monitoring, optimizing, and executing so
                your business stays visible and competitive.
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {capabilities.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <c.icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{c.label}</p>
                    <p className="text-sm text-muted-foreground">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How it works ────────────────────────────────────────────── */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              How it works
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.title} className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground">
                      {i + 1}
                    </span>
                    {i < steps.length - 1 && (
                      <ArrowRight className="hidden size-4 text-muted-foreground/40 sm:block" />
                    )}
                  </div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who it's for ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Who it's for
          </p>
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for founder-led service businesses.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {icpPoints.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl border border-border p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <p className="text-sm leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Starting with in-home senior care providers — expanding to med spas,
            assisted living, home services, and more.
          </p>
        </section>

        {/* ── Pricing preview ─────────────────────────────────────────── */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Pricing
            </p>
            <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Fraction of the cost. Faster results.
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {tiers.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col gap-3 rounded-xl border border-border p-6"
                >
                  <p className="text-sm font-medium text-muted-foreground">{t.name}</p>
                  <p className="text-2xl font-semibold">{t.price}</p>
                  <p className="text-xs text-muted-foreground">/month</p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-3.5 shrink-0 text-muted-foreground" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Early access members lock in preferred pricing before public launch.
            </p>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-28 text-center">
          <h2 className="mb-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Secure your spot before we open to the public.
          </h2>
          <p className="mb-10 max-w-xl text-balance text-lg text-muted-foreground">
            A $100 deposit locks in early access and preferred pricing. It's
            applied in full to your first month and refundable if Alto isn't the
            right fit.
          </p>
          <CheckoutButton className="h-12 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full" />
          <p className="mt-4 text-xs text-muted-foreground">
            Secure checkout via Stripe · No commitment beyond the deposit
          </p>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Alto</span>
          <span>© {new Date().getFullYear()} Alto. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const problems = [
  {
    title: "Agencies are slow and opaque",
    body: "Traditional digital marketing agencies charge $3k–$10k/month, move at human speed, and rarely show you what you're actually paying for.",
  },
  {
    title: "DIY is a full-time job",
    body: "Managing SEO, Google Business Profile, and content yourself pulls you away from running your business — and results are inconsistent.",
  },
  {
    title: "AI-driven search is changing everything",
    body: "Consumers are increasingly finding local services through AI tools, not just Google. Most businesses have no strategy for this shift.",
  },
  {
    title: "Leads are too valuable to leave to chance",
    body: "For in-home care, med spas, and similar businesses, a single lead can mean thousands in lifetime revenue. Gaps in visibility are expensive.",
  },
];

const capabilities = [
  {
    icon: Bot,
    label: "Autonomous execution",
    body: "Alto acts — it updates your website, creates optimized content, and maintains your Google Business Profile automatically.",
  },
  {
    icon: BarChart3,
    label: "Continuous monitoring",
    body: "Tracks SEO and AEO visibility, competitor movements, and performance gaps in real time.",
  },
  {
    icon: Globe,
    label: "AI search optimization",
    body: "Optimizes your presence for AI-driven discovery tools, not just traditional search rankings.",
  },
  {
    icon: Zap,
    label: "Outcome-driven reporting",
    body: "Transparent reporting on leads, traffic, and visibility — no agency jargon required.",
  },
];

const steps = [
  {
    title: "We audit your current presence",
    body: "Alto analyzes your website, Google Business Profile, local search rankings, and competitor landscape.",
  },
  {
    title: "Alto builds and executes the strategy",
    body: "Our AI agents continuously create, optimize, and publish content and profile updates — no input needed from you.",
  },
  {
    title: "You see measurable growth",
    body: "Track leads, rankings, and visibility through clear reporting. Human approval available as an optional layer.",
  },
];

const icpPoints = [
  "You rely on high-intent local search to find customers — people actively looking for your service online.",
  "Each lead materially impacts your revenue, and losing visibility is costly.",
  "You're frustrated with agencies: slow timelines, unclear results, and high retainers.",
  "You run a lean team. You need marketing to run itself so you can focus on operations.",
];

const tiers = [
  {
    name: "Starter",
    price: "$500–$2,500",
    features: ["Automated monitoring", "SEO & AEO optimization", "Monthly reporting"],
  },
  {
    name: "Core",
    price: "$2,500–$4,500",
    features: ["Everything in Starter", "Autonomous content execution", "GBP management"],
  },
  {
    name: "Enterprise",
    price: "$5,000+",
    features: ["Everything in Core", "Paid campaign management", "Optional concierge layer"],
  },
];
