import { useEffect, useMemo, useState } from "react"
import { PackagePlus, Trash, X } from "lucide-react"

import {
  fetchLastReportFormInventorySelection,
  fetchReportFormInventory,
  type InventoryRecord,
  type LastReportFormInventorySelection,
} from "@/api/inventory"
import type { InventoryItem as OperationInventoryItem } from "@/types/operationLog"
import CommonButton from "../../../components/common/widgets/CommonButton"
import CommonInput from "../../../components/common/widgets/CommonInput"
import CommonSearchSelect from "../../../components/common/widgets/CommonSearchSelect"
import CommonFormSection from "./CommonFormSection"

type InventorySectionProps = {
  inventory: OperationInventoryItem[]
  onInventoryChange: (inventory: OperationInventoryItem[]) => void
  errors?: Record<string, string>
}

const LAST_INVENTORY_SELECTION_KEY = "reportForms.lastInventorySelection";

type LastInventorySelection = {
  inventoryItemId: string;
  quantity: string;
};

function getLastInventorySelection(): LastInventorySelection | null {
  try {
    const storedValue = localStorage.getItem(LAST_INVENTORY_SELECTION_KEY);
    if (!storedValue) return null;

    const selection: unknown = JSON.parse(storedValue);
    if (typeof selection !== "object" || selection === null) return null;

    const candidate = selection as Partial<LastInventorySelection>;
    if (typeof candidate.inventoryItemId !== "string" || typeof candidate.quantity !== "string") return null;
    return { inventoryItemId: candidate.inventoryItemId, quantity: candidate.quantity };
  } catch {
    return null;
  }
}

function saveLastInventorySelection(selection: LastInventorySelection) {
  try {
    localStorage.setItem(LAST_INVENTORY_SELECTION_KEY, JSON.stringify(selection));
  } catch {
    // Inventory entry should still succeed when browser storage is unavailable.
  }
}

