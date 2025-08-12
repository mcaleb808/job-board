"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setPage, fetchJobs } from "../features/jobs/jobsSlice";

export default function JobFilters() {
  const dispatch = useDispatch();
  const { filters, page, pageSize } = useSelector((s) => s.jobs);
  const [q, setQ] = useState(filters.q || "");
  const [type, setType] = useState(filters.type || "all");

  useEffect(() => {
    dispatch(fetchJobs({ q: filters.q, type: filters.type, page, pageSize }));
  }, [dispatch, filters.q, filters.type, page, pageSize]);

  function applyFilters(e) {
    e.preventDefault();
    dispatch(setFilters({ q, type }));
    dispatch(setPage(1));
  }

  return (
    <form
      onSubmit={applyFilters}
      className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end"
    >
      <label className="flex-1 text-sm">
        <span className="sr-only">Search</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, company, tag…"
          className="w-full border rounded-lg px-3 py-2"
        />
      </label>
      <label className="text-sm">
        <span className="sr-only">Type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
      </label>
      <button
        type="submit"
        className="rounded-lg px-3 py-2 bg-black text-white"
      >
        Filter
      </button>
    </form>
  );
}
