"use client";

import { useEffect, useMemo, useState } from "react";
import { STATUS_LABEL } from "@/lib/projects";
import type { Project, Status } from "@/lib/types";
import { CATEGORIES, STATUSES } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

type Filters = { category: string; tech: string; status: string };
const EMPTY: Filters = { category: "", tech: "", status: "" };

/**
 * Client-side filtering over the statically rendered list. Filters live in the
 * query string (?category=&tech=&status=) so a filtered view can be linked.
 */
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [f, setF] = useState<Filters>(EMPTY);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setF({ category: q.get("category") ?? "", tech: q.get("tech") ?? "", status: q.get("status") ?? "" });
  }, []);

  function update(next: Partial<Filters>) {
    const merged = { ...f, ...next };
    setF(merged);
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) if (v) q.set(k, v);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }

  // Only offer options that exist, so no filter can lead to a guaranteed empty list.
  const categories = CATEGORIES.filter((c) => projects.some((p) => p.category === c));
  const statuses = STATUSES.filter((s) => projects.some((p) => p.status === s));
  const techs = useMemo(
    () => [...new Set(projects.flatMap((p) => p.technologies))].sort((a, b) => a.localeCompare(b)),
    [projects],
  );

  const shown = projects.filter(
    (p) =>
      (!f.category || p.category === f.category) &&
      (!f.status || p.status === f.status) &&
      (!f.tech || p.technologies.includes(f.tech)),
  );
  const active = f.category || f.tech || f.status;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 border-y border-line py-3 md:flex-row md:items-center md:gap-6">
        <ChipGroup
          label="Category"
          options={categories.map((c) => ({ value: c, label: c }))}
          value={f.category}
          onChange={(category) => update({ category })}
        />
        <ChipGroup
          label="Status"
          options={statuses.map((s) => ({ value: s, label: STATUS_LABEL[s as Status] }))}
          value={f.status}
          onChange={(status) => update({ status })}
        />
        <label className="flex items-center gap-2 md:ml-auto">
          <span className="font-mono text-[11px] uppercase tracking-wider text-low">Tech</span>
          <select
            value={f.tech}
            onChange={(e) => update({ tech: e.target.value })}
            className="h-7 rounded-md border border-line bg-bg px-2 font-mono text-xs text-mid hover:border-line-strong focus:text-fg"
          >
            <option value="">Any</option>
            {techs.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-4 font-mono text-[11px] text-low" aria-live="polite">
        {shown.length} of {projects.length} {projects.length === 1 ? "project" : "projects"}
        {active && (
          <button onClick={() => update(EMPTY)} className="ml-3 text-mid underline-offset-2 hover:text-fg hover:underline">
            clear filters
          </button>
        )}
      </p>

      {shown.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <ProjectCard key={p.id} project={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-line px-6 py-14 text-center text-sm text-low">
          Nothing matches. Yet.
        </div>
      )}
    </div>
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-low">{label}</span>
      {[{ value: "", label: "All" }, ...options].map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value || "all"}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`h-7 rounded-md border px-2.5 text-xs transition-colors ${
              on ? "border-line-strong bg-fg/[0.08] text-fg" : "border-transparent text-mid hover:text-fg"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
