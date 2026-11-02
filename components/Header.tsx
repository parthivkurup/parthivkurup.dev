import Link from "next/link";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-line">
      <Link href="/" className="group flex items-center gap-2 font-mono text-sm" aria-label={`${site.wordmark}, home`}>
        <span aria-hidden className="text-low transition-colors group-hover:text-fg">~/</span>
        <span className="font-medium tracking-tight">{site.wordmark}</span>
        <span aria-hidden className="h-3.5 w-[7px] translate-y-px bg-fg/70 motion-safe:animate-[blink_1.2s_steps(1)_infinite]" />
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-5 text-sm text-mid">
        <Link href="/" className="transition-colors hover:text-fg">
          Projects
        </Link>
        <Link href="/about/" className="transition-colors hover:text-fg">
          About
        </Link>
      </nav>
      <style>{`@keyframes blink{50%{opacity:0}}`}</style>
    </header>
  );
}
