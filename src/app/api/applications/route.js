import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createApplication } from "../../../lib/applicationsData";
import { cookiesGetter } from "../../../app/utils/handleCookies";

export async function POST(request) {
  const cookieStore = await cookies();
  const { user: userId } = await cookiesGetter(cookieStore);
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { jobId, fullName, email, resumeUrl, coverLetter } = body || {};
  if (!jobId || !fullName || !email || !resumeUrl) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const record = createApplication({
    jobId,
    fullName,
    email,
    resumeUrl,
    coverLetter: coverLetter || "",
    userId,
  });

  return NextResponse.json(record, { status: 201 });
}
