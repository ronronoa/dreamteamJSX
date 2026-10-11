import CommonTextarea from "../../../components/common/widgets/CommonTextarea"
import CommonFormSection from "../component/CommonFormSection"
import InventorySection from "../component/InventorySection"

import type { InventoryItem, OperationDescription } from "../../../types/operationLog"
import { createEmptyInventoryItem } from "../../../types/operationLog"
import ImageUpload from "../component/ImageUpload"
import FieldError from "../component/FieldError"
import type { FormErrors } from "./formValidation"

type OperationStep3Props = {
  operationDescription: OperationDescription
  onOperationDescriptionChange: (patch: Partial<OperationDescription>) => void
  inventory: InventoryItem[]
  onInventoryChange: (inventory: InventoryItem[]) => void
  errors: FormErrors
}

export default function OperationStep3({
  operationDescription,
  onOperationDescriptionChange,
  inventory,
  onInventoryChange,
  errors,
}: OperationStep3Props) {
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
            <FieldError message={errors["operationDescription.description"]} />
          </div>

          <ImageUpload
            images={operationDescription.images}
            onImagesChange={(images) =>
              onOperationDescriptionChange({ images })
            }
            error={errors["operationDescription.images"]}
          />
        </div>
      </CommonFormSection>

      <InventorySection
        inventory={inventory}
        onInventoryChange={onInventoryChange}
        createEmptyItem={createEmptyInventoryItem}
        errors={errors}
      />
    </div>
  )
}
