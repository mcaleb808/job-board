import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplyPage from "../../app/jobs/[id]/apply/page.jsx";
import { renderWithProviders } from "../utils/renderWithProviders.jsx";

it("shows validation messages when fields are missing/invalid", async () => {
  // authenticated so Protected allows rendering
  renderWithProviders(<ApplyPage />, {
    preloadedState: {
      auth: {
        user: { id: "u1", email: "me@site.com" },
        status: "idle",
        error: null,
      },
      applications: { byId: {}, mine: [], status: "idle", error: null },
    },
  });

  await userEvent.click(
    screen.getByRole("button", { name: /submit application/i })
  );
  expect(await screen.findByText(/Enter your full name/i)).toBeInTheDocument();
  expect(await screen.findByText(/Enter a valid URL/i)).toBeInTheDocument();
});
