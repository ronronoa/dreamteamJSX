import StatCard, { type StatCardProps } from "../component/StatCard";

import {
  ChevronRight,
  Filter,
} from "lucide-react";

import DataTable from "@/components/common/DataTable";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";
import TableStatus from "../component/TableStatus";
import CommonButton from "@/components/common/widgets/CommonButton";
import InventoryItemCell from "../component/InventoryItemCell";
import type { InventoryItem } from "@/types/inventory";

// ── Data (placeholder) ────────────────────────────────────

const stats: StatCardProps[] = [
  {
    label: "Total registered items",
    value: "32",
    sub: "Across 4 supply categories",
    variant: "primary" as const,
  },
  {
    label: "Low stock alerts",
    value: "1",
    sub: "Action needed today",
  },
  {
    label: "Stock health",
    value: "83%",
    sub: "5 of 6 items above minimum",
  },
  {
    label: "Next expiry review",
    value: "14",
    unit: "days",
    sub: "First Aid Kit supplies due 08 Sep",
  },
];


const approvedLogs:InventoryItem[] = [
  {
    id: "INV-001",
    item: "First Aid Kit",
    category: "Medical",
    quantity: 14,
    unit: "kits",
    minimum: 5,
    expiry: new Date("2026-09-08"),
    status: "Available",
  },
  {
    id: "INV-002",
    item: "Bandage Roll",
    category: "Medical",
    quantity: 20,
    unit: "rolls",
    minimum: 5,
    expiry: new Date("2026-09-08"),
    status: "Available",
  },
  {
    id: "INV-003",
    item: "N95 Masks",
    category: "PPE",
    quantity: 12,
    unit: "boxes",
    minimum: 5,
    expiry: new Date("2027-09-08"),
    status: "Low stock",
  },
];

// ── Page ──────────────────────────────────────────────────

export default function Inventory() {
  return (
    <div className="space-y-7">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>


      {/* Approved logs */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">
              Supply register
            </h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              32 items
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CommonButton compact>
              + Add item
            </CommonButton>
            <TableSearch />
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
            rows={approvedLogs}
            rowKey={(r) => r.id}
            columns={[
              { label: "ID", accessor: "id"},
              { label: "Item", accessor: "item" },
              { label: "Category", accessor: "category" },
              { label: "Quantity", render: (r) => `${r.quantity} ${r.unit}` },
              { label: "Minimum", render: (r) => `${r.minimum} ${r.unit}` },
              { label: "Expiry / Check", render: (r) => <InventoryItemCell expiry={r.expiry} now={Date.now()} /> },
              { label: "Status", render: (r) => (
                <TableStatus
                  variant={
                    r.status === "Low stock" ? "lowStock" :
                      r.status === "Expired"   ? "expired"  :
                        "available"
                  }
                />
              )},
              { label: "", align: "right", render: () => (
                <button
                  type="button"
                  aria-label="Open record"
                  className="text-gray-400 hover:text-gray-700"
                >
                  <ChevronRight size={16} />
                </button>
              )},
            ]}
          />

          {/* Pagination */}
          <div className="flex items-center justify-center border-t border-gray-100 px-4 py-3">
            <TablePagination />

          </div>
        </div>
      </section>
    </div>
  );
}
