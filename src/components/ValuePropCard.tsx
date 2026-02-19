import type { ReactNode } from "react";

interface ValuePropCardProps {
  icon: ReactNode;
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
