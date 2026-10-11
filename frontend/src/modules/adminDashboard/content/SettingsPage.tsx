import { useState } from "react";
import {
  Bell,
  ChevronRight,
  FileText,
  FormInput,
  Shield,
  Sparkles,
} from "lucide-react";

import CommonButton from "@/components/common/widgets/CommonButton";
import CommonInput from "@/components/common/widgets/CommonInput";
import { useAuth } from "@/context/AuthContext";
import { setPin as apiSetPin } from "@/api/auth";
import { Row, Select, SettingsSection, Toggle } from "./settings/SettingsPrimitives";

export default function SettingsPage() {
  const { session } = useAuth();
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [pinError, setPinError] = useState("");
  const [savingPin, setSavingPin] = useState(false);
  const canManagePin = session?.user.role !== "MEMBER";
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
          <Toggle label="Low stock alerts" checked={lowStockAlerts} onChange={setLowStockAlerts} />
        </Row>

        <Row
          label="Approval notifications"
          hint="Notify administrators of new log requests."
          isLast
        >
          <Toggle label="Approval notifications" checked={approvalNotifications} onChange={setApprovalNotifications} />
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
      {canManagePin && <SettingsSection
        icon={Shield}
        title="Report form PIN"
        description="Set or update the PIN members use to submit report forms."
      >
        <form onSubmit={async (event) => {
          event.preventDefault();
          setPinError("");
          setPinMessage("");
          if (!/^\d{4,6}$/.test(pin)) {
            setPinError("PIN must contain 4 to 6 digits.");
            return;
          }
          if (pin !== pinConfirm) {
            setPinError("PIN entries do not match.");
            return;
          }
          if (!session?.accessToken) {
            setPinError("Sign in again to update your PIN.");
            return;
          }
          setSavingPin(true);
          try {
            await apiSetPin(session.accessToken, pin);
            setPin("");
            setPinConfirm("");
            setPinMessage("Your report PIN was saved.");
          } catch (error) {
            setPinError(error instanceof Error ? error.message : "Could not save your PIN.");
          } finally {
            setSavingPin(false);
          }
        }} className="max-w-md space-y-3">
          <CommonInput label="New PIN" type="password" inputMode="numeric" autoComplete="new-password" maxLength={6} value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))} required />
          <CommonInput label="Confirm PIN" type="password" inputMode="numeric" autoComplete="new-password" maxLength={6} value={pinConfirm} onChange={(event) => setPinConfirm(event.target.value.replace(/\D/g, ""))} required />
          {pinError && <p role="alert" className="text-sm text-red-700">{pinError}</p>}
          {pinMessage && <p role="status" className="text-sm text-emerald-700">{pinMessage}</p>}
          <CommonButton type="submit" compact disabled={savingPin}>{savingPin ? "Saving…" : "Save PIN"}</CommonButton>
        </form>
      </SettingsSection>}

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
