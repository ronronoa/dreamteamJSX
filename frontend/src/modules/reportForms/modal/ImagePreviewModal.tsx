import { useEffect, useMemo, useState } from "react"
import { Maximize2, X } from "lucide-react"

import Modal from "../../../components/common/modals/Modal"
import CommonButton from "../../../components/common/widgets/CommonButton"

interface ImagePreviewModalProps {
  open: boolean
  onClose: () => void
  file: File | null
}

export default function ImagePreviewModal({
  open,
  onClose,
  file,
}: ImagePreviewModalProps) {
  const [isMaximized, setIsMaximized] = useState(false)

  const imageUrl = useMemo(() => {
    if (!file) return ""

    const objectUrl = URL.createObjectURL(file)

    return objectUrl
  }, [file])

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [imageUrl])

  const handleClose = () => {
    setIsMaximized(false)
    onClose()
  }

useEffect(() => {
  if (!open || !isMaximized) return

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsMaximized(false)
    }
  }

  window.addEventListener("keydown", handleKeyDown)

  return () => {
    window.removeEventListener("keydown", handleKeyDown)
  }
}, [open, isMaximized])

  if (!file || !imageUrl) return null

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className="max-w-2xl bg-white"
      >
        <div className="flex flex-row items-center justify-between">
          <h2 className="truncate text-lg font-bold text-slate-900">
            {file.name}
          </h2>

          <CommonButton
            onClick={handleClose}
            variant="none"
            className="m-0! bg-white/20 p-2! hover:bg-black/5"
          >
            <X size={15} />
          </CommonButton>
        </div>

        <button
          type="button"
          onClick={() => setIsMaximized(true)}
          className="group relative mt-4 block w-full"
          aria-label="Maximize image"
        >
          <img
            src={imageUrl}
            alt={file.name}
            className="max-h-[70vh] w-full rounded-md object-contain"
          />

          <span className="absolute right-2 top-2 rounded-md bg-black/50 p-1.5 text-white opacity-0 transition group-hover:opacity-100">
            <Maximize2 size={16} />
          </span>
        </button>

        <div className="mt-6 flex justify-end">
          <CommonButton variant="gray" type="button" onClick={handleClose}>
            Close
          </CommonButton>
        </div>
      </Modal>

      {open && isMaximized && (
        <div 
          onClick={() => setIsMaximized(false)}
          className="fixed inset-4 z-50 flex flex-col rounded-md bg-black/90">
          <div className="flex items-center justify-between p-3">
            <span className="truncate text-sm font-medium text-white">
              {file.name}
            </span>

            <CommonButton
              onClick={() => setIsMaximized(false)}
              variant="none"
              className="m-0! bg-white/10 p-2! text-white hover:bg-white/20"
            >
              <X size={18} />
            </CommonButton>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-auto p-4">
            <img
              src={imageUrl}
              alt={file.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
