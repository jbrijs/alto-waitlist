import Link from "next/link";
import { Zap, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValuePropCard } from "@/components/ValuePropCard";

export default function Home() {
  return (
    <>
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
              <a
                href="#how-it-works"
                className="mt-1 self-start text-xs font-medium"
                style={{ color: "#0d9488", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.05em" }}
              >
                See how it works ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section
        id="how-it-works"
        style={{ background: "#ffffff" }}
      >
        <div className="max-w-4xl mx-auto px-8 py-20">
          {/* Section header */}
          <div className="flex flex-col gap-3 mb-12">
            <span
              className="text-[10px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: "#0d9488", fontFamily: "var(--font-geist-mono), monospace" }}
            >
              How it works
            </span>
            <h2
              className="text-[2rem] sm:text-[2.5rem] leading-tight tracking-tight text-gray-900"
              style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic" }}
            >
              Set it up once.{" "}
              <span style={{ color: "#0d9488" }}>Alto runs the rest.</span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed max-w-lg">
              From onboarding to ongoing optimization — here&apos;s exactly what happens after you reserve your spot.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
            {/* Step 1 */}
            <div className="bg-white p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-[2rem] font-bold leading-none"
                  style={{ color: "rgba(13, 148, 136, 0.15)", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  01
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(13, 148, 136, 0.08)", color: "#0d9488", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Setup
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-gray-900">Connect your business</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Share your website, Google Business Profile, and key details. Takes under 5 minutes — then Alto takes over.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-[2rem] font-bold leading-none"
                  style={{ color: "rgba(13, 148, 136, 0.15)", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  02
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(37, 99, 235, 0.08)", color: "#2563eb", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Audit
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-gray-900">AI maps your presence</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Alto queries ChatGPT, Perplexity, and Google to benchmark where you rank, how AI describes your brand, and where competitors are beating you.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-[2rem] font-bold leading-none"
                  style={{ color: "rgba(13, 148, 136, 0.15)", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  03
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(124, 58, 237, 0.08)", color: "#7c3aed", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Optimize
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-gray-900">Autonomous optimization</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Alto publishes SEO content, strengthens your citation signals, updates your local listings, and improves how AI platforms represent your business — continuously.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span
                  className="text-[2rem] font-bold leading-none"
                  style={{ color: "rgba(13, 148, 136, 0.15)", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  04
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(217, 119, 6, 0.08)", color: "#d97706", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Results
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-gray-900">Results you can measure</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Track AI visibility, search rankings, and local traffic in your dashboard. No agency interpretation layer — just clear numbers.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-2 mt-12">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-sm font-semibold rounded-lg text-white"
              style={{ background: "#0d9488" }}
            >
              <Link href="/reserve">Reserve My Spot →</Link>
            </Button>
            <p
              className="text-xs text-gray-400"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Early access — limited spots available
            </p>
          </div>
        </div>
      </section>

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
    </>
  );
}
