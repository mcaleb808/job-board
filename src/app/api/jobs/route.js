import { listJobs } from "@/lib/jobsData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";
  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "8");
  const data = listJobs({ q, type, page, pageSize });
  return Response.json(data);
}
