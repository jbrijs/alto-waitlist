import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StickyNav } from "@/components/StickyNav";

export default function Home() {
  return (
    <>
      <StickyNav />

      {/* Full-bleed hero with radial gradient — 75vh so how-it-works peeks below */}
      <div className="flex flex-col bg-hero-gradient pt-[72px] min-h-[94vh]">
        {/* Hero content — vertically centered in remaining space */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-8 pb-20">
          <div className="max-w-4xl w-full flex flex-col gap-7">
            {/* Badge */}
            <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-primary font-mono text-[0.65rem] tracking-[0.18em] uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
              Early Access — Limited Spots
            </span>

            {/* Headline */}
            <h1 className="text-[3.75rem] sm:text-[5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight text-gray-900 font-serif italic">
              Your organic marketing.
              <br />
              <span className="text-primary">On autopilot.</span>
            </h1>

            {/* Subhead */}
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl font-sans">
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
                  className="h-12 px-8 text-sm font-semibold rounded-lg text-white bg-primary"
                >
                  <Link href="/reserve">Reserve My Spot →</Link>
                </Button>
                <a
                  href="#how-it-works"
                  className="h-12 px-6 rounded-full inline-flex items-center text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200 whitespace-nowrap bg-gray-200"
                >
                  See how it works
                </a>
              </div>
              <p className="text-xs text-gray-400 px-1 font-mono">
                $100 refundable deposit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works — glass card overlapping the hero gradient */}
      <section id="how-it-works" className="relative z-10 section-glass -mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-20 pb-60">
          {/* Section header */}
          <div className="flex flex-col gap-3 mb-12">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-primary font-mono">
              How it works
            </span>
            <h2 className="text-[2rem] sm:text-[2.5rem] leading-tight tracking-tight text-gray-900 font-serif italic">
              Set it up once.{" "}
              <span className="text-primary">Alto runs the rest.</span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed max-w-lg">
              From integration to ongoing optimization, here is what to expect once you secure your spot.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
            {/* Step 1 */}
            <div className="bg-white p-7 flex flex-col gap-6">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary font-mono">
                  Setup
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] tabular-nums text-primary font-mono">
                  01
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
            <div className="bg-white p-7 flex flex-col gap-6">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary font-mono">
                  Audit
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] tabular-nums text-primary font-mono">
                  02
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
            <div className="bg-white p-7 flex flex-col gap-6">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary font-mono">
                  Optimize
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] tabular-nums text-primary font-mono">
                  03
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
            <div className="bg-white p-7 flex flex-col gap-6">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary font-mono">
                  Results
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] tabular-nums text-primary font-mono">
                  04
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
              className="h-12 px-8 text-sm font-semibold rounded-lg text-white bg-primary"
            >
              <Link href="/reserve">Reserve My Spot →</Link>
            </Button>
            <p className="text-xs text-gray-400 font-mono">
              Early access, limited spots available
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
