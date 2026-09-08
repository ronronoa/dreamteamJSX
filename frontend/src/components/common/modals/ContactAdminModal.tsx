import {
  User,
  Mail,
  Briefcase,
  MessageSquare,
  ChevronDown,
  Send,
  X,
} from "lucide-react";
import Modal from "./Modal";
import CommonButton from "../widgets/CommonButton";
import CommonInput from "../widgets/CommonInput";

interface ContactAdminModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactAdminModal({
  open,
  onClose,
}: ContactAdminModalProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs font-bold tracking-widest text-orange-500">
          REGISTRATION ACCESS —
        </p>

        <CommonButton
          type="button"
          onClick={onClose}
          variant="none"
          className="p-2! m-2! bg-white/20 hover:bg-black/5"
        >
          <X size={15} />
        </CommonButton>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Contact Administrator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CommonInput
          id="fullName"
          label="Full Name"
          type="text"
          required
          placeholder="Juan Dela Cruz"
          icon={<User size={18}/>}
        />

        <CommonInput
          id="email"
          label="Email Address"
          type="email"
          required
          placeholder="juan.delacruz@gmail.com"
          icon={<Mail size={18}/>}
        />


        <div>
          <label
            htmlFor="role"
            className="block text-sm font-semibold text-gray-800 mb-1.5"
          >
            Role / Position
          </label>

          <div className="relative">
            <Briefcase
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <select
              id="role"
              defaultValue=""
              required
              className="
              w-full appearance-none
              rounded-xl bg-white
              pl-10 pr-10 py-3
              text-sm text-gray-800
              outline-none
              focus:ring-2 focus:ring-purple-400
              shadow-sm
              border-2
              invalid:text-gray-400
              "
            >
              <option value="" disabled>
                Choose requested role (e.g. BHERT Responder, DRRM Officer...)
              </option>
              <option value="bhert-responder">BHERT Responder</option>
              <option value="drrm-officer">DRRM Officer</option>
              <option value="other">Other</option>
            </select>

            <ChevronDown
              size={18}
              className="
              pointer-events-none
              absolute right-3.5 top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-800 mb-1.5"
          >
            Message / Reason
          </label>

          <div className="relative">
            <MessageSquare
              size={18}
              className="absolute left-3.5 top-3.5 text-gray-400"
            />

            <textarea
              id="message"
              required
              rows={4}
              placeholder="Please specify why you need access to the system..."
              className="w-full resize-none rounded-xl bg-white pl-10 pr-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-purple-400 shadow-sm border-2 invalid:text-gray-400"
            />
          </div>
        </div>

        <CommonButton
          type="submit"
          variant="purple"
          className="mt-5 w-full flex items-center justify-center gap-2"
        >
          <span>
            <Send/>
          </span>
          Submit Request
        </CommonButton>

        <CommonButton
          type="button"
          onClick={onClose}
          variant="none"
          className="text-black shadow-none w-full"
        >
          Cancel
        </CommonButton>
      </form>
    </Modal>
  );
}
