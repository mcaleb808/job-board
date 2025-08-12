"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import Protected from "../../../components/Protected";
import { submitApplication } from "../../../features/applications/applicationsSlice";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.email("Enter a valid email"),
  resumeUrl: z.url("Enter a valid URL"),
  coverLetter: z.string().max(2000).optional(),
});

export default function ApplyPage() {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((s) => s.auth.user);
  const { status, error } = useSelector((s) => s.applications);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: user?.email || "",
      resumeUrl: "",
      coverLetter: "",
    },
  });

  async function onSubmit(values) {
    const res = await dispatch(submitApplication({ jobId, ...values }));
    if (res.meta.requestStatus === "fulfilled") {
      router.replace("/applications?submitted=1");
    }
  }

  return (
    <Protected>
      <section className="max-w-lg">
        <h1 className="text-xl font-semibold mb-4">Apply for job</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Full name</span>
            <input
              className="border rounded-lg px-3 py-2"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName.message}</p>
            )}
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <input
              className="border rounded-lg px-3 py-2"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Resume URL</span>
            <input
              className="border rounded-lg px-3 py-2"
              placeholder="https://…"
              {...register("resumeUrl")}
            />
            {errors.resumeUrl && (
              <p className="text-red-600 text-sm">{errors.resumeUrl.message}</p>
            )}
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Cover letter (optional)</span>
            <textarea
              rows={6}
              className="border rounded-lg px-3 py-2"
              {...register("coverLetter")}
            />
            {errors.coverLetter && (
              <p className="text-red-600 text-sm">
                {errors.coverLetter.message}
              </p>
            )}
          </label>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            disabled={status === "loading"}
            className="rounded-lg px-3 py-2 bg-black text-white disabled:opacity-60"
            type="submit"
          >
            {status === "loading" ? "Submitting…" : "Submit application"}
          </button>
        </form>
      </section>
    </Protected>
  );
}
