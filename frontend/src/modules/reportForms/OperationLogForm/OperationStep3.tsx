import CommonTextarea from "../../../components/common/widgets/CommonTextarea"
import CommonFormSection from "../component/CommonFormSection"
import InventorySection from "../component/InventorySection"

import type { InventoryItem, OperationDescription } from "../../../types/operationLog"
import { createEmptyInventoryItem } from "../../../types/operationLog"
import ImageUpload, { addImageFiles, useImageDrag } from "../component/ImageUpload"

type OperationStep3Props = {
  operationDescription: OperationDescription
  onOperationDescriptionChange: (patch: Partial<OperationDescription>) => void
  inventory: InventoryItem[]
  onInventoryChange: (inventory: InventoryItem[]) => void
}

export default function OperationStep3({
  operationDescription,
  onOperationDescriptionChange,
  inventory,
  onInventoryChange,
}: OperationStep3Props) {

  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useImageDrag()

  function handleFormDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()

    const imageFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    )

    if (imageFiles.length === 0) return

    const newImages = addImageFiles(
      operationDescription.images,
      imageFiles,
    )

    onOperationDescriptionChange({
      images: newImages,
    })
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
      <CommonFormSection title="OPERATION DESCRIPTION">
        <div className="flex h-full flex-col">
          <div className="mb-5">
            <label className="mb-1 block text-lg font-medium text-slate-900">Description</label>

            <CommonTextarea
              variant="compact"
              rows={6}
              placeholder="Provide a detailed description of the eve, actions taken, and current status"
              value={operationDescription.description}
              onChange={(e) => onOperationDescriptionChange({ description: e.target.value })}
            />
          </div>

          <ImageUpload
            images={operationDescription.images}
            onImagesChange={(images) =>
              onOperationDescriptionChange({ images })
            }
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
