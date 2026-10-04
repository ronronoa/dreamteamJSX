import StatCard, { type StatCardProps } from "../component/StatCard";
import type { ActivityLog } from "@/types/activityLogs";
import TwoLineCell from "../component/TwoLineCell";


import {
  Pencil
} from "lucide-react";

import DataTable from "@/components/common/DataTable";
import TableStatus from "../component/TableStatus";
import CommonButton from "@/components/common/widgets/CommonButton";
import DateCell from "../component/DateCell";


const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const activityStatusVariant: Record<
  "Success" | "Failed" | "Warning",
  "success" | "failed" | "warning"
> = {
  Success: "success",
  Failed: "failed",
  Warning: "warning",
};

// ── Data (placeholder) ────────────────────────────────────

const stats: StatCardProps[] = [
  {
    label: "Total Activities",
    value: "1,248",
    sub: "All recorded system actions",
  },
  {
    label: "Today's Activities",
    value: "36",
    sub: DATE_FMT.format(new Date()),
  },
  {
    label: "Active Users",
    value: "12",
    sub: "Accounts active today"
  },
  {
    label: "Security / Impotant Actions",
    value: "8",
    sub: "Privileged actions today"
  },
];


const approvedLogs: ActivityLog[] = [
  {
    id: "ACT-001248",
    date: new Date("2026-10-03T02:15:00"),
    user: "Department Head",
    userId: "USR-008",
    role: "Adminstrator",
    module: "Reports",
    action: "Generated PDF",
    recordId: "OP-067",
    status: "Success",
  },
  {
    id: "ACT-001247",
    date: new Date("2026-10-03T02:15:00"),
    user: "Department Head",
    userId: "USR-008",
    role: "Adminstrator",
    module: "Reports",
    action: "Generated PDF",
    recordId: "OP-067",
    status: "Success",
  },
  {
    id: "ACT-001246",
    date: new Date("2026-10-03T02:15:00"),
    user: "Department Head",
    userId: "USR-008",
    role: "Adminstrator",
    module: "Reports",
    action: "Generated PDF",
    recordId: "OP-067",
    status: "Success",
  },
];

// ── Page ──────────────────────────────────────────────────

export default function ActivityLogs() {

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
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-gray-900">
              Audit Ledger
            </h2>
            <span className="text-xs text-gray-600/60">
              Latest activity first
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CommonButton compact variant="gray">
              Archive Activity Logs
            </CommonButton>
            <CommonButton compact>
              Export Audit Log
            </CommonButton>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <DataTable
            onRowDoubleClick={() => console.log("double click")}
            rows={approvedLogs}
            rowKey={(r) => r.id}
            columns={[
              { label: "ID", accessor: "id"},
              { label: "Date", render: (r) => <DateCell date={r.date} /> },
              { label: "User", render: (r) => <TwoLineCell top={r.user} bottom={r.userId}/> },
              { label: "Role", accessor: "role" },
              { label: "Actions", accessor: "action" },
              { label: "Record ID", accessor: "recordId" },
{
  label: "Status",
  render: (r) => <TableStatus variant={activityStatusVariant[r.status]} />,
},
              { label: "Details", align: "center", render: () => (
                <button
                  type="button"
                  aria-label="Open record"
                  className="text-gray-400 hover:text-gray-700"
                >
                  <Pencil size={16} className="text-purple-700"/>
                </button>
              )},
            ]}
          />

          {/* Pagination */}
          <div className="flex items-center justify-center border-t border-gray-100 px-4 py-3">
            <div className="flex items-center gap-1">
              <button className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="rounded-md bg-[#5b21b6] px-3 py-1.5 text-[11px] font-semibold text-white">
                1
              </button>
              <button className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50">
                2
              </button>
              <button className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
