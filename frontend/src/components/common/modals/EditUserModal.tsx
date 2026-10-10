import { useState } from "react";
import { Pencil, X } from "lucide-react";

import Modal from "./Modal";
import CommonButton from "../widgets/CommonButton";
import CommonInput from "../widgets/CommonInput";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate?: (user: {
    fullName: string;
    role: string;
    mobile: string;
    status: string;
  }) => void;
}

export default function EditUserModal({
  open,
  onClose,
  onUpdate,
}: EditUserModalProps) {
  const [fullName, setFullName] = useState("Maria Santos");
  const [role, setRole] = useState("Administrator");
  const [mobile, setMobile] = useState("0917 555 0184");
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onUpdate?.({
      fullName,
      role,
      mobile,
      status,
    });
  };

  const inputClassName =
    "!h-10 !rounded-lg !border !border-black !bg-white !py-2 " +
    "!pl-3 !pr-10 !text-[13px] !font-semibold !text-slate-900 " +
    "focus:!border-purple-600 focus:!ring-0";


  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="w-full bg-white">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
              <Pencil
                size={17}
                strokeWidth={2.5}
                className="text-purple-700"
              />
            </div>

            <h2 className="text-sm font-bold text-slate-900">
              Edit user
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-500 transition-colors hover:text-slate-900"
          >
            <X size={17} strokeWidth={2.5} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
            <CommonInput
              id="edit-full-name"
              label="Full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              variant="default"
              className={inputClassName}
            />

            <CommonInput
              id="edit-role"
              label="Role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              variant="default"
              className={inputClassName}
            />

            <CommonInput
              id="edit-mobile"
              label="Mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              variant="default"
              className={inputClassName}
            />

            <CommonInput
              id="edit-status"
              label="Account status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              variant="default"
              className={inputClassName}
            />
          </div>

          {/* Footer */}
          <div className="mt-5 flex justify-end">
            <CommonButton
              type="submit"
              variant="purple"
              className="!rounded-lg !px-4 !py-2 !text-xs !font-semibold"
            >
              Update user
            </CommonButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}
