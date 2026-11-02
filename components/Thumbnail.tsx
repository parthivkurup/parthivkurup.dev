import type { Project } from "@/lib/types";

/**
 * The project's own image, or a generated placeholder: a dot field seeded by
 * the id, so every new project gets a stable, distinct visual for free.
 */
export function Thumbnail({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-sunk">
      {project.thumbnail ? (
        // Static export: plain <img> with explicit sizing; SVG needs no optimisation.
        <img
          src={project.thumbnail}
          alt=""
          width={1200}
          height={750}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
      ) : (
        <Placeholder seed={project.id} label={project.name} />
      )}
    </div>
  );
}

function Placeholder({ seed, label }: { seed: string; label: string }) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rand = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507)) >>> 0) / 4294967296;
  const cols = 24;
  const rows = 15;
  const dots: { x: number; y: number; o: number }[] = [];
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const r = rand();
      if (r > 0.55) dots.push({ x, y, o: r > 0.93 ? 0.9 : 0.18 });
    }
  return (
    <svg viewBox={`0 0 ${cols * 10} ${rows * 10}`} className="size-full" aria-hidden>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x * 10 + 5} cy={d.y * 10 + 5} r={1.4} fill="#ededed" opacity={d.o} />
      ))}
      <text x={12} y={rows * 10 - 12} fill="#ededed" fontSize={11} style={{ fontFamily: "var(--font-geist-mono)" }}>
        {label.toLowerCase()}
      </text>
    </svg>
  );
}
