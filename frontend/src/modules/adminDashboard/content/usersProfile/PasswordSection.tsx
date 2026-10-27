import { useState } from "react";
import { KeyRound } from "lucide-react";
import CommonButton from "@/components/common/widgets/CommonButton";
import CommonInput from "@/components/common/widgets/CommonInput";
import { useAuth } from "@/store/useAuth";
import { CARD_CLASS } from "./profileUtils";

export default function PasswordSection() {
  const { changePassword } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (next !== confirm) {
      setError("The new passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      await changePassword(current, next);
      setCurrent("");
      setNext("");
      setConfirm("");
      setMessage("Password changed. Other sessions will need to sign in again.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change your password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className={CARD_CLASS}>
      <header className="flex items-center gap-2 border-b border-gray-300 p-6">
        <KeyRound size={15} className="text-purple-700" />
        <div>
          <h3 className="text-sm font-bold text-gray-900">Change password</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Use 8–64 characters. Other signed-in sessions will need to sign in again.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <CommonInput
            id="profile-current-password"
            label="Current password"
            type="password"
            value={current}
            onChange={(event) => setCurrent(event.target.value)}
            required
            minLength={1}
            autoComplete="current-password"
            showPasswordToggle
            variant="compact"
          />
          <CommonInput
            id="profile-new-password"
            label="New password"
            type="password"
            value={next}
            onChange={(event) => setNext(event.target.value)}
            required
            minLength={8}
            maxLength={64}
            autoComplete="new-password"
            showPasswordToggle
            variant="compact"
          />
          <CommonInput
            id="profile-confirm-password"
            label="Confirm new password"
            type="password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            required
            minLength={8}
            maxLength={64}
            autoComplete="new-password"
            showPasswordToggle
            variant="compact"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
            {message && <p role="status" className="text-xs text-emerald-700">{message}</p>}
          </div>
          <CommonButton type="submit" compact disabled={saving}>
            {saving ? "Updating password…" : "Update password"}
          </CommonButton>
        </div>
      </form>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small presentational helpers                                              */
/* -------------------------------------------------------------------------- */

