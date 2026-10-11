import { useState } from "react";
import { Box, X } from "lucide-react";
import Modal from "./Modal";
import CommonButton from "../widgets/CommonButton";
import CommonInput from "../widgets/CommonInput";

export interface UserFormValues {
  password: string;
}

interface AddInventoryModalProps {
  open: boolean;
  error: string;
  onClose: () => void;
}

export default function AddInventoryModal({
  open,
  error,
  onClose,
}: AddInventoryModalProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const inputClassName = "!h-10 !rounded-lg !border !border-gray-300 !bg-white !py-2 !pl-3 !text-[13px]";

  return (
    <Modal open={open} onClose={onClose} >
      <div className="w-full bg-white">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
              <Box size={17} className="text-purple-700" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Add New Item
              </h2>
              <p className="text-xs text-slate-600">
                Register a new supply item to the emergnecy inventory.
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close modal" className="text-slate-500 hover:text-slate-900">
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CommonInput
              id="user-name"
              label="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={50}
              className={inputClassName}
            />
            <CommonInput
              id="user-username"
              label="Username"
              value={username} onChange={(event) => setUsername(event.target.value)}
              required
              minLength={3} maxLength={50}
              pattern="[a-zA-Z0-9._-]+"
              className={inputClassName}
            />
            <CommonInput
              id="user-email"
              label="Email (optional)"
              type="email"
              maxLength={254} autoComplete="email"
              className={inputClassName}
            />
          </div>

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <div className="mt-5 flex justify-end gap-2">
            <CommonButton 
              type="button"
              variant="gray"
              compact
              onClick={onClose}
            >
              Cancel
            </CommonButton>
            <CommonButton
              type="submit"
              variant="purple"
              compact
            >
              Save
            </CommonButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}
