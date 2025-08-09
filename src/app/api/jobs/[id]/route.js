import { getJob } from "@/lib/jobsData";

export async function GET(_request, { params }) {
  const job = getJob(params.id);
  if (!job)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  return Response.json(job);
}
