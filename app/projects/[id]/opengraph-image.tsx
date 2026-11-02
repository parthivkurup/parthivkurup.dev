import { site } from "@/content/site";
import { getProject, getProjects, STATUS_LABEL } from "@/lib/projects";
import { OG_SIZE, renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;
export const alt = "Project card";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((p) => ({ id: p.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const p = getProject((await params).id);
  if (!p) return renderOg({ eyebrow: `~/${site.wordmark}`, title: site.name });
  return renderOg({
    eyebrow: `~/${site.wordmark}/projects`,
    title: p.name,
    subtitle: p.description,
    // One line only: the first five, then a count.
    footer:
      p.technologies.slice(0, 5).join(" · ") +
      (p.technologies.length > 5 ? ` · +${p.technologies.length - 5}` : ""),
    status: { label: STATUS_LABEL[p.status], live: p.status === "live" },
  });
}
