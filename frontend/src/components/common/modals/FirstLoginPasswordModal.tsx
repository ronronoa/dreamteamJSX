import { useState, type FormEvent } from "react";
import { useAuth } from "@/store/useAuth";
import CommonButton from "../widgets/CommonButton";
import CommonInput from "../widgets/CommonInput";
import Modal from "./Modal";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 64;

export default function FirstLoginPasswordModal() {
  const { changePassword, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError("Use at least 8 characters for your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("The new passwords do not match.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("Choose a password different from your default password.");
      return;
    }

    setSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not update your password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    if (submitting) return;
    setSubmitting(true);
    try {
      await logout();
    } catch {
      setError("Could not complete sign out. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open onClose={() => {}} dismissable={false}>
      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">Change your default password</h2>
          <p className="text-sm text-gray-600">Before continuing, choose a new password with at least 8 characters.</p>
        </div>
        <CommonInput
          id="first-login-current-password"
          label="Default password"
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          autoComplete="off"
          required
          maxLength={200}
          disabled={submitting}
          showPasswordToggle
        />
        <CommonInput
          id="first-login-new-password"
          label="New password"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          autoComplete="off"
          minLength={MIN_PASSWORD_LENGTH}
          maxLength={MAX_PASSWORD_LENGTH}
          required
          disabled={submitting}
          showPasswordToggle
        />
        <CommonInput
          id="first-login-confirm-password"
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="off"
          minLength={MIN_PASSWORD_LENGTH}
          maxLength={MAX_PASSWORD_LENGTH}
          required
          disabled={submitting}
          showPasswordToggle
        />
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <CommonButton type="button" variant="gray" compact onClick={() => void handleSignOut()} disabled={submitting}>Sign out</CommonButton>
          <CommonButton type="submit" variant="purple" compact disabled={submitting}>{submitting ? "Saving…" : "Change password"}</CommonButton>
        </div>
      </form>
    </Modal>
  );
}
