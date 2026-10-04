import StatCard, { type StatCardProps } from "../component/StatCard";
import DateCell from "../component/DateCell";

import {
  Check,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

import DataTable from "@/components/common/DataTable";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";
import CommonButton from "@/components/common/widgets/CommonButton";
import type { PatientLogRecord, PendingPatientRecord } from "@/types/patientLog";

// ── Data (placeholder) ────────────────────────────────────

const stats: StatCardProps[] = [
  {
    label: "Total records",
    value: "44",
    sub: "All recorded patients",
    variant: "primary" as const,
  },
  {
    label: "New patient records",
    value: "5",
    sub: "↑ 5%  from last month",
    subTone: "up" as const,
  },
  {
    label: "Emergency response average time",
    value: "5:54",
    unit: "min",
    sub: "↓ 4 sec  vs last month",
    subTone: "down" as const,
  },
  {
    label: "Most common age",
    value: "20-26",
    unit: "yrs",
    sub: "Range recorded",
  },
  {
    label: "Most common type of request",
    value: "Inter-Facility Transfer",
    sub: "For this month",
  },
];

const pendingRequests: PendingPatientRecord[] = [
  {
    id: "PT-045",
    date: new Date("2026-08-29T02:15:00"),
    nameOfPatient: "Carlos Mendoza",
    age: "57",
    address: "Phase 9-A Package 7 Block 32 Lot 13",
    assessment: "Chest pain",
    submittedBy: "Juan Dela Cruz",
  },
];

const approvedLogs: PatientLogRecord[] = [
  {
    id: "PT-043",
    date: new Date("2026-08-29T02:15:00"),
    time: "03:42 PM",
    nameOfPatient: "Bianca Del Rio",
    age: "28",
    address: "Phase 9-B Package 8 Block 12 Lot 3",
    assessment: "Chest pain",
    submittedBy: "Juan Dela Cruz",
  },
  {
    id: "PT-044",
    date: new Date("2026-08-29T02:15:00"),
    time: "03:42 PM",
    nameOfPatient: "Bianca Del Rio",
    age: "28",
    address: "Phase 9-B Package 8 Block 12 Lot 3",
    assessment: "Chest pain",
    submittedBy: "Juan Dela Cruz",
  },
];

// ── Page ──────────────────────────────────────────────────

export default function Patients() {
  return (
    <div className="space-y-7">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Pending approval */}
      <section>
        <div className="mb-3 flex items-center gap-3">
          <h2 className="text-sm font-bold text-gray-900">
            Pending Approval Requests
          </h2>
          <span className="rounded-full bg-pink-100 px-2.5 py-0.5 text-[10px] font-semibold text-pink-700">
            1 request
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <DataTable
            rows={pendingRequests}
            rowKey={(r) => r.id}
            columns={[
              { label: "Patient ID", accessor: "id"},
              { label: "Date", render: (r) => <DateCell date={r.date} /> },
              { label: "Name Of Patient", accessor: "nameOfPatient" },
              { label: "Age", accessor: "age" },
              { label: "Address", accessor: "address" },
              { label: "Assessment", accessor: "assessment" },
              { label: "Submitted By", accessor: "submittedBy" },
              {
                label: "Actions",
                align: "right",
                render: () => (
                  <div className="flex items-center justify-end gap-5">
                    <button onClick={() => {}} className="text-gray-400 hover:text-gray-700">
                      <ChevronRight size={16} />
                    </button>
                    <button onClick={() => {}} className="text-emerald-600 hover:text-emerald-700">
                      <Check size={16} strokeWidth={2.5} />
                    </button>
                    <button onClick={() => {}} className="text-red-500 hover:text-red-600">
                      <X size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Approved logs */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-gray-900">
              Approved Record Logs
            </h2>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              67 records
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
              { label: "Patient ID", accessor: "id"},
              { label: "Date", render: (r) => <DateCell date={r.date} /> },
              { label: "Name Of Patient", accessor: "nameOfPatient" },
              { label: "Age", accessor: "age" },
              { label: "Address", accessor: "address" },
              { label: "Assessment", accessor: "assessment" },
              { label: "Submitted By", accessor: "submittedBy" },
              {
                label: "Actions",
                align: "right",
                render: () => (
                  <div className="text-right">
                    <button
                      type="button"
                      aria-label="Open record"
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ),
              },
            ]}
          />

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <TablePagination />

            <div className="flex items-center gap-2">
              <CommonButton compact>
                Print PDF
              </CommonButton>
              <CommonButton compact variant="orange">
                Archive
              </CommonButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
