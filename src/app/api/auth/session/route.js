import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  cookiesGetter,
  cookiesSetter,
} from "../../../../app/utils/handleCookies";

export async function GET() {
  const cookieStore = await cookies();
  const { user, id } = await cookiesGetter(cookieStore);
  try {
    return NextResponse.json({ email: user, id });
  } catch {
    return NextResponse.json({ user: null, id: null }, { status: 401 });
  }
}

export async function POST(request) {
  const cookieStore = await cookies();
  const body = await request.json();
  cookiesSetter(cookieStore, body);
  return NextResponse.json({ success: true });
}
