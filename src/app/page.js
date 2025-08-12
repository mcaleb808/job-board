import JobBoard from "./jobs/page";
export default function Home(properties) {
  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Welcome to Job Board</h1>
      <JobBoard {...properties} />
    </section>
  );
}
