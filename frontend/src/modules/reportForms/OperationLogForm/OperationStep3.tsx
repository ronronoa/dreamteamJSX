import CommonFormSection from "../component/CommonFormSection"
import OperationInventorySection from "../component/OperationInventorySection"
import ReportAutocompleteTextarea from "../component/ReportAutocompleteTextarea"

import type { InventoryItem, OperationDescription } from "../../../types/operationLog"
import ImageUpload from "../component/ImageUpload"
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

            <ReportAutocompleteTextarea
              formType="operations"
              suggestionField="description"
              variant="compact"
              rows={6}
              placeholder="Provide a detailed description of the eve, actions taken, and current status"
              value={operationDescription.description}
              onChange={(e) => onOperationDescriptionChange({ description: e.target.value })}
              errorMessage={errors["operationDescription.description"]}
            />
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

      <OperationInventorySection
        inventory={inventory}
        onInventoryChange={onInventoryChange}
        errors={errors}
      />
    </div>
  )
}
