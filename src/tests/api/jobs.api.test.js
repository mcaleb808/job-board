import { GET as JobsGET } from "../../app/api/jobs/route.js";
import { GET as JobGET } from "../../app/api/jobs/[id]/route.js";

describe("/api/jobs", () => {
  it("lists jobs with pagination & filters", async () => {
    const req = new Request(
      "http://localhost/api/jobs?q=react&type=full-time&page=1&pageSize=2"
    );
    const res = await JobsGET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.page).toBe(1);
    expect(data.pageSize).toBe(2);
    expect(data.items.length).toBeLessThanOrEqual(2);
  });

  it("returns job details and 404 for unknown id", async () => {
    // hit an existing id
    const ok = await JobGET(new Request("http://localhost/api/jobs/1"), {
      params: { id: "1" },
    });
    expect(ok.status).toBe(200);
    const job = await ok.json();
    expect(job.id).toBe("1");

    // unknown id
    const nf = await JobGET(new Request("http://localhost/api/jobs/999"), {
      params: { id: "999" },
    });
    expect(nf.status).toBe(404);
  });
});
