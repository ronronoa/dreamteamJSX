import CommonFormSection from "../component/CommonFormSection"
import OperationInventorySection from "../component/OperationInventorySection"

import type { InventoryItem, WaiverForm } from "@/types/patientLog"
import ImageUpload, { addImageFiles, useImageDrag } from "../component/ImageUpload"
import ReportAutocompleteTextarea from "../component/ReportAutocompleteTextarea"

type PatientStep3Props = {
  waiverForm: WaiverForm
  onWaiverFormChange: (patch: Partial<WaiverForm>) => void
  inventory: InventoryItem[]
  onInventoryChange: (inventory: InventoryItem[]) => void
  errors: Record<string, string>
}

export default function PatientStep3({
  waiverForm,
  onWaiverFormChange,
  inventory,
  onInventoryChange,
  errors,
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
          <div className="mb-5">
            <label className="mb-1 flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-medium text-slate-900">
              <span>Description</span>
            </label>

            <ReportAutocompleteTextarea
              formType="patients"
              suggestionField="waiverForm.description"
              variant="compact"
              rows={6}
              maxLength={10000}
              placeholder="Add details about the waiver form"
              value={waiverForm.description}
              onChange={(e) => onWaiverFormChange({ description: e.target.value })}
            />
          </div>

          <ImageUpload
            images={waiverForm.images}
            onImagesChange={(images) => onWaiverFormChange({ images })}
            isDragging={isDragging}
          />
        </div>
      </CommonFormSection>

      <OperationInventorySection
        inventory={inventory}
        onInventoryChange={onInventoryChange}
        errors={errors}
      />
    </div>
  )
}
