import { Mail, KeyRound, ArrowLeft, X } from "lucide-react";
import Modal from "./Modal";
import CommonButton from "../widgets/CommonButton";
import { useState } from "react";
import CommonInput from "../widgets/CommonInput";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({
  open,
  onClose,
}: ForgotPasswordModalProps) {

  const [email, setEmail] = useState("")


 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Modal open={open} onClose={onClose} dismissable={email.trim().length <= 3}>

      <div className="flex flex-row justify-between items-center">
        <p className="text-xs font-bold tracking-widest text-orange-500 mb-1">
          ACCESS RECOVERY —
        </p>
        <CommonButton
          onClick={() => onClose()}
          variant="none"
          className="p-2! m-2! bg-white/20 hover:bg-black/5"
        >
          <X size={15}/>
        </CommonButton>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Forgot Password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CommonInput
          id="email"
          label="Email Address"
          type="text"
          required
          placeholder="admin@gmail.com"
          icon={<Mail size={18}/>}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          />

        <CommonButton
          variant="purple"
          className="mt-8 w-full flex items-center justify-center gap-2"
        >
          <span>
            <KeyRound className="-rotate-90 -scale-x-100"/>
          </span>
          Send Reset Link
        </CommonButton>

        <CommonButton
          onClick={() => onClose()}
          variant="none"
          className="text-black shadow-none w-full flex items-center justify-center gap-2"
        >
          <span>
            <ArrowLeft/>
          </span>
          Back to Sign In
        </CommonButton>

      </form>

    </Modal>
  );
}
