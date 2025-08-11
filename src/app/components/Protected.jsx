"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Protected({ children, redirectTo = "/login" }) {
  const user = useSelector((s) => s.auth.user);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Simulate a delay to mimic fetching user data
    const timer = setTimeout(() => {
      setReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && !user) router.replace(redirectTo);
  }, [ready, user, router, redirectTo]);

  if (!user) return null;
  return children;
}
