import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cookiesSetter } from "@/app/utils/handleCookies";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const cookieStore = await cookies();
  // Clear the session cookie
  cookiesSetter(cookieStore, { id: null, email: null });
  return res;
}
