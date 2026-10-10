import StatCard, { type StatCardProps } from "../component/StatCard";
import TwoLineCell from "../component/TwoLineCell";


import {
  Filter,
  Pencil,
} from "lucide-react";

import DataTable from "@/components/common/DataTable";
import TableSearch from "../component/TableSearch";
import TablePagination from "../component/TablePagination";
import TableStatus from "../component/TableStatus";
import CommonButton from "@/components/common/widgets/CommonButton";
import type { ManagedUser } from "@/types/auth";
import EditUserModal from "@/components/common/modals/EditUserModal";
import { useState } from "react";

// ── Data (placeholder) ────────────────────────────────────

const stats: StatCardProps[] = [
  {
    label: "Total Accounts",
    value: "24",
    sub: "Emergency portal users",
    variant: "primary" as const,
  },
  {
    label: "Admins",
    value: "3",
    sub: "Privileged access holders",
  },
];


const approvedLogs: ManagedUser[] = [
  {
    id: "USR-001",
    accountHolder: "Maria Santos",
    info: "Operation Lead",
    role: "Administrator",
    team: "Alpha",
    contact: "0917 555 0184",
    status: "Active",
  },
  {
    id: "USR-002",
    accountHolder: "Juan Dela Cruz",
    info: "Responder",
    role: "Administrator",
    team: "Alpha",
    contact: "0917 555 0184",
    status: "Active",
  },
  {
    id: "USR-003",
    accountHolder: "Ana Reyes",
    info: "Responder",
    role: "Team Leader",
    team: "Beta",
    contact: "0917 555 0184",
    status: "Inactive",
  },
];

// ── Page ──────────────────────────────────────────────────

export default function ManageUsers() {
  const [editOpen, setEditOpen] = useState(true);
  return (
    <>
      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdate={(user) => {
          console.log("Updated user:", user);
          setEditOpen(false);
        }}
      />
      <div className="space-y-7">

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>


        {/* Approved logs */}
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-gray-900">
                User accounts
              </h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                24
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CommonButton compact>
                + Add New User
              </CommonButton>
              <TableSearch />
              <button
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
                { label: "Account Holder", render: (r) => <TwoLineCell top={r.accountHolder} bottom={r.info}/> },
                { label: "Role", render: (r) => (
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold bg-blue-400/30 text-blue-600/60`}>
                    {r.role}
                  </span>
                ) },
                { label: "Team", accessor: "team" },
                { label: "Contact", accessor: "contact" },
                {
                  label: "Status",
                  render: (r) => (
                    <TableStatus variant={r.status === "Active" ? "active" : "inactive"} />
                  ),
                },
                { label: "Actions", align: "center", render: () => (
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
              <TablePagination />

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
