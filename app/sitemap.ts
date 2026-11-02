import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain ?? "localhost"}`;
  return [
    { url: `${base}/` },
    { url: `${base}/about/` },
    ...getProjects().map((p) => ({ url: `${base}/projects/${p.id}/`, lastModified: p.lastUpdated })),
  ];
}
