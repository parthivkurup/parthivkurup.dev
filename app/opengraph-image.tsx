import { site } from "@/content/site";
import { OG_SIZE, renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const alt = site.description;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: `~/${site.wordmark}`,
    title: site.name,
    subtitle: site.intro,
    footer: site.domain ?? "",
  });
}
