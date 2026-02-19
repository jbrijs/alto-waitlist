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
