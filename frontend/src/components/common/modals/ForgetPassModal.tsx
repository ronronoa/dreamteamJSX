import { Mail, KeyRound, ArrowLeft, X } from "lucide-react";
import Modal from "./Modal";
import CommonButton from "../widgets/CommonButton";
import { useState } from "react";

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
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800 mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            />
          </div>
        </div>


        <CommonButton
          variant="orangeLinear"
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
          className="text-[#d07a45] shadow-none w-full flex items-center justify-center gap-2"
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
