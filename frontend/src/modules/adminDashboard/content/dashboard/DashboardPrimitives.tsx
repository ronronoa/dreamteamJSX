import type { ReactNode } from "react";
import { useNavigate } from "react-router";

/* ── Primitives ───────────────────────────────────────────── */

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}

const toneMap = {
  purple: { bg: "bg-purple-50", fg: "text-purple-600" },
  green:  { bg: "bg-emerald-50", fg: "text-emerald-600" },
  blue:   { bg: "bg-blue-50",   fg: "text-blue-600" },
  red:    { bg: "bg-red-50",    fg: "text-red-600" },
} as const;

export function StatCard({
  label, value, icon, tone, footer, link
}: {
  label: string;
  value: string;
  icon: ReactNode;
  tone: keyof typeof toneMap;
  footer: ReactNode;
  link?: string;
}) {
  const t = toneMap[tone];
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link || "")}
      className={`rounded-2xl border border-gray-200 bg-white p-5 ${link ? "cursor-pointer hover:border-gray-500" : ""}`}>
      <div className="flex items-start justify-between">
        <p className="text-xs text-gray-500">{label}</p>
        <span className={`flex h-7 w-7 items-center justify-center rounded-md ${t.bg} ${t.fg}`}>
          {icon}
        </span>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="mt-3 text-[11px]">{footer}</div>
    </div>
  );
}

export function LegendDot({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-gray-600">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <span className="text-gray-700">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </span>
  );
}

export function ProgressRow({
  label, value, percent, tone,
}: {
  label: string;
  value: string;
  percent: number;
  tone: "blue" | "red";
}) {
  const bar = tone === "blue" ? "bg-blue-500" : "bg-red-500";
  const txt = tone === "blue" ? "text-blue-600" : "text-red-600";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="font-semibold text-gray-800">{label}</span>
        <span className={`font-semibold ${txt}`}>{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-purple-200/60">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
