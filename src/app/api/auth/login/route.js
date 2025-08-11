import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cookiesSetter } from "@/app/utils/handleCookies";

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
  const data = {
    id: "u1",
    email,
  };
  const res = NextResponse.json(data);

  const cookieStore = await cookies();
  cookiesSetter(cookieStore, data);
  return res;
}
