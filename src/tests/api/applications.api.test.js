import { POST as ApplyPOST } from "../../app/api/applications/route.js";
import { GET as MineGET } from "../../app/api/applications/me/route.js";
import { cookies } from "next/headers";

describe("/api/applications", () => {
  beforeEach(async () => {
    const jar = await cookies();
    jar._clear?.();
  });

  it("rejects unauthenticated requests", async () => {
    const req = new Request("http://localhost/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: "1",
        fullName: "A",
        email: "a@b.com",
        resumeUrl: "https://cv",
      }),
    });
    const res = await ApplyPOST(req);
    expect(res.status).toBe(401);
  });

  it("creates an application and lists it for the user (jb_id/jb_user)", async () => {
    // simulate signed-in user via your new cookies
    const jar = await cookies();
    jar.set({ name: "jb_id", value: "u1" });
    jar.set({ name: "jb_user", value: "u@x.com" });

    // create
    const createReq = new Request("http://localhost/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId: "1",
        fullName: "User One",
        email: "u@x.com",
        resumeUrl: "https://example.com/cv.pdf",
        coverLetter: "hello",
      }),
    });
    const createRes = await ApplyPOST(createReq);
    expect(createRes.status).toBe(201);
    const created = await createRes.json();

    const listRes = await MineGET(
      new Request("http://localhost/api/applications/me")
    );
    expect(listRes.status).toBe(200);
    const data = await listRes.json();
    expect(data.items.find((a) => a.id === created.id)).toBeTruthy();
  });
});
