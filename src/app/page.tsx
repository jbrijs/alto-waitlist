import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StickyNav } from "@/components/StickyNav";

export default function Home() {
  return (
    <>
      <StickyNav />

      {/* Full-bleed hero with radial gradient — 75vh so how-it-works peeks below */}
      <div
        className="flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -10%, #fdfcfb 0%, #f0faf8 45%, #f3f4f6 100%)",
          paddingTop: "72px",
          minHeight: "94vh",
        }}
      >
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
              Your organic marketing.{" "}
              <span style={{ color: "#0d9488" }}>On autopilot.</span>
            </h1>

            {/* Subhead */}
            <p
              className="text-lg text-gray-500 leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
            >
              Alto continuously improves your search visibility, AI presence,
              and local rankings so more customers find you. No agency, no
              manual work, at a fraction of the cost.
            </p>

            {/* CTA */}
            <div className="flex flex-col gap-3 self-start">
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-sm font-semibold rounded-lg text-white"
                  style={{ background: "#0d9488" }}
                >
                  <Link href="/reserve">Reserve My Spot →</Link>
                </Button>
                <a
                  href="#how-it-works"
                  className="h-12 px-6 rounded-full inline-flex items-center text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200"
                  style={{ background: "#e5e7eb" }}
                >
                  See how it works
                </a>
              </div>
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

      {/* How it works — glass card overlapping the hero gradient */}
      <section
        id="how-it-works"
        className="relative z-10"
        style={{
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          borderRadius: "64px 64px 0 0",
          border: "1px solid rgba(255, 255, 255, 0.75)",
          borderBottom: "none",
          boxShadow:
            "0 -8px 40px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)",
          marginTop: "-40px",
        }}
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
              From integration to ongoing optimization, here is what to expect once you secure your spot.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
            {/* Step 1 */}
            <div className="bg-white p-7 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span
                  className="text-[2rem] font-bold leading-none"
                  style={{ color: "rgba(13, 148, 136, 0.15)", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  01
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Setup
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-gray-900">Integrate your business</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Connect your website, Google Business Profile, and other services. Takes under 5 minutes and Alto takes over from there.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-7 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span
                  className="text-[2rem] font-bold leading-none"
                  style={{ color: "rgba(13, 148, 136, 0.15)", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  02
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Audit
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-gray-900">AI maps your presence</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Alto benchmarks where you rank across ChatGPT, Google, and many other online sources, capturing how your brand is described and where competitors have the edge.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-7 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span
                  className="text-[2rem] font-bold leading-none"
                  style={{ color: "rgba(13, 148, 136, 0.15)", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  03
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Optimize
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-gray-900">Autonomous optimization</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Alto publishes SEO content, strengthens your citation signals, updates your local listings, and continuously improves how AI platforms represent your business.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-7 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span
                  className="text-[2rem] font-bold leading-none"
                  style={{ color: "rgba(13, 148, 136, 0.15)", fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  04
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Results
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-gray-900">Results you can see</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Watch AI visibility, search rankings, and local traffic grow over time. Clear metrics with no agency interpretation layer between you and the data.
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
              Early access, limited spots available
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
