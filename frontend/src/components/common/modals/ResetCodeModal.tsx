import { useState } from "react";
import { KeyRound, LockKeyhole, Mail, X } from "lucide-react";
import { completePasswordReset } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import CommonButton from "../widgets/CommonButton";
import CommonInput from "../widgets/CommonInput";
import Modal from "./Modal";

interface ResetCodeModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
}

export default function ResetCodeModal({ open, email, onClose }: ResetCodeModalProps) {
  const { setSessionAfterPasswordReset } = useAuth();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const session = await completePasswordReset({ email, code, newPassword, confirmPassword });
      setSessionAfterPasswordReset(session);
      onClose();
      setCode("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not reset your password.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    if (submitting) return;
    setError("");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} dismissable={!submitting}>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-orange-500">ACCOUNT RECOVERY —</p>
        <CommonButton
          type="button"
          onClick={handleClose}
          variant="none"
          disabled={submitting}
          className="m-2! bg-white/20 p-2! shadow-none hover:bg-black/5"
          aria-label="Close password reset"
        >
          <X size={15} />
        </CommonButton>
      </div>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">Reset Password</h1>
      <p className="mb-6 text-sm text-gray-600">
        Enter the verification code sent to <span className="font-semibold">{email}</span>, then choose a new password.
      </p>

      <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
        <CommonInput
          id="reset-code"
          label="Verification code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          pattern="[0-9]{6}"
          required
          placeholder="6-digit code"
          icon={<KeyRound size={18} />}
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
        />
        <CommonInput
          id="new-password"
          label="New password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={64}
          required
          placeholder="At least 8 characters"
          icon={<LockKeyhole size={18} />}
          showPasswordToggle
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <CommonInput
          id="confirm-new-password"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={64}
          required
          placeholder="Re-enter your new password"
          icon={<LockKeyhole size={18} />}
          showPasswordToggle
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <CommonButton type="submit" variant="purple" disabled={submitting} className="mt-4 w-full justify-center">
          {submitting ? "Resetting password…" : "Reset password and sign in"}
        </CommonButton>
        <CommonButton type="button" onClick={handleClose} variant="none" disabled={submitting} className="w-full justify-center text-black shadow-none">
          <Mail size={16} />
          Back to sign in
        </CommonButton>
      </form>
    </Modal>
  );
}
