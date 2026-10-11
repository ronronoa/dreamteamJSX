import { useEffect, useState } from "react";
import { Box, X, Lock, Plus, ChevronDown } from "lucide-react";
import Modal from "./Modal";
import CommonButton from "../widgets/CommonButton";
import CommonInput from "../widgets/CommonInput";

export interface AddInventoryFormValues {
  itemId: string;
  name: string;
  category: string;
  unit?: string;
  quantity: number;
  minThreshold: number;
  expiryDate: string;
  adjustmentReason: string;
}

export type InventoryFormMode = "add" | "edit";

interface AddInventoryModalProps {
  open: boolean;
  error: string;
  onClose: () => void;
  /** Auto-generated ID passed down from the parent. */
  itemId?: string;
  mode?: InventoryFormMode;
  initialValues?: AddInventoryFormValues;
  onSubmit?: (values: AddInventoryFormValues) => void | boolean | Promise<void | boolean>;
}

const CATEGORIES = [
  "Medical",
  "Supplies",
  "Equipment",
  "Pharmaceuticals",
  "Other",
];

export default function AddInventoryModal({
  open,
  error,
  onClose,
  itemId = "INV-010",
  mode = "add",
  initialValues,
  onSubmit,
}: AddInventoryModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Medical");
  const [quantity, setQuantity] = useState("");
  const [minThreshold, setMinThreshold] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(initialValues?.name ?? "");
    setCategory(initialValues?.category ?? "Medical");
    setQuantity(initialValues ? String(initialValues.quantity) : "");
    setMinThreshold(initialValues ? String(initialValues.minThreshold) : "");
    setExpiryDate(initialValues?.expiryDate ?? "");
    setAdjustmentReason("");
  }, [
    open,
    initialValues?.itemId,
    initialValues?.name,
    initialValues?.category,
    initialValues?.quantity,
    initialValues?.minThreshold,
    initialValues?.expiryDate,
  ]);

  function reset() {
    setName("");
    setCategory("Medical");
    setQuantity("");
    setMinThreshold("");
    setExpiryDate("");
    setAdjustmentReason("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const submitted = await onSubmit?.({
        itemId,
        name,
        category,
        quantity: Number(quantity) || 0,
        minThreshold: Number(minThreshold) || 0,
        expiryDate,
        adjustmentReason,
      });
      if (submitted === false) return;
      reset();
    } catch {
      // Keep the entered values available so the user can retry after an error.
    }
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="w-full bg-white">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
              <Box size={17} className="text-purple-700" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {mode === "edit" ? "Edit Item" : "Add New Item"}
              </h2>
              <p className="text-xs text-slate-600">
                {mode === "edit"
                  ? "Update this supply item's inventory details."
                  : "Register a new supply item to the emergency inventory."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="text-slate-500 hover:text-slate-900"
          >
            <X size={17} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item ID — disabled / auto-generated */}
          <div>
            <CommonInput
              id="item-id"
              label="Item ID"
              value={itemId}
              readOnly
              disabled
              icon={<Lock size={18} />}
            />
            <p className="mt-1 text-xs text-gray-500">
              Auto-generated. Cannot be modified.
            </p>
          </div>

          {/* Item Name */}
          <CommonInput
            id="item-name"
            label="Item Name *"
            placeholder="e.g. Surgical Gloves"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
          />

          {/* Category — native select styled to match CommonInput */}
          <div>
            <label
              htmlFor="item-category"
              className="mb-1.5 block text-sm font-semibold text-gray-800"
            >
              Category *
            </label>
            <div className="relative">
              <select
                id="item-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="
                  w-full cursor-pointer appearance-none rounded-xl
                  border-2 border-gray-400 bg-white px-4 py-3 pr-10
                  text-sm text-gray-800 shadow-sm outline-none
                  focus:border-purple-400 focus:ring-2 focus:ring-purple-400
                "
              >
                {mode === "edit" && !CATEGORIES.includes(category) && (
                  <option value={category}>{category}</option>
                )}
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* Quantity + Minimum Threshold */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="relative">
              <CommonInput
                id="item-quantity"
                label={mode === "edit" ? "Current Quantity" : "Quantity *"}
                type="number"
                min={0}
                max={1_000_000_000}
                step={1}
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <span className="pointer-events-none absolute bottom-4 right-4 text-sm text-gray-400">
                {initialValues?.unit ?? "units"}
              </span>
            </div>
            <CommonInput
              id="item-min-threshold"
              label="Minimum Threshold *"
              type="number"
              min={0}
              max={1_000_000_000}
              step={1}
              placeholder="0"
              value={minThreshold}
              onChange={(e) => setMinThreshold(e.target.value)}
              required
            />
          </div>
          {mode === "edit" && initialValues && Number(quantity) !== initialValues.quantity && (
            <CommonInput
              id="item-adjustment-reason"
              label="Reason for quantity change *"
              placeholder="Explain the stock correction"
              value={adjustmentReason}
              onChange={(event) => setAdjustmentReason(event.target.value)}
              required
              maxLength={250}
            />
          )}
          <p className="-mt-2 text-xs text-gray-500">
            Alert will trigger when stock falls below this level.
          </p>

          {/* Expiry Date — native date input ships its own calendar picker */}
          <CommonInput
            id="item-expiry"
            label="Expiry Date"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Footer */}
          <div className="mt-5 flex justify-between gap-2 border-t border-gray-100 pt-4">
            <CommonButton
              type="button"
              variant="gray"
              onClick={handleClose}
            >
              Cancel
            </CommonButton>
            <CommonButton type="submit" variant="purple">
              {mode === "edit" ? <Box size={16} /> : <Plus size={16} />}
              {mode === "edit" ? "Save Changes" : "Add Item"}
            </CommonButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}
