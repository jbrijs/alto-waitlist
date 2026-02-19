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
