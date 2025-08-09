"use client";
import { useDispatch } from "react-redux";
import { loggedIn } from "@/app/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    // Mock login for now
    dispatch(loggedIn({ id: "u1", email }));
    router.push("/jobs");
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input
          className="border rounded-lg px-3 py-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          aria-label="Email"
        />
        <input
          className="border rounded-lg px-3 py-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          aria-label="Password"
        />
        <button
          className="rounded-lg px-3 py-2 bg-black text-white"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
