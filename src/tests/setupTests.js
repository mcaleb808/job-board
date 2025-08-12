import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

vi.mock("next/navigation", () => {
  const routerMock = {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    forward: vi.fn(),
  };
  return {
    useRouter: () => routerMock,
    useSearchParams: () => new URLSearchParams(""),
    usePathname: () => "/tests",
    useParams: () => ({ id: "1" }),
  };
});

vi.mock("next/headers", () => {
  const store = new Map();
  return {
    cookies: async () => ({
      get: (name) => store.get(name),
      set: (...args) => {
        if (args.length === 1 && typeof args[0] === "object") {
          const { name, value, ...options } = args[0];
          store.set(name, { name, value, ...options });
          return;
        }
        const [name, value, options = {}] = args;
        store.set(name, { name, value, ...options });
      },
      delete: (name) => store.delete(name),
      _all: store,
    }),
  };
});
