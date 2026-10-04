import StatCard, { type StatCardProps } from "../component/StatCard";

import {
  ChevronRight,
  Filter,
  RotateCcw,
} from "lucide-react";

import DataTable from "@/components/common/DataTable";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";
import DateCell from "../component/DateCell";
import type { ArchiveRecord } from "@/types/archive";

// ── Data (placeholder) ────────────────────────────────────

const stats: StatCardProps[] = [
  {
    label: "Archived records",
    value: "37",
    sub: "Total archived entries",
    variant: "primary" as const,
  },
  {
    label: "Operation Log",
    value: "19",
    sub: "Archived operations",
  },
  {
    label: "Patient Log",
    value: "13",
    sub: "Archived patients",
  },
  {
    label: "Vehicle Log",
    value: "5",
    sub: "Archived vehicles",
  },
];


const approvedLogs: ArchiveRecord[] = [
  {
    id: "DSP-014",
    archivedDate: new Date("2026-09-08"),
    type: "Operation Log",
    archivedBy: "L. Ramirez",
    record: "Flood Response",
  },
  {
    id: "DSP-015",
    archivedDate: new Date("2026-09-08"),
    type: "Patient Log",
    archivedBy: "R. Cruz",
    record: "M. Santos - Minor Injury Case",
  },
  {
    id: "DSP-016",
    archivedDate: new Date("2026-09-08"),
    type: "Vehicle Log",
    archivedBy: "Admin User",
    record: "Fire Response",
  },
];

// ── Page ──────────────────────────────────────────────────

export default function Archives() {
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
              Archived Records
            </h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              3 records
            </span>
          </div>

          <div className="flex items-center gap-2">
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
              { label: "Record ID", accessor: "id"},
              { label: "Archived Date", render: (r) => <DateCell date={r.archivedDate}/> },
              { label: "Type", accessor: "type" },
              { label: "Archived By", accessor: "archivedBy" },
              { label: "Record", accessor: "record" },
              { label: "actions", align: "center", render: () => (
                <div className="flex items-center justify-center gap-5">
                  <button
                    type="button"
                    aria-label="Open record"
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <RotateCcw size={16} className="text-blue-500" />
                  </button>
                  <button
                    type="button"
                    aria-label="Open record"
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
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
