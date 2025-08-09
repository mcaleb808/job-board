import { NextResponse } from "next/server";

export async function GET(request) {
  const cookie = request.cookies.get("jb_session");
  try {
    const user = cookie?.value ? JSON.parse(cookie.value) : null;
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ user: null });
  }
}
