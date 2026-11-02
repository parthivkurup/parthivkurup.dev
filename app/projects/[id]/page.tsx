import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectLinks } from "@/components/ProjectLinks";
import { StatusBadge } from "@/components/StatusBadge";
import { TechTags } from "@/components/TechTags";
import { Thumbnail } from "@/components/Thumbnail";
import { formatDate, getProject, getProjects, plannedHost } from "@/lib/projects";
import type { Section } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).id);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    openGraph: { title: p.name, description: p.description, images: p.thumbnail ? [p.thumbnail] : undefined },
  };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).id);
  if (!p) notFound();
  const host = plannedHost(p);

  return (
    <article className="pt-10 sm:pt-14">
      <Link href="/" className="font-mono text-xs text-low transition-colors hover:text-fg">
        <span aria-hidden>←</span> projects
      </Link>

      <header className="mt-6 grid gap-8 border-b border-line pb-10 md:grid-cols-[1fr_minmax(0,22rem)] md:gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatusBadge status={p.status} />
            <span className="font-mono text-[11px] text-low">{p.category}</span>
            <span className="font-mono text-[11px] text-low">
              updated <time dateTime={p.lastUpdated}>{formatDate(p.lastUpdated)}</time>
            </span>
          </div>
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">{p.name}</h1>
          <p className="max-w-prose text-[15px] leading-relaxed text-mid">{p.description}</p>
          <ProjectLinks project={p} size="md" />
          {(host || p.deploymentNote) && (
            <p className="max-w-prose font-mono text-[11px] leading-relaxed text-low">
              {host && <span className="text-mid">{host}</span>}
              {host && p.deploymentNote && " · "}
              {p.deploymentNote}
            </p>
          )}
        </div>
        <div className="overflow-hidden rounded-lg border border-line">
          <Thumbnail project={p} priority />
        </div>
      </header>

      <div className="grid gap-12 pt-10 md:grid-cols-[11rem_1fr] md:gap-12">
        <aside className="md:sticky md:top-8 md:self-start">
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-low">Stack</h2>
          <TechTags items={p.technologies} />
        </aside>

        <div className="flex min-w-0 max-w-2xl flex-col gap-12">
          {p.overview?.length ? (
            <Block title="Overview">
              {p.overview.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </Block>
          ) : null}

          {p.features?.length ? (
            <Block title="What it does">
              <Bullets items={p.features} />
            </Block>
          ) : null}

          {p.screenshots?.length ? (
            <Block title="Screenshots">
              <div className="grid gap-4">
                {p.screenshots.map((s) => (
                  <figure key={s.src} className="overflow-hidden rounded-lg border border-line">
                    <img src={s.src} alt={s.alt} loading="lazy" className="w-full" />
                    {s.caption && <figcaption className="border-t border-line px-3 py-2 text-xs text-low">{s.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Block>
          ) : null}

          {p.sections?.map((s) => <SectionBlock key={s.title} section={s} />)}
        </div>
      </div>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-medium text-fg">{title}</h2>
      <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-mid">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((t, i) => (
        <li key={i} className="relative pl-5">
          <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-low" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({ section: s }: { section: Section }) {
  return (
    <Block title={s.title}>
      {s.body?.map((t, i) => <p key={i}>{t}</p>)}
      {s.steps?.length ? (
        <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {s.steps.map((st, i) => (
            <li key={st.label} className="flex flex-col gap-1 bg-bg p-3">
              <span className="font-mono text-[10px] text-low">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-[13px] text-fg">{st.label}</span>
              {st.detail && <span className="text-xs text-low">{st.detail}</span>}
            </li>
          ))}
        </ol>
      ) : null}
      {s.bullets?.length ? <Bullets items={s.bullets} /> : null}
    </Block>
  );
}
