import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-20">
      <p className="font-mono text-xs text-low">
        <span className="text-mid">$</span> cd ./here
      </p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight">404. Nothing here.</h1>
      <p className="mt-3 text-[15px] text-mid">Either I never built it or I moved it.</p>
      <Link href="/" className="mt-6 inline-block font-mono text-xs text-mid hover:text-fg">
        <span aria-hidden>←</span> back to projects
      </Link>
    </section>
  );
}
