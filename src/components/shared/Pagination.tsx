"use client"
import { ITEMS_PER_PAGE } from "@/constants";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: any }) => {
  const router = useRouter();
  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;
  const changePage = (newPage:number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page',newPage.toString())
    router.push(`${window.location.pathname}?${params}`)
  } 
  
  return (
    <div className="p-4 flex justify-between text-gray-500 items-center">
      <button
        disabled={!hasPrev}
        onClick={() => changePage(page - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEMS_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm ${page === pageIndex ? "bg-lamaSky" : ""}`}
                onClick={() => changePage(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        onClick={() => changePage(page + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
