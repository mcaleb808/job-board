import { NextResponse } from "next/server";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function POST(request) {
  const { email, password } = await request.json();
  await delay(400);
  if (!email || !password || password.length < 4) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  const res = NextResponse.json({ id: "u1", email });
  res.cookies.set("jb_session", JSON.stringify({ id: "u1", email }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return res;
}
