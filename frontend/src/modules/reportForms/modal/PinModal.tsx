import { useState } from "react"
import Modal from "../../../components/common/modals/Modal"
import CommonButton from "../../../components/common/widgets/CommonButton"
import CommonInput from "../../../components/common/widgets/CommonInput"
import { Lock, X, KeyRound } from "lucide-react"

interface PinModalProps {
  title: string
  open: boolean
  onClose: () => void
  onSubmit: (pin: string) => void
  loading?: boolean
  error?: string
}

export default function PinModal({
  title = "Pin modal",
  open,
  onClose,
  onSubmit,
  loading = false,
  error,
}: PinModalProps) {
  const [pin, setPin] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pin.trim()) return
    onSubmit(pin)
  }

  const handleClose = () => {
    setPin("")
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex flex-row items-center justify-between">
        <p className="mb-1 text-xs font-bold tracking-widest text-orange-500">
          {title.toUpperCase()} —
        </p>

        <CommonButton
          onClick={handleClose}
          variant="none"
          className="p-2! m-2! bg-white/20 hover:bg-black/5"
        >
          <X size={15} />
        </CommonButton>
      </div>

      <h1 className="mb-6 text-3xl font-bold text-gray-900">Authenticate Report</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CommonInput
          id="pin"
          label="PIN"
          type="password"
          showPasswordToggle
          autoComplete="new-password"
          icon={<Lock size={18} />}
          required
          placeholder="Enter your PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          disabled={loading}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <CommonButton
          type="submit"
          variant="purple"
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2"
        >
          <span>
            <KeyRound className="-rotate-90 -scale-x-100" />
          </span>
          {loading ? "Verifying..." : "Confirm PIN"}
        </CommonButton>
      </form>
    </Modal>
  )
}
