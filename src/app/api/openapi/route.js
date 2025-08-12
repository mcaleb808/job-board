import { openapi } from "@/lib/openapi";

export async function GET() {
  return new Response(JSON.stringify(openapi), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
