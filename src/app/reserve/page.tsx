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
      <div className="flex-1 flex items-center justify-center px-6 pb-20 relative">
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
