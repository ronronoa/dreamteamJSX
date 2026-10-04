// src/components/common/DataTable.tsx
import type { ReactNode } from "react";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import TableSkeleton from "./TableSkeleton";

export interface Column<T> {
  label: string;
  /** Simple field access — use this when the cell is just data. */
  accessor?: keyof T;
  /** Custom cell — use this for dates, actions, status badges, anything JSX. */
  render?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

interface DataTableProps<T> {
  rows: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;

  onRowDoubleClick?: (row: T) => void;

  loading?: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
}


/**
 * replaces this
 * ```tsx
 *
<Table>
  <TableHeader className="bg-[#2d0a3f]">
    <TableRow className="border-0 hover:bg-[#2d0a3f]">
      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-white">
        ID
      </TableHead>
      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-white">
        Date
      </TableHead>
      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-white">
        Caller
      </TableHead>
      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-white">
        Incident
      </TableHead>
      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-white">
        Location
      </TableHead>
      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-white">
        Team
      </TableHead>
      <TableHead className="text-[10px] font-bold uppercase tracking-wider text-white">
        Submitted By
      </TableHead>
      <TableHead />
    </TableRow>
  </TableHeader>

  <TableBody>
    {approvedLogs.map((r) => (
      <TableRow key={r.id} className="border-gray-100">
        <TableCell className="text-xs font-semibold text-gray-900">
          {r.id}
        </TableCell>
        <TableCell>
          <DateCell date={r.date} time={r.time} />
        </TableCell>
        <TableCell className="text-xs text-gray-700">
          {r.caller}
        </TableCell>
        <TableCell className="text-xs text-gray-700">
          {r.incident}
        </TableCell>
        <TableCell className="text-xs text-gray-700">
          {r.location}
        </TableCell>
        <TableCell className="text-xs text-gray-700">
          {r.team}
        </TableCell>
        <TableCell className="text-xs font-semibold text-gray-900">
          {r.submittedBy}
        </TableCell>
        <TableCell className="text-right">
          <button
            type="button"
            aria-label="Open record"
            className="text-gray-400 hover:text-gray-700"
          >
            <ChevronRight size={16} />
          </button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```
for this:
```tsx
<DataTable
  onRowDoubleClick={() => console.log("double click")}
  rows={approvedLogs}
  rowKey={(r) => r.id}
  columns={[
    { label: "Patient ID", accessor: "id"},
    { label: "Date", render: (r) => <DateCell date={r.date} time={r.time} /> },
    { label: "Caller", accessor: "caller" },
    { label: "Incident", accessor: "incident" },
    { label: "Location", accessor: "location" },
    { label: "Team", accessor: "team" },
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
```
 **/
export default function DataTable<T>({
  rows,
  columns,
  rowKey,
  onRowDoubleClick,
  loading = false,
  skeletonRows = 5,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader className="bg-[#2d0a3f]">
        <TableRow className="border-0 hover:bg-[#2d0a3f]">
          {columns.map((col) => (
            <TableHead
              key={col.label}
              className={`text-[10px] font-bold uppercase tracking-wider text-white ${
                col.align === "right" ? "text-right" :
                col.align === "center" ? "text-center" :
                ""
                } ${col.className ?? ""}`}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableSkeleton rows={skeletonRows} columns={columns.length} />
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="py-10 text-center text-xs text-gray-400"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow
              key={rowKey(row)}
              className="border-gray-100"
              onDoubleClick={onRowDoubleClick ? () => onRowDoubleClick(row) : undefined}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.label}
                  className={`text-xs text-gray-700 ${
                    col.align === "right" ? "text-right" :
                    col.align === "center" ? "text-center" :
                    ""
                  } ${col.className ?? ""}`}
                >
                  {col.render
                    ? col.render(row)
                    : col.accessor
                      ? (row[col.accessor] as ReactNode)
                      : null}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
