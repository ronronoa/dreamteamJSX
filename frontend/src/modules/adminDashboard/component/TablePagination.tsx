interface TablePaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGE_NUMBERS = 20;

export default function TablePagination({ currentPage, pageCount, onPageChange }: TablePaginationProps) {
  const safePageCount = Math.max(1, pageCount);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safePageCount);
  const visiblePageCount = Math.min(safePageCount, MAX_VISIBLE_PAGE_NUMBERS);
  const firstVisiblePage = Math.min(
    Math.max(1, safeCurrentPage - Math.floor(MAX_VISIBLE_PAGE_NUMBERS / 2)),
    safePageCount - visiblePageCount + 1,
  );
  const pages = Array.from(
    { length: visiblePageCount },
    (_unused, index) => firstVisiblePage + index,
  );

  return (
    <nav aria-label="Table pagination" className="flex max-w-full flex-wrap items-center gap-1">
      <button
        type="button"
        aria-label="First page"
        disabled={safeCurrentPage === 1}
        onClick={() => onPageChange(1)}
        className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        First
      </button>
      <button
        type="button"
        aria-label="Previous page"
        disabled={safeCurrentPage === 1}
        onClick={() => onPageChange(safeCurrentPage - 1)}
        className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={safeCurrentPage === page ? "page" : undefined}
          aria-label={`Page ${page}`}
          onClick={() => onPageChange(page)}
          className={safeCurrentPage === page
            ? "rounded-md bg-[#5b21b6] px-3 py-1.5 text-[11px] font-semibold text-white"
            : "rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50"}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        disabled={safeCurrentPage >= safePageCount}
        onClick={() => onPageChange(safeCurrentPage + 1)}
        className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
      <button
        type="button"
        aria-label="Last page"
        disabled={safeCurrentPage >= safePageCount}
        onClick={() => onPageChange(safePageCount)}
        className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Last
      </button>
    </nav>
  );
}
