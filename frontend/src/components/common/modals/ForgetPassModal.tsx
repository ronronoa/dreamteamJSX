import { useEffect, useState } from "react";
import { ArrowLeft, KeyRound, Mail, X } from "lucide-react";
import { requestPasswordReset } from "@/api/auth";
import CommonButton from "../widgets/CommonButton";
import CommonInput from "../widgets/CommonInput";
import Modal from "./Modal";
import ResetCodeModal from "./ResetCodeModal";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setError("");
    }
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      await requestPasswordReset(normalizedEmail);
      setResetEmail(normalizedEmail);
      setResetModalOpen(true);
      setEmail("");
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not send a password reset code.");
    } finally {
      setSubmitting(false);
    }
  }

  function closeResetModal() {
    setResetModalOpen(false);
    setResetEmail("");
  }

  return (
    <>
      <Modal open={open} onClose={onClose} dismissable={!submitting}>
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest text-orange-500">ACCESS RECOVERY —</p>
          <CommonButton
            type="button"
            onClick={onClose}
            variant="none"
            disabled={submitting}
            className="m-2! bg-white/20 p-2! shadow-none hover:bg-black/5"
            aria-label="Close forgot password"
          >
            <X size={15} />
          </CommonButton>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Forgot Password</h1>
        <p className="mb-6 text-sm text-gray-600">Enter the email address linked to your account and we’ll send you a verification code.</p>

        <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
          <CommonInput
            id="forgot-password-email"
            label="Email Address"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="admin@gmail.com"
            icon={<Mail size={18} />}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <CommonButton type="submit" variant="purple" disabled={submitting} className="mt-4 w-full justify-center">
            <KeyRound className="-rotate-90 -scale-x-100" size={18} />
            {submitting ? "Sending code…" : "Send verification code"}
          </CommonButton>
          <CommonButton type="button" onClick={onClose} variant="none" disabled={submitting} className="w-full justify-center text-black shadow-none">
            <ArrowLeft size={18} />
            Back to Sign In
          </CommonButton>
        </form>
      </Modal>

      <ResetCodeModal open={resetModalOpen} email={resetEmail} onClose={closeResetModal} />
    </>
  );
}
