import { ChevronLeft, ChevronRight } from "lucide-react";

const defaultPages = [1, 2, 3, "…", 10];

export function JobsPagination({ pages = defaultPages, activePage = 1 }) {
  return (
    <nav
      aria-label="Job pagination"
      className="mt-6 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        className="flex size-8 items-center justify-center rounded-lg border border-[#232327] bg-[#131314] text-[#a0a0ab] transition-colors hover:text-white"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page) =>
        typeof page === "number" ? (
          <button
            key={page}
            type="button"
            aria-current={page === activePage ? "page" : undefined}
            className={
              page === activePage
                ? "flex size-8 items-center justify-center rounded-lg bg-white text-xs font-semibold text-[#0b0b0c]"
                : "flex size-8 items-center justify-center rounded-lg border border-[#232327] bg-[#131314] text-xs text-[#a0a0ab] transition-colors hover:text-white"
            }
          >
            {page}
          </button>
        ) : (
          <span key={page} className="px-1 text-xs text-[#5a5a60]">
            {page}
          </span>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        className="flex size-8 items-center justify-center rounded-lg border border-[#232327] bg-[#131314] text-[#a0a0ab] transition-colors hover:text-white"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
