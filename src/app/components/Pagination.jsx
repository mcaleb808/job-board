"use client";
import { useDispatch, useSelector } from "react-redux";
import { setPage, fetchJobs } from "../features/jobs/jobsSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const { page, pageSize, total, filters } = useSelector((s) => s.jobs);
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < pages;

  function go(nextPage) {
    dispatch(setPage(nextPage));
    dispatch(fetchJobs({ ...filters, page: nextPage, pageSize }));
  }

  if (total === 0) return null;
  return (
    <div className="flex items-center justify-between text-sm mt-4">
      <div>
        Page {page} of {pages} • {total} jobs
      </div>
      <div className="flex gap-2">
        <button
          disabled={!canPrev}
          onClick={() => go(page - 1)}
          className="border rounded-lg px-3 py-1.5 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={!canNext}
          onClick={() => go(page + 1)}
          className="border rounded-lg px-3 py-1.5 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
