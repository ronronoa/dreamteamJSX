interface TablePaginationProps {
  currentPage?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
}

export default function TablePagination({ currentPage, pageCount, onPageChange }: TablePaginationProps) {
  if (onPageChange && currentPage !== undefined && pageCount !== undefined) {
    const safePageCount = Math.max(1, pageCount);
    const pages = Array.from({ length: safePageCount }, (_, index) => index + 1);

    return (
      <nav aria-label="Table pagination" className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={currentPage === page ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={currentPage === page
              ? "rounded-md bg-[#5b21b6] px-3 py-1.5 text-[11px] font-semibold text-white"
              : "rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50"}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPage >= safePageCount}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    );
  }

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
