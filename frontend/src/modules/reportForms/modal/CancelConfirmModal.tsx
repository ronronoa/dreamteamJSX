import Modal from "../../../components/common/modals/Modal"
import CommonButton from "../../../components/common/widgets/CommonButton"
import { X } from "lucide-react"

interface CancelConfirmModalProps {
  title?: string
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function CancelConfirmModal({
  title = "Confirm Cancel?",
  open,
  onClose,
  onConfirm,
}: CancelConfirmModalProps) {

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-row items-center justify-between">
        <p className="mb-1 text-xs font-bold tracking-widest text-orange-500">
          {title.toUpperCase()} —
        </p>

        <CommonButton
          onClick={onClose}
          variant="none"
          className="p-2! m-2! bg-white/20 hover:bg-black/5"
        >
          <X size={15} />
        </CommonButton>
      </div>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">Confirm Cancel?</h1>
      <p className="mb-2 text-gray-500">Are you sure you want to cancel? Any unsaved changes will be lost.</p>

      <div className="flex gap-2 justify-end">

        <CommonButton
          variant="gray"
          className="flex items-center justify-center gap-2 min-w-[130px]"
          onClick={onClose}
        >
          Stay
        </CommonButton>
        <CommonButton
          variant="purple"
          className="flex items-center justify-center gap-2 min-w-[130px]"
          onClick={onConfirm}
        >
          Leave
        </CommonButton>
      </div>

    </Modal>
  )
}
