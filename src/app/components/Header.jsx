"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { authLogout } from "../features/auth/authSlice";

export default function Header() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link
          href="/"
          className="h-8 w-8 rounded-xl bg-black text-white grid place-items-center font-bold"
        >
          JB
        </Link>
        <nav className="ml-auto flex gap-4 text-sm items-center">
          <Link href="/jobs" className="hover:underline">
            Jobs
          </Link>
          {!user && (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
          {user && (
            <>
              <Link href="/applications" className="hover:underline">
                My Applications
              </Link>
              <span
                className="text-neutral-600 hidden sm:inline"
                aria-live="polite"
              >
                {user.email}
              </span>
              <button
                className="rounded-lg px-3 py-1.5 bg-black text-white"
                onClick={() => dispatch(authLogout())}
              >
                Sign out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
