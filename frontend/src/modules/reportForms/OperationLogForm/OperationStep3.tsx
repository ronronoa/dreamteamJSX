import { useRef, useState } from "react"
import { Trash, Upload, PackagePlus } from "lucide-react"

import CommonButton from "../../../components/common/widgets/CommonButton"
import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonTextarea from "../../../components/common/widgets/CommonTextarea"
import CommonFormSection from "../CommonFormSection"
import ImagePreviewModal from "./ImagePreviewModal"

import type { InventoryItem, OperationDescription } from "../../../types/operationLog"
import { createEmptyInventoryItem } from "../../../types/operationLog"

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return

    const newFiles = Array.from(fileList)
    onOperationDescriptionChange({ images: [...operationDescription.images, ...newFiles] })

    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeImage = (index: number) => {
    onOperationDescriptionChange({
      images: operationDescription.images.filter((_, i) => i !== index),
    })
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

  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const previewFile =
    previewIndex !== null
      ? operationDescription.images[previewIndex]
      : null

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
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

          <div className="mb-3 flex items-center justify-between">
            <label className="text-lg font-medium text-slate-900">Attach Image/s</label>

            <CommonButton
              type="button"
              variant="orange"
              className="flex items-center gap-2 w-70"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload
              <Upload size={18} />
            </CommonButton>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />
          </div>

          <div className="min-h-[150px] flex-1 rounded-md border border-gray-300 bg-gray-100">
            {operationDescription.images.map((file, index) => (
              <button
                onClick={() => setPreviewIndex(index)}
                key={`${file.name}-${index}`}
                className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm italic text-gray-700 transition hover:border-purple-400 hover:bg-gray-50"
              >
                <span className="truncate">{file.name}</span>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-red-500 transition  "
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash size={24} className="hover:fill-red-700"/>
                </button>
              </button>
            ))}
          </div>
        </div>
      </CommonFormSection>

      <CommonFormSection title="INVENTORY">
        <div className="flex h-full flex-col">
          <div className="mb-2 grid grid-cols-[1fr_140px_28px] gap-2">
            <span className="text-lg font-bold text-slate-900">Item Name</span>
            <span className="text-lg font-bold text-slate-900">Quantity</span>
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

      <ImagePreviewModal
        open={previewIndex !== null}
        onClose={() => setPreviewIndex(null)}
        file={previewFile}
      />
    </div>
  )
}
