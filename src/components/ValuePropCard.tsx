import type { ReactNode } from "react";

interface ValuePropCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function ValuePropCard({ icon, title, description }: ValuePropCardProps) {
  return (
    <div className="panel p-6 flex flex-col gap-3">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-accent">
        <span className="text-primary">{icon}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
