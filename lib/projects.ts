import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { LiveTarget, Project, Status } from "./types";

export const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  completed: "Completed",
  experimental: "Experimental",
  wip: "WIP",
  archived: "Archived",
};

/** Featured first, then most recently updated. Registry order breaks ties. */
export function getProjects(): Project[] {
  return projects
    .map((p, i) => ({ p, i }))
    .sort(
      (a, b) =>
        Number(!!b.p.featured) - Number(!!a.p.featured) ||
        b.p.lastUpdated.localeCompare(a.p.lastUpdated) ||
        a.i - b.i,
    )
    .map(({ p }) => p);
}

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** Resolves a live target to an absolute URL, or undefined if it cannot be reached yet. */
export function resolveLiveUrl(p: Project): string | undefined {
  if (!p.liveUrl || p.deployed === false) return undefined;
  return resolveTarget(p.liveUrl);
}

/** The URL a project will have, deployed or not. For display only. */
export function plannedHost(p: Project): string | undefined {
  if (!p.liveUrl) return undefined;
  if (typeof p.liveUrl === "object" && "subdomain" in p.liveUrl) {
    return `${p.liveUrl.subdomain}.${site.domain ?? "<domain>"}`;
  }
  const url = resolveTarget(p.liveUrl);
  return url?.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function resolveTarget(t: LiveTarget): string | undefined {
  if (typeof t === "string") return t;
  if ("subdomain" in t) return site.domain ? `https://${t.subdomain}.${site.domain}` : undefined;
  return site.domain ? `https://${site.domain}${t.path}` : t.path;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Fails the build on registry mistakes instead of shipping a broken card. */
export function validateRegistry(list: Project[]) {
  const seen = new Set<string>();
  for (const p of list) {
    if (!/^[a-z0-9-]+$/.test(p.id)) throw new Error(`Project id "${p.id}" must be a lowercase slug`);
    if (seen.has(p.id)) throw new Error(`Duplicate project id "${p.id}"`);
    seen.add(p.id);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.lastUpdated))
      throw new Error(`${p.id}: lastUpdated must be YYYY-MM-DD`);
    if (typeof p.liveUrl === "object" && "path" in p.liveUrl && !p.liveUrl.path.startsWith("/"))
      throw new Error(`${p.id}: liveUrl.path must start with "/"`);
  }
}
validateRegistry(projects);
