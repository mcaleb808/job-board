import React from "react";
import { screen, waitFor } from "@testing-library/react";
import MyApplicationsPage from "../../app/applications/page.jsx";
import { renderWithProviders } from "../utils/renderWithProviders.jsx";

function mockFetchOnce(payload, { status = 200 } = {}) {
  return vi.spyOn(global, "fetch").mockResolvedValueOnce(
    new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  );
}

describe("/applications page", () => {
  it("renders a list of applications from API", async () => {
    mockFetchOnce({
      items: [
        {
          id: "1",
          jobId: "5",
          createdAt: new Date().toISOString(),
          resumeUrl: "https://cv",
        },
      ],
    });
    renderWithProviders(<MyApplicationsPage />, {
      preloadedState: {
        auth: {
          user: { id: "u1", email: "me@acme.com" },
          status: "idle",
          error: null,
        },
        applications: { byId: {}, mine: [], status: "idle", error: null },
      },
    });

    await waitFor(() => {
      expect(screen.getByText(/Application #1/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Job ID: 5/i)).toBeInTheDocument();
  });

  it("shows empty state", async () => {
    mockFetchOnce({ items: [] });
    renderWithProviders(<MyApplicationsPage />, {
      preloadedState: {
        auth: {
          user: { id: "u1", email: "me@acme.com" },
          status: "idle",
          error: null,
        },
        applications: { byId: {}, mine: [], status: "idle", error: null },
      },
    });

    await waitFor(() => {
      expect(screen.getByText(/No applications yet/i)).toBeInTheDocument();
    });
  });
});
