import { Filter, Pencil } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import CommonButton from "@/components/common/widgets/CommonButton";
import AddInventoryModal from "@/components/common/modals/AddInventoryModal";
import InventoryItemCell from "../component/InventoryItemCell";
import StatCard from "../component/StatCard";
import TablePagination from "../component/TablePagination";
import TableSearch from "../component/TableSearch";
import TableStatus from "../component/TableStatus";
import { useInventoryDashboard } from "./inventory/useInventoryDashboard";

export default function Inventory() {
  const {
    loading, pageError, modalError, search, setSearch, setPage,
    addInventoryModalOpen, editingItem, nextItemCode, filteredItems, pageCount,
    currentPage, pageItems, stats, handleCreateItem, openAddInventoryModal,
    openEditInventoryModal, closeInventoryModal, getInitialValues,
  } = useInventoryDashboard();

  return (
    <>
      <AddInventoryModal
        open={addInventoryModalOpen}
        itemId={editingItem?.id ?? nextItemCode}
        mode={editingItem ? "edit" : "add"}
        initialValues={getInitialValues()}
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
