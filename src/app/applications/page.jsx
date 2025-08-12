"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyApplications } from "../features/applications/applicationsSlice";
import Protected from "../components/Protected";

export default function MyApplicationsPage() {
  const dispatch = useDispatch();
  const {
    mine = [],
    status = "idle",
    error = null,
  } = useSelector((s) => s.applications || {});

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, []);

  return (
    <Protected>
      <section className="grid gap-4">
        <h1 className="text-xl font-semibold">My Applications</h1>

        {status === "loading" && <p>Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {status === "succeeded" && mine.length === 0 && (
          <div className="border rounded-xl p-8 text-center text-neutral-600">
            No applications yet.
          </div>
        )}

        <ul className="grid gap-3">
          {mine.map((a) => (
            <li key={a.id} className="border rounded-xl p-4">
              <div className="font-medium">Application #{a.id}</div>
              <div className="text-sm text-neutral-600">
                Job ID: {a.jobId} • {new Date(a.createdAt).toLocaleString()}
              </div>
              <div className="text-sm">
                Resume:{" "}
                <a
                  className="underline"
                  href={a.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.resumeUrl}
                </a>
              </div>
              {a.coverLetter && (
                <details className="mt-2 text-sm">
                  <summary className="cursor-pointer">Cover letter</summary>
                  <p className="mt-1 whitespace-pre-wrap">{a.coverLetter}</p>
                </details>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Protected>
  );
}
