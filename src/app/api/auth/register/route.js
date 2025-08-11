import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cookiesSetter } from "@/app/utils/handleCookies";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function POST(request) {
  const { email, password } = await request.json();
  await delay(500);
  if (!email?.includes("@") || (password || "").length < 6) {
    return NextResponse.json({ message: "Weak details" }, { status: 400 });
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
