export const CATEGORIES = [
  "Applications",
  "Tools & Utilities",
  "Experiments",
  "AI & Machine Learning",
  "Web Development",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const STATUSES = ["live", "completed", "experimental", "wip", "archived"] as const;
export type Status = (typeof STATUSES)[number];

/**
 * Where a project lives. Projects are deployed independently of the hub, so
 * this is only ever a link target, never a dependency.
 *  - string            absolute URL on any host
 *  - { subdomain }     https://<subdomain>.<NEXT_PUBLIC_SITE_DOMAIN>
 *  - { path }          a path on the hub's own domain, e.g. "/swirl"
 */
export type LiveTarget = string | { subdomain: string } | { path: string };

/** One block of a project's detail page. Any combination of fields renders. */
export type Section = {
  title: string;
  body?: string[];
  bullets?: string[];
  /** Ordered stages, rendered as a flow. */
  steps?: { label: string; detail?: string }[];
};

export type Project = {
  id: string; // URL slug: /projects/<id>/
  name: string;
  /** One line, shown on cards. */
  description: string;
  category: Category;
  technologies: string[];
  status: Status;
  /** Path under /public. Omit for a generated placeholder visual. */
  thumbnail?: string;
  liveUrl?: LiveTarget;
  /** False while liveUrl is planned but nothing answers there yet. Default true. */
  deployed?: boolean;
  /** Short note shown next to the live link, e.g. hosting caveats. */
  deploymentNote?: string;
  githubUrl?: string;
  lastUpdated: string; // YYYY-MM-DD
  featured?: boolean;
  /** Detail page content. Omit and the page still renders from the fields above. */
  overview?: string[];
  features?: string[];
  sections?: Section[];
  screenshots?: { src: string; alt: string; caption?: string }[];
};
