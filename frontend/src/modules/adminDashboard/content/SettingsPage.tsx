import { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  FileText,
  FormInput,
  Shield,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import CommonButton from "@/components/common/widgets/CommonButton";

export default function SettingsPage() {
  const [lowStockAlerts, setLowStockAlerts] = useState(false);
  const [approvalNotifications, setApprovalNotifications] = useState(false);
  const [archiveRetention, setArchiveRetention] = useState("1-year");
  const [sessionTimeout, setSessionTimeout] = useState("30-min");

  return (
    <div className="mx-auto max-w-4xl space-y-2">
      {/* Workspace identity */}
      <SettingsSection
        icon={Sparkles}
        title="Workspace identity"
        description="Branding and office details used in reports."
      >
        <Row label="System name">
          <div className="flex items-center justify-end gap-3">
            <span className="text-xs text-gray-700">
              Barangay 176-E DRRMO Operation Logistics Management System
            </span>
            <CommonButton compact>Edit</CommonButton>
          </div>
        </Row>

        <Row label="Office name">
          <div className="flex items-center justify-end gap-3">
            <span className="text-xs text-gray-700">
              Disaster Risk Reduction and Management Office
            </span>
            <CommonButton compact>Edit</CommonButton>
          </div>
        </Row>

        <Row label="Office hotline" isLast>
          <div className="flex items-center justify-end gap-3">
            <span className="text-xs text-gray-700">(02) 8241 1760</span>
            <CommonButton compact>Edit</CommonButton>
          </div>
        </Row>
      </SettingsSection>

      {/* Alerts & notifications */}
      <SettingsSection
        icon={Bell}
        title="Alerts & notifications"
        description="Choose which operational changes require attention."
      >
        <Row label="Low stock alerts" hint="Notify when supplies meet reorder level.">
          <Toggle checked={lowStockAlerts} onChange={setLowStockAlerts} />
        </Row>

        <Row
          label="Approval notifications"
          hint="Notify administrators of new log requests."
          isLast
        >
          <Toggle checked={approvalNotifications} onChange={setApprovalNotifications} />
        </Row>
      </SettingsSection>

      {/* Reports & records */}
      <SettingsSection
        icon={FileText}
        title="Reports & records"
        description="Control document output and retention."
      >
        <Row
          label="Archive retention"
          hint="How long should archived records be retained"
        >
          <Select
            value={archiveRetention}
            onChange={setArchiveRetention}
            options={[
              { value: "6-months", label: "6 months" },
              { value: "1-year", label: "1 year" },
              { value: "3-years", label: "3 years" },
              { value: "5-years", label: "5 years" },
            ]}
          />
        </Row>

        <Row
          label="Generate Database Backup"
          hint="Create backup database on local file"
          isLast
        >
          <CommonButton compact onClick={() => console.log("generate backup")}>
            Generate
          </CommonButton>
        </Row>
      </SettingsSection>

      {/* Security & accessibility */}
      <SettingsSection
        icon={Shield}
        title="Security & accessibility"
        description="Safer defaults and clearer interface behavior."
      >
        <Row
          label="Session timeout"
          hint="Notify when supplies meet reorder level."
          isLast
        >
          <Select
            value={sessionTimeout}
            onChange={setSessionTimeout}
            options={[
              { value: "15-min", label: "15 minutes" },
              { value: "30-min", label: "30 minutes" },
              { value: "1-hour", label: "1 hour" },
              { value: "2-hours", label: "2 hours" },
            ]}
          />
        </Row>
      </SettingsSection>

      {/* Forms management */}
      <SettingsSection
        icon={FormInput}
        title="Forms Management"
        description="Manage Forms Options"
      >
        <Row label="Vehicle Option" hint="Add and remove options" isLast>
          <button
            type="button"
            aria-label="Open vehicle options"
            className="text-gray-500 hover:text-gray-800"
          >
            <ChevronRight size={18} />
          </button>
        </Row>
      </SettingsSection>
    </div>
  );
}

/* ── Primitives ──────────────────────────────────────────── */

function SettingsSection({
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

function Row({
  label,
  hint,
  isLast = false,
  children,
}: {
  label: string;
  hint?: string;
  isLast?: boolean;
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

      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full transition-colors ${
        checked ? "bg-purple-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-56 cursor-pointer appearance-none rounded-md border border-gray-200 bg-gray-100 pl-3 pr-9 text-xs font-medium text-gray-700 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
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