export default function InventorySection({ inventory, onInventoryChange, errors = {} }: InventorySectionProps) {
  const [stockItems, setStockItems] = useState<InventoryRecord[]>([])
  const [databaseSelection, setDatabaseSelection] = useState<LastReportFormInventorySelection | null>(null)
  const [itemsLoading, setItemsLoading] = useState(true)
  const [itemsError, setItemsError] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedStockItemId, setSelectedStockItemId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [addError, setAddError] = useState("")
  useEffect(() => {
    let isCurrentRequest = true

    async function loadStockItems() {
      setItemsLoading(true)
      setItemsError("")
      try {
        const [items, recentSelection] = await Promise.all([
          fetchReportFormInventory(),
          fetchLastReportFormInventorySelection().catch(() => null),
        ])
        if (isCurrentRequest) setStockItems(items)
        if (isCurrentRequest) setDatabaseSelection(recentSelection)
      } catch (error) {
        if (isCurrentRequest) {
          setItemsError(error instanceof Error ? error.message : "Could not load inventory items.")
        }
      } finally {
        if (isCurrentRequest) setItemsLoading(false)
      }
    }

    void loadStockItems()
    return () => {
      isCurrentRequest = false
    }
  }, [])

  // const didAutoFillRef = useRef(false)

  // useEffect(() => {
  //   if (didAutoFillRef.current || itemsLoading) return
  //   if (inventory.length > 0) {
  //     didAutoFillRef.current = true
  //     return
  //   }
  //
  //   const localSelection = getLastInventorySelection()
  //   const localItem = localSelection
  //     ? stockItems.find((item) => item.itemId === localSelection.inventoryItemId && item.quantity > 0 && item.status !== "Expired")
  //     : undefined
  //   const savedSelection = localItem ? localSelection : databaseSelection
  //   const savedItem = savedSelection
  //     ? stockItems.find((item) => item.itemId === savedSelection.inventoryItemId && item.quantity > 0 && item.status !== "Expired")
  //     : undefined
  //
  //   if (!savedSelection || !savedItem) {
  //     didAutoFillRef.current = true
  //     return
  //   }
  //
  //   const requestedQuantity = Number(savedSelection.quantity)
  //   if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1 || requestedQuantity > savedItem.quantity) {
  //     didAutoFillRef.current = true
  //     return
  //   }
  //
  //   onInventoryChange([{
  //     id: crypto.randomUUID(),
  //     itemName: savedItem.item,
  //     quantity: savedItem.unit ? `${requestedQuantity} ${savedItem.unit}` : String(requestedQuantity),
  //     inventoryItemId: savedItem.itemId,
  //     unit: savedItem.unit,
  //   }])
  //   didAutoFillRef.current = true
  // }, [databaseSelection, inventory, itemsLoading, onInventoryChange, stockItems])

  const availableItems = useMemo(
    () => stockItems.filter((item) => item.quantity > 0 && item.status !== "Expired" && !inventory.some((entry) => entry.inventoryItemId === item.itemId)),
    [inventory, stockItems],
  )

  const selectedItem = availableItems.find((item) => item.itemId === selectedStockItemId)

  function openAddModal() {
    const localSelection = getLastInventorySelection()
    const localSelectionIsAvailable = localSelection && availableItems.some((item) => item.itemId === localSelection.inventoryItemId)
    const databaseSelectionIsAvailable = databaseSelection && availableItems.some((item) => item.itemId === databaseSelection.inventoryItemId)
    const lastSelection = localSelectionIsAvailable
      ? localSelection
      : databaseSelectionIsAvailable
        ? databaseSelection
        : null
    setSelectedStockItemId(lastSelection?.inventoryItemId ?? "")
    setQuantity(lastSelection?.quantity ?? "")
    setAddError("")
    setIsAddModalOpen(true)
  }

  function addInventoryItem() {
    const requestedQuantity = Number(quantity)
    if (!selectedItem) {
      setAddError("Select an inventory item.")
      return
    }
    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      setAddError("Enter a positive whole-number quantity.")
      return
    }
    if (requestedQuantity > selectedItem.quantity) {
      setAddError(`Only ${selectedItem.quantity} ${selectedItem.unit} available in inventory.`)
      return
    }

    const itemName = selectedItem.item
    const displayQuantity = selectedItem.unit
      ? `${requestedQuantity} ${selectedItem.unit}`
      : String(requestedQuantity)

    onInventoryChange([
      ...inventory,
      {
        id: crypto.randomUUID(),
        itemName,
        quantity: displayQuantity,
        inventoryItemId: selectedItem.itemId,
        unit: selectedItem.unit,
      },
    ])
    saveLastInventorySelection({
      inventoryItemId: selectedItem.itemId,
      quantity,
    })
    setIsAddModalOpen(false)
  }

  function removeItem(id: string) {
    onInventoryChange(inventory.filter((item) => item.id !== id))
  }

  return (
    <>
      <CommonFormSection title="INVENTORY">
        <div className="flex h-full flex-col">
          <div className="mb-2 grid grid-cols-[1fr_140px_28px] gap-2">
            <span className="flex flex-wrap items-baseline justify-between gap-x-2 text-lg font-bold text-slate-900">
              Item
              {errors.inventory && <span role="alert" className="text-xs font-medium text-red-700">{errors.inventory}</span>}
            </span>
            <span className="text-lg font-bold text-slate-900">Quantity</span>
            <span />
          </div>

          {itemsError && <p role="alert" className="mb-2 text-sm text-red-700">{itemsError}</p>}
          <div className="flex-1 space-y-2">
            {inventory.map((item, index) => (
              <div key={item.id} className="grid grid-cols-[1fr_140px_28px] items-center gap-2">
                <p className="truncate text-sm text-slate-800" title={item.itemName}>{item.itemName}</p>
                <p className="text-right text-sm text-slate-800">
                  {item.quantity}
                  {errors[`inventory.${index}.quantity`] && <span role="alert" className="block text-xs text-red-700">{errors[`inventory.${index}.quantity`]}</span>}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 transition hover:text-red-700"
                  aria-label={`Remove ${item.itemName}`}
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
            onClick={openAddModal}
            disabled={itemsLoading || Boolean(itemsError) || availableItems.length === 0}
          >
            {itemsLoading ? "Loading inventory…" : "Add Item"}
            <PackagePlus size={18} />
          </CommonButton>
          {!itemsLoading && !itemsError && availableItems.length === 0 && (
            <p className="mt-2 text-center text-xs text-slate-500">No stock items are available to add.</p>
          )}
        </div>
      </CommonFormSection>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setIsAddModalOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="operation-inventory-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 id="operation-inventory-title" className="text-xl font-bold text-slate-900">Add inventory item</h2>
                <p className="mt-1 text-sm text-slate-600">Choose an item from the inventory list and enter the quantity used.</p>
              </div>
              <button type="button" onClick={() => setIsAddModalOpen(false)} aria-label="Close" className="text-slate-500 hover:text-slate-900">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <CommonSearchSelect
                id="operation-inventory-item"
                label="Inventory item"
                singleSelect
                placeholder="Search inventory…"
                options={availableItems.map((item) => ({
                  value: item.itemId,
                  label: `${item.item} (${item.quantity} ${item.unit} available)`,
                }))}
                value={selectedStockItemId ? [selectedStockItemId] : []}
                onChange={(values) => {
                  setSelectedStockItemId(values[0] ?? "")
                  setQuantity("")
                  setAddError("")
                }}
              />

              {selectedItem && (
                <p className="text-sm text-slate-600">Available: {selectedItem.quantity} {selectedItem.unit}</p>
              )}

              <CommonInput
                id="operation-inventory-quantity"
                label="Quantity used"
                type="number"
                min={1}
                max={selectedItem?.quantity}
                step={1}
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value)
                  setAddError("")
                }}
                disabled={!selectedItem}
              />

              {addError && <p role="alert" className="text-sm text-red-700">{addError}</p>}

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <CommonButton type="button" variant="gray" onClick={() => setIsAddModalOpen(false)}>Cancel</CommonButton>
                <CommonButton type="button" variant="purple" onClick={addInventoryItem}>Add item</CommonButton>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
