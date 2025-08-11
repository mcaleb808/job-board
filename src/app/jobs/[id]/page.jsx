"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchJobById, clearSelected } from "../../features/jobs/jobsSlice";

export default function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, status, error } = useSelector((s) => s.jobs);

  useEffect(() => {
    dispatch(fetchJobById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  if (status === "loading" && !selected) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!selected) return <p className="text-neutral-600">Not found.</p>;

  const job = selected;
  return (
    <article className="grid gap-4">
      <header>
        <h1 className="text-2xl font-semibold leading-tight">{job.title}</h1>
        <p className="text-neutral-600">
          {job.company} • {job.location} • {job.type}
        </p>
      </header>
      <div className="text-neutral-800">{job.description}</div>
      <div className="flex flex-wrap gap-2">
        {job.tags?.map((t) => (
          <span key={t} className="text-xs border rounded-full px-2 py-0.5">
            #{t}
          </span>
        ))}
      </div>
      <div className="text-sm text-neutral-700">Salary: {job.salaryRange}</div>
      <div className="pt-2">
        <Link
          href={`/jobs/${job.id}/apply`}
          className="inline-block rounded-lg px-3 py-2 bg-black text-white"
        >
          Apply
        </Link>
      </div>
      <div>
        <Link href="/jobs" className="underline text-sm">
          ← Back to jobs
        </Link>
      </div>
    </article>
  );
}
