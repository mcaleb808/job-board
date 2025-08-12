"use client";
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
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
        if (data?.email) storeRef.current.dispatch(rehydrated(data || {}));
      } catch (e) {
        console.error("Failed to rehydrate user data");
      }
    })();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
