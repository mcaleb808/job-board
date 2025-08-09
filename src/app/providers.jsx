"use client";
import { Provider } from "react-redux";
import { useEffect, useRef } from "react";
import { initStore } from "./store";
import { rehydrated } from "./features/auth/authSlice";

export default function Providers({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) storeRef.current = initStore();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const data = await res.json();
        if (data?.user) storeRef.current.dispatch(rehydrated(data.user));
      } catch {}
    })();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
