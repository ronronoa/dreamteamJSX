import CommonFormSection from "../component/CommonFormSection"
import InventorySection from "../component/InventorySection"

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

      <InventorySection
        inventory={inventory}
        onInventoryChange={onInventoryChange}
        createEmptyItem={createEmptyInventoryItem}
      />
    </div>
  )
}
