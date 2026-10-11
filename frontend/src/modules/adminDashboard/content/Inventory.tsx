import { useCallback, useEffect, useMemo, useState } from "react";
import { Filter, Pencil } from "lucide-react";
import { fetchInventory, createInventoryItem, updateInventoryItem, type InventoryOverview } from "@/api/inventory";
import { useAuth } from "@/context/AuthContext";
import DataTable from "@/components/common/DataTable";
import CommonButton from "@/components/common/widgets/CommonButton";
import AddInventoryModal, { type AddInventoryFormValues } from "@/components/common/modals/AddInventoryModal";
import type { InventoryItem } from "@/types/inventory";
import InventoryItemCell from "../component/InventoryItemCell";
import StatCard, { type StatCardProps } from "../component/StatCard";
import TablePagination from "../component/TablePagination";
import TableSearch from "../component/TableSearch";
import TableStatus from "../component/TableStatus";

const ITEMS_PER_PAGE = 10;
const EMPTY_OVERVIEW: InventoryOverview = {
  totalCount: 0,
  categoryCount: 0,
  lowStockCount: 0,
  stockHealthPercent: 0,
  aboveMinimumCount: 0,
  nextExpiry: null,
  nextExpiryItemName: null,
};

const EXPIRY_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function getExpirySummary(overview: InventoryOverview) {
  if (!overview.nextExpiry) {
    return { value: "—", sub: "No expiry dates recorded" };
  }

  const daysUntilExpiry = Math.ceil((overview.nextExpiry.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
  return {
    value: String(daysUntilExpiry),
    sub: `${overview.nextExpiryItemName ?? "Inventory item"} due ${EXPIRY_DATE_FORMAT.format(overview.nextExpiry)}`,
  };
}

export default function Inventory() {
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

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return items;

    return items.filter((item) => [item.id, item.item, item.category, item.unit]
      .some((value) => value.toLowerCase().includes(normalizedSearch)));
  }, [items, search]);

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const stats: StatCardProps[] = [
    {
      label: "Total registered items",
      value: String(overview.totalCount),
      sub: `Across ${overview.categoryCount} supply categories`,
      variant: "primary",
    },
    {
      label: "Low stock alerts",
      value: String(overview.lowStockCount),
      sub: overview.lowStockCount === 0 ? "All items meet minimum stock" : "Action needed today",
    },
    {
      label: "Stock health",
      value: `${overview.stockHealthPercent}%`,
      sub: `${overview.aboveMinimumCount} of ${overview.totalCount} items above minimum`,
    },
    {
      label: "Next expiry review",
      ...getExpirySummary(overview),
      ...(overview.nextExpiry && { unit: "days" }),
    },
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
          unit: values.unit ?? "units",
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

  return (
    <>
      <AddInventoryModal
        open={addInventoryModalOpen}
        itemId={editingItem?.id ?? nextItemCode}
        mode={editingItem ? "edit" : "add"}
        initialValues={editingItem ? {
          itemId: editingItem.id,
          name: editingItem.item,
          category: editingItem.category,
          unit: editingItem.unit,
          quantity: editingItem.quantity,
          minThreshold: editingItem.minimum,
          expiryDate: editingItem.expiry ? editingItem.expiry.toISOString().slice(0, 10) : "",
        } : undefined}
        onClose={closeInventoryModal}
        onSubmit={handleCreateItem}
        error={modalError}
      />
      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>

        {pageError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{pageError}</p>}

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">Supply register</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">{filteredItems.length} items</span>
            </div>

            <div className="flex items-center gap-2">
              <CommonButton onClick={openAddInventoryModal} compact>+ Add item</CommonButton>
              <TableSearch
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setPage(1);
                }}
                placeholder="Search inventory"
                ariaLabel="Search inventory"
              />
              <button
                type="button"
                aria-label="Filter"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              >
                <Filter size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <DataTable
              rows={pageItems}
              loading={loading}
              rowKey={(row) => row.id}
              emptyMessage={search ? "No inventory items match your search." : "No inventory items registered yet."}
              columns={[
                { label: "ID", accessor: "id" },
                { label: "Item", accessor: "item" },
                { label: "Category", accessor: "category" },
                { label: "Quantity", render: (row) => `${row.quantity} ${row.unit}` },
                { label: "Minimum", render: (row) => `${row.minimum} ${row.unit}` },
                { label: "Expiry / Check", render: (row) => <InventoryItemCell expiry={row.expiry} now={Date.now()} /> },
                {
                  label: "Status",
                  render: (row) => (
                    <TableStatus variant={row.status === "Low stock" ? "lowStock" : row.status === "Expired" ? "expired" : "available"} />
                  ),
                },
                {
                  label: "",
                  align: "right",
                  render: (row) => (
                    <button
                      type="button"
                      aria-label={`Edit ${row.item}`}
                      title={`Edit ${row.item}`}
                      onClick={() => openEditInventoryModal(row)}
                      className="text-gray-400 hover:text-purple-700"
                    >
                      <Pencil size={15} />
                    </button>
                  ),
                },
              ]}
            />

            <div className="flex items-center justify-center border-t border-gray-100 px-4 py-3">
              <TablePagination currentPage={currentPage} pageCount={pageCount} onPageChange={setPage} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
