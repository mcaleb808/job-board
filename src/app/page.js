export default function Home() {
  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Welcome to Job Board</h1>
      <p className="text-neutral-700">
        Start by browsing <a href="/jobs" className="underline">jobs</a> or <a href="/login" className="underline">log in</a>.
      </p>
    </section>
  );
}
