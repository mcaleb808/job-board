import { POST } from "../../app/api/auth/login/route.js";
import { cookies } from "next/headers";

it("sets auth cookies and returns user", async () => {
  const req = new Request("http://localhost/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "1234" }),
  });

  const res = await POST(req);
  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data.email).toBe("test@example.com");

  const cookieStore = await cookies();
  const idCookie = cookieStore._all.get("jb_id");
  const userCookie = cookieStore._all.get("jb_user");

  expect(idCookie).toBeTruthy();
  expect(userCookie).toBeTruthy();
  expect(idCookie.value).toBe("u1");
  expect(userCookie.value).toBe("test@example.com");
});
