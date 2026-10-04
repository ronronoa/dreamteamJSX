interface TableSkeletonProps {
  rows?: number;
  columns: number;
}

export default function TableSkeleton({ rows = 5, columns }: TableSkeletonProps) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="border-b border-gray-100">
          {Array.from({ length: columns }).map((_, c) => (
            <td key={c} className="px-4 py-4">
              <div className="h-3 w-full max-w-32 animate-pulse rounded bg-gray-100" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
