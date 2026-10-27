import { ChevronDown } from "lucide-react";
import { Switch } from "@base-ui/react/switch";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* ── Primitives ──────────────────────────────────────────── */

export function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-gray-100 pb-6 pt-2 last:border-0">
      <header className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
          <Icon size={18} className="text-purple-600" />
        </div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </header>

      <div className="space-y-3 pl-0 sm:pl-13">{children}</div>
    </section>
  );
}

export function Row({
  label,
  hint,
  isLast = false,
  wide = false,
  children,
}: {
  label: string;
  hint?: string;
  isLast?: boolean;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 py-2 ${
        isLast ? "" : "border-b border-transparent"
      }`}
    >
      <div className="min-w-0">
        <p className="text-xs font-bold text-gray-900">{label}</p>
        {hint && <p className="mt-0.5 text-[11px] text-gray-500">{hint}</p>}
      </div>

      <div className={wide ? "w-full max-w-xl" : "shrink-0"}>{children}</div>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      aria-label={label}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? "bg-purple-600" : "bg-gray-200"
      }`}
    >
      <Switch.Thumb
        className={`absolute left-0.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </Switch.Root>
  );
}

export function Select({
  value,
  onChange,
  options,
  disabled = false,
  wide = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={`relative ${wide ? "w-full" : ""}`}>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${wide ? "w-full" : "w-56"} h-9 cursor-pointer appearance-none rounded-md border border-gray-200 bg-gray-100 pl-3 pr-9 text-xs font-medium text-gray-700 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
      />
    </div>
  );
}
