export default function TablePagination() {
  return (
    <nav
      aria-label="Table pagination"
      className="flex items-center gap-1"
    >
      <button
        type="button"
        disabled
        className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <button
        type="button"
        aria-current="page"
        className="rounded-md bg-[#5b21b6] px-3 py-1.5 text-[11px] font-semibold text-white"
      >
        1
      </button>
      <button
        type="button"
        className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled
      >
        2
      </button>
      <button
        type="button"
        className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        disabled
      >
        Next
      </button>
    </nav>
  );
}
