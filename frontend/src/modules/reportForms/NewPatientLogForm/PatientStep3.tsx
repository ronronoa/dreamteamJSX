import { Trash, PackagePlus } from "lucide-react"

import CommonButton from "../../../components/common/widgets/CommonButton"
import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonFormSection from "../component/CommonFormSection"

import type { InventoryItem, WaiverForm } from "@/types/patientLog"
import { createEmptyInventoryItem } from "@/types/patientLog"
import ImageUpload, { addImageFiles, useImageDrag } from "../component/ImageUpload"

type PatientStep3Props = {
  waiverForm: WaiverForm
  onWaiverFormChange: (patch: Partial<WaiverForm>) => void
  inventory: InventoryItem[]
  onInventoryChange: (inventory: InventoryItem[]) => void
}

export default function PatientStep3({
  waiverForm,
  onWaiverFormChange,
  inventory,
  onInventoryChange,
}: PatientStep3Props) {
  const { isDragging, handleDragOver, handleDragLeave, handleDrop } = useImageDrag()

  function handleFormDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()

    const imageFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    )
    if (imageFiles.length === 0) return

  const newImages = addImageFiles(waiverForm.images, imageFiles)
  onWaiverFormChange({ images: newImages })
  }

  const updateItem = (id: string, patch: Partial<InventoryItem>) => {
    onInventoryChange(inventory.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  const removeItem = (id: string) => {
    onInventoryChange(inventory.filter((item) => item.id !== id))
  }

  const addItem = () => {
    onInventoryChange([...inventory, createEmptyInventoryItem()])
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        handleDrop()
        handleFormDrop(e)
      }}
      className="flex w-full flex-col justify-between gap-4 lg:flex-row"
    >
      <CommonFormSection title="WAIVER FORM">
        <div className="flex h-full flex-col">
          <ImageUpload
  images={waiverForm.images}
  onImagesChange={(images) => onWaiverFormChange({ images })}
            isDragging={isDragging}
          />
        </div>
      </CommonFormSection>

      <CommonFormSection title="INVENTORY">
        <div className="flex h-full flex-col">
          <div className="mb-2 grid grid-cols-[1fr_140px_28px] gap-2">
            <span className="text-lg font-bold text-slate-900">Item Name</span>
            <span className="text-right text-lg font-bold text-slate-900">Quantity</span>
            <span />
          </div>

          <div className="flex-1 space-y-2">
            {inventory.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_140px_28px] items-center gap-2">
                <CommonInput
                  variant="compact"
                  value={item.itemName}
                  onChange={(e) => updateItem(item.id, { itemName: e.target.value })}
                />

                <CommonInput
                  variant="compact"
                  className="text-right"
                  placeholder="Quantity & Type"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: e.target.value })}
                />

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 transition hover:text-red-700"
                  aria-label={`Remove ${item.itemName || "item"}`}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>

          <CommonButton
            type="button"
            variant="orange"
            className="mt-4 flex w-full items-center justify-center gap-2"
            onClick={addItem}
          >
            Add Item
            <PackagePlus size={18} />
          </CommonButton>
        </div>
      </CommonFormSection>
    </div>
  )
}
