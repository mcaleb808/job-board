import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/renderWithProviders";
import Header from "../../app/components/Header";

it("shows Login/Register when logged out", () => {
  renderWithProviders(<Header />, {
    preloadedState: { auth: { user: null, status: "idle", error: null } },
  });
  expect(screen.getByText(/Jobs/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Register/i)).toBeInTheDocument();
});

it("shows email and My Applications when logged in", () => {
  renderWithProviders(<Header />, {
    preloadedState: {
      auth: {
        user: { id: "u1", email: "me@acme.com" },
        status: "idle",
        error: null,
      },
    },
  });
  expect(screen.getByText("me@acme.com")).toBeInTheDocument();
  expect(screen.getByText(/My Applications/i)).toBeInTheDocument();
});
