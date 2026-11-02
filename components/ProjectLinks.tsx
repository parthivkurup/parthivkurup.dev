import { plannedHost, resolveLiveUrl } from "@/lib/projects";
import type { Project } from "@/lib/types";

const base =
  "relative z-10 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors";

/**
 * Live + source links. A project that isn't reachable yet renders a disabled
 * chip instead of a dead link, so the hub never sends anyone to an error page
 * it can know about at build time.
 */
export function ProjectLinks({ project, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  const live = resolveLiveUrl(project);
  const host = plannedHost(project);
  const pad = size === "md" ? " px-3 py-1.5 text-[13px]" : "";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className={`${base}${pad} border-fg/80 bg-fg font-medium text-bg hover:bg-fg/85`}
        >
          Open <span aria-hidden>↗</span>
          <span className="sr-only">{project.name} (opens in a new tab)</span>
        </a>
      ) : host ? (
        <span
          className={`${base}${pad} cursor-default border-dashed border-line-strong text-low`}
          title={`Planned at ${host}`}
        >
          Not deployed yet
        </span>
      ) : null}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className={`${base}${pad} border-line text-mid hover:border-line-strong hover:text-fg`}
        >
          Source <span aria-hidden>↗</span>
          <span className="sr-only">for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
