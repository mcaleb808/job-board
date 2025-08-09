"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { initStore } from "./store";

export default function Providers({ children }) {
    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = initStore();
    }
    return <Provider store={storeRef.current}>{children}</Provider>;
}
