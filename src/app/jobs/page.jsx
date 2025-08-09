"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchJobs } from "../features/jobs/jobsSlice";
import JobFilters from "../components/JobFilters";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";

export default function JobsPage() {
  const dispatch = useDispatch();
  const { items, status, error, filters, page, pageSize } = useSelector(
    (s) => s.jobs
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobs({ ...filters, page, pageSize }));
    }
  }, [dispatch, status, filters, page, pageSize]);

  return (
    <section className="grid gap-4">
      <h1 className="text-xl font-semibold">Jobs</h1>
      <JobFilters />

      {status === "loading" && (
        <p className="text-neutral-600">Loading jobs…</p>
      )}
      {status === "failed" && (
        <p className="text-red-600">{error || "Something went wrong"}</p>
      )}
      {status === "succeeded" && items.length === 0 && (
        <div className="border rounded-xl p-8 text-center text-neutral-600">
          No jobs match your filters.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <Pagination />
    </section>
  );
}
