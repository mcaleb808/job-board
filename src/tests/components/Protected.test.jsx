import React from "react";
import { screen } from "@testing-library/react";
import Protected from "../../app/components/Protected";
import { renderWithProviders } from "../utils/renderWithProviders.jsx";

it("redirects to /login when unauthenticated", () => {
  renderWithProviders(
    <Protected>
      <div>secret</div>
    </Protected>,
    {
      preloadedState: { auth: { user: null, status: "idle", error: null } },
    }
  );
  expect(screen.queryByText("secret")).toBeNull();
});

it("renders children when authenticated", () => {
  renderWithProviders(
    <Protected>
      <div>secret</div>
    </Protected>,
    {
      preloadedState: {
        auth: {
          user: { id: "u1", email: "u@x.com" },
          status: "idle",
          error: null,
        },
      },
    }
  );
  expect(screen.getByText("secret")).toBeInTheDocument();
});
