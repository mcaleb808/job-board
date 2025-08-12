import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { listApplicationsByUser } from "../../../../lib/applicationsData";
import { cookiesGetter } from "../../../../app/utils/handleCookies";

export async function GET() {
  const cookieStore = await cookies();
  const { user } = await cookiesGetter(cookieStore);
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const items = listApplicationsByUser(user);
  return NextResponse.json({ items });
}
