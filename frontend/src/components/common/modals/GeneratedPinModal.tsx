import Modal from "./Modal";
import CommonButton from "../widgets/CommonButton";

interface GeneratedPinModalProps {
  name: string;
  pin: string;
  onClose: () => void;
}

export default function GeneratedPinModal({ name, pin, onClose }: GeneratedPinModalProps) {
  return (
    <Modal open onClose={onClose} dismissable={false}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">User saved — report PIN</h2>
        <p className="text-sm text-gray-700">Give this PIN to {name} for submitting reports.</p>
        <div className="rounded-lg bg-purple-50 p-5 text-center">
          <p className="text-3xl font-bold tracking-widest text-purple-900" aria-label={`Report PIN: ${pin}`}>{pin}</p>
        </div>
        <p className="text-sm text-gray-700">You can view this PIN again from Edit user → View current PIN.</p>
        <div className="flex justify-end">
          <CommonButton onClick={onClose} compact>Done</CommonButton>
        </div>
      </div>
    </Modal>
  );
}
