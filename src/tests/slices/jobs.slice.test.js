import reducer, {
  setFilters,
  fetchJobs,
} from "../../app/features/jobs/jobsSlice";

const initial = {
  items: [],
  page: 1,
  pageSize: 8,
  total: 0,
  filters: { q: "", type: "all" },
  status: "idle",
  error: null,
  selected: null,
};

function mockFetchOnce(payload, { status = 200 } = {}) {
  return vi.spyOn(global, "fetch").mockResolvedValueOnce(
    new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  );
}

it("updates filters and resets page", () => {
  const s = reducer(initial, setFilters({ q: "react", type: "full-time" }));
  expect(s.filters).toEqual({ q: "react", type: "full-time" });
  expect(s.page).toBe(1);
});

it("fetchJobs fulfilled updates list meta", async () => {
  const data = {
    items: [{ id: "1", title: "Frontend Dev" }],
    total: 1,
    page: 1,
    pageSize: 8,
  };
  mockFetchOnce(data);
  const s1 = reducer(initial, { type: fetchJobs.pending.type });
  const s2 = reducer(s1, { type: fetchJobs.fulfilled.type, payload: data });
  expect(s2.items.length).toBe(1);
  expect(s2.total).toBe(1);
});
