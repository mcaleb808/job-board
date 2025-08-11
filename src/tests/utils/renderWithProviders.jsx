import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { initStore } from "../../app/store";

export function renderWithProviders(ui, { preloadedState } = {}) {
  const store = initStore(preloadedState);
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
