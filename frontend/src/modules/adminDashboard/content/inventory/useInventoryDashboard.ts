import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchInventory, createInventoryItem, updateInventoryItem, type InventoryOverview } from "@/api/inventory";
import { useAuth } from "@/store/useAuth";
import type { InventoryItem } from "@/types/inventory";
import type { AddInventoryFormValues } from "@/components/common/modals/AddInventoryModal";
import type { StatCardProps } from "../../component/StatCard";
import { formatDate } from "@/utils/dateTime";
import { getPageCount } from "@/utils/pagination";
import { EMPTY_OVERVIEW, getExpirySummary, PAGE_SIZE } from "./inventoryConfig";

export function useInventoryDashboard() {
  const { session } = useAuth();
  const accessToken = session?.accessToken;
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [overview, setOverview] = useState<InventoryOverview>(EMPTY_OVERVIEW);
  const [nextItemCode, setNextItemCode] = useState("INV-001");
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [modalError, setModalError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [addInventoryModalOpen, setAddInventoryModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const loadInventory = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setPageError("");
    try {
      const result = await fetchInventory(accessToken);
      setItems(result.items);
      setOverview(result.stats);
      setNextItemCode(result.nextItemCode);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Could not load inventory.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      await loadInventory();
    })();
  }, [loadInventory]);

  useEffect(() => {
    function refreshOnFocus() {
      void loadInventory();
    }
    window.addEventListener("focus", refreshOnFocus);
    return () => window.removeEventListener("focus", refreshOnFocus);
  }, [loadInventory]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return items;
    return items.filter((item) => [item.id, item.item, item.category, item.unit]
      .some((value) => value.toLowerCase().includes(normalizedSearch)));
  }, [items, search]);

  const pageCount = getPageCount(filteredItems.length, PAGE_SIZE);
  const currentPage = Math.min(page, pageCount);
  const pageItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const stats: StatCardProps[] = [
    { label: "Total registered items", value: String(overview.totalCount), sub: `Across ${overview.categoryCount} supply categories`, variant: "primary" },
    { label: "Low stock alerts", value: String(overview.lowStockCount), sub: overview.lowStockCount === 0 ? "All items meet minimum stock" : "Action needed today" },
    { label: "Stock health", value: `${overview.stockHealthPercent}%`, sub: `${overview.aboveMinimumCount} of ${overview.totalCount} items above minimum` },
    { label: "Next expiry review", ...getExpirySummary(overview), ...(overview.nextExpiry && { unit: "days" }) },
  ];

  async function handleCreateItem(values: AddInventoryFormValues) {
    if (!accessToken) {
      setModalError("Your session expired. Please sign in again.");
      return false;
    }
    setModalError("");
    try {
      if (editingItem) {
        await updateInventoryItem(accessToken, editingItem.itemId, {
          itemName: values.name,
          category: values.category,
          unit: values.unit,
          minimumQuantity: values.minThreshold,
          expiryDate: values.expiryDate || null,
          ...(values.quantity !== editingItem.quantity && {
            stockQuantity: values.quantity,
            adjustmentReason: values.adjustmentReason,
          }),
        });
      } else {
        await createInventoryItem(accessToken, {
          itemName: values.name,
          category: values.category,
          unit: values.unit,
          stockQuantity: values.quantity,
          minimumQuantity: values.minThreshold,
          expiryDate: values.expiryDate || null,
        });
      }
      await loadInventory();
      setAddInventoryModalOpen(false);
      setEditingItem(null);
      return true;
    } catch (error) {
      setModalError(error instanceof Error ? error.message : "Could not save this inventory item.");
      return false;
    }
  }

  function openAddInventoryModal() {
    setModalError("");
    setEditingItem(null);
    setAddInventoryModalOpen(true);
  }

  function openEditInventoryModal(item: InventoryItem) {
    setModalError("");
    setEditingItem(item);
    setAddInventoryModalOpen(true);
  }

  function closeInventoryModal() {
    setAddInventoryModalOpen(false);
    setEditingItem(null);
    setModalError("");
  }

  const getInitialValues = () => editingItem ? {
    itemId: editingItem.id,
    name: editingItem.item,
    category: editingItem.category,
    unit: editingItem.unit,
    quantity: editingItem.quantity,
    minThreshold: editingItem.minimum,
    expiryDate: editingItem.expiry ? formatDate(editingItem.expiry, "YYYY-MM-DD") : "",
    adjustmentReason: "",
  } : undefined;

  return {
    items, loading, loadInventory, pageError, modalError, search, setSearch, page, setPage,
    addInventoryModalOpen, editingItem, nextItemCode, filteredItems, pageCount,
    currentPage, pageItems, stats, handleCreateItem, openAddInventoryModal,
    openEditInventoryModal, closeInventoryModal, getInitialValues,
  };
}
