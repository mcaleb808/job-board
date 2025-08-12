"use client";
import React from "react";
import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <article className="border border-neutral-200 rounded-xl p-4 hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold leading-tight">
            <Link href={`/jobs/${job.id}`} className="hover:underline">
              {job.title}
            </Link>
          </h3>
          <p className="text-sm text-neutral-600">
            {job.company} • {job.location}
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full border border-neutral-300">
          {job.type}
        </span>
      </div>
      <p className="text-sm text-neutral-700 mt-2 line-clamp-2">
        {job.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.tags?.map((t) => (
          <span key={t} className="text-xs border rounded-full px-2 py-0.5">
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-3 text-sm text-neutral-600">
        Salary: {job.salaryRange}
      </div>
    </article>
  );
}
