import Link from "next/link";
import { formatDate } from "@/lib/projects";
import type { Project } from "@/lib/types";
import { ProjectLinks } from "./ProjectLinks";
import { StatusBadge } from "./StatusBadge";
import { TechTags } from "./TechTags";
import { Thumbnail } from "./Thumbnail";

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-raised transition-colors hover:border-line-strong">
      <div className="border-b border-line">
        <Thumbnail project={project} priority={priority} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-3">
            <StatusBadge status={project.status} />
            <span className="truncate font-mono text-[11px] text-low">{project.category}</span>
          </span>
          <time dateTime={project.lastUpdated} className="shrink-0 font-mono text-[11px] text-low">
            {formatDate(project.lastUpdated)}
          </time>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-[15px] font-medium tracking-tight">
            {/* Stretched link: the whole card opens the detail page. */}
            <Link href={`/projects/${project.id}/`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-fg">
              {project.name}
            </Link>
            {project.featured && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-low">featured</span>
            )}
            <span aria-hidden className="ml-auto text-low transition-transform group-hover:translate-x-0.5 group-hover:text-fg">
              →
            </span>
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-mid">{project.description}</p>
        </div>
        <TechTags items={project.technologies} max={5} />
        <div className="mt-auto border-t border-line pt-3">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
