import { PackagePlus, Trash } from "lucide-react"

import CommonButton from "../../../components/common/widgets/CommonButton"
import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonFormSection from "./CommonFormSection"

type InventoryItem = {
  id: string
  itemName: string
  quantity: string
}

type InventorySectionProps<T extends InventoryItem> = {
  inventory: T[]
  onInventoryChange: (inventory: T[]) => void
  createEmptyItem: () => T
}

export default function InventorySection<T extends InventoryItem>({
  inventory,
  onInventoryChange,
  createEmptyItem,
}: InventorySectionProps<T>) {
  const updateItem = (id: string, patch: Partial<InventoryItem>) => {
    onInventoryChange(inventory.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  const removeItem = (id: string) => {
    onInventoryChange(inventory.filter((item) => item.id !== id))
  }

  return (
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
                onChange={(event) => updateItem(item.id, { itemName: event.target.value })}
              />
              <CommonInput
                variant="compact"
                className="text-right"
                placeholder="Quantity & Type"
                value={item.quantity}
                onChange={(event) => updateItem(item.id, { quantity: event.target.value })}
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
          onClick={() => onInventoryChange([...inventory, createEmptyItem()])}
        >
          Add Item
          <PackagePlus size={18} />
        </CommonButton>
      </div>
    </CommonFormSection>
  )
}
