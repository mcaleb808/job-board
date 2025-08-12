import React from "react";
import { screen, waitFor } from "@testing-library/react";
import JobsPage from "../../app/jobs/page.jsx";
import { renderWithProviders } from "../utils/renderWithProviders.jsx";

function mockFetchOnce(payload, { status = 200 } = {}) {
  return vi.spyOn(global, "fetch").mockResolvedValueOnce(
    new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  );
}

it("renders job cards from API and shows count via pagination", async () => {
  mockFetchOnce({
    items: [
      {
        id: "1",
        title: "Frontend Dev",
        company: "Acme",
        type: "full-time",
        location: "Remote",
        salaryRange: "$",
        description: "x",
      },
    ],
    total: 1,
    page: 1,
    pageSize: 8,
  });
  renderWithProviders(<JobsPage />, {
    preloadedState: {
      jobs: {
        items: [],
        page: 1,
        pageSize: 8,
        total: 0,
        filters: { q: "", type: "all" },
        status: "idle",
        error: null,
        selected: null,
      },
    },
  });

  await waitFor(() =>
    expect(screen.getByText(/Frontend Dev/i)).toBeInTheDocument()
  );
  expect(screen.getByText(/Page 1 of 1 • 1 jobs/)).toBeInTheDocument();
});
