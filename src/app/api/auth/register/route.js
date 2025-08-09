import { NextResponse } from "next/server";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function POST(request) {
  const { email, password } = await request.json();
  await delay(500);
  if (!email?.includes("@") || (password || "").length < 6) {
    return NextResponse.json({ message: "Weak details" }, { status: 400 });
  }
  const res = NextResponse.json({ id: "u1", email });
  res.cookies.set("jb_session", JSON.stringify({ id: "u1", email }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
