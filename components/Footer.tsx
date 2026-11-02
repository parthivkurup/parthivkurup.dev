import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 flex flex-col gap-3 border-t border-line py-8 text-xs text-low sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono">
        {site.domain ?? "localhost"}
      </p>
      <ul className="flex gap-5">
        {site.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
              {l.label} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
