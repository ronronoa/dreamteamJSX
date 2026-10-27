import { REPORT_PIN_PATTERN, REPORT_PIN_REGEX, REPORT_PIN_HINT } from "@/utils/reportPin";
import { useState } from "react";
import CommonButton from "@/components/common/widgets/CommonButton";
import CommonInput from "@/components/common/widgets/CommonInput";
import { setPin as apiSetPin } from "@/api/auth";

export default function ReportPinSection({ accessToken }: { accessToken: string | undefined }) {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!REPORT_PIN_REGEX.test(pin)) {
      setError(REPORT_PIN_HINT);
      return;
    }
    if (pin !== confirmPin) {
      setError("PIN entries do not match.");
      return;
    }
    if (!accessToken) {
      setError("Your session has expired. Sign in again to update your PIN.");
      return;
    }

    setSaving(true);
    try {
      await apiSetPin(accessToken, pin);
      setPin("");
      setConfirmPin("");
      setMessage("Your report form PIN was saved. This PIN replaces any previous PIN.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your report form PIN.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3 border-t border-gray-300 pt-5">
      {/* Header sits above the inputs — this is the fix for the old jumbled layout */}
      <div>
        <h3 className="text-xs font-bold text-gray-900">Report form PIN</h3>
        <p className="mt-1 text-[10px] leading-relaxed text-gray-500">
          Set or replace your personal report PIN. Choose four digits that are not assigned to another user. Your current PIN is
          never shown.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <CommonInput
          id="profile-report-pin"
          label="New PIN"
          type="password"
          pattern={REPORT_PIN_PATTERN}
          placeholder="0482"
          inputMode="numeric"
          autoComplete="new-password"
          maxLength={4}
          minLength={4}
          value={pin}
          onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))}
          required
          variant="compact"
        />
        <CommonInput
          id="profile-confirm-report-pin"
          label="Confirm PIN"
          type="password"
          pattern={REPORT_PIN_PATTERN}
          placeholder="0482"
          inputMode="numeric"
          autoComplete="new-password"
          maxLength={4}
          minLength={4}
          value={confirmPin}
          onChange={(event) => setConfirmPin(event.target.value.replace(/\D/g, ""))}
          required
          variant="compact"
        />
      </div>

      {error && <p role="alert" className="text-[11px] text-red-600">{error}</p>}
      {message && <p role="status" className="text-[11px] text-emerald-700">{message}</p>}

      <CommonButton type="submit" compact disabled={saving}>
        {saving ? "Saving PIN…" : "Save report PIN"}
      </CommonButton>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Personal & work details                                                   */
/* -------------------------------------------------------------------------- */

