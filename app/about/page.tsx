import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <section className="max-w-xl pt-14 sm:pt-20">
      <p className="font-mono text-xs text-low">
        <span className="text-mid">$</span> whoami
      </p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight">{site.name}</h1>
      <div className="mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-mid">
        <p>
          I build software in Melbourne, mostly to find out whether an idea holds up once it meets real data and real
          people. Some of it ships. Some of it breaks in interesting ways first.
        </p>
        <p>
          This site is where those things live: finished apps, small tools, experiments and work in progress, each
          deployed on its own and listed here.
        </p>
      </div>
      <ul className="mt-8 flex gap-5 text-sm">
        {site.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer" className="text-mid underline-offset-4 hover:text-fg hover:underline">
              {l.label} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
