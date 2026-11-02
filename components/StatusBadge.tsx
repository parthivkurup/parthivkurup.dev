import { STATUS_LABEL } from "@/lib/projects";
import type { Status } from "@/lib/types";

const DOT: Record<Status, string> = {
  live: "bg-st-live",
  completed: "bg-st-completed",
  experimental: "bg-st-experimental",
  wip: "bg-st-wip",
  archived: "bg-st-archived",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mid">
      <span className="relative flex size-1.5" aria-hidden>
        {status === "live" && (
          <span className="absolute inset-0 rounded-full bg-st-live opacity-60 motion-safe:animate-ping" />
        )}
        <span className={`relative size-1.5 rounded-full ${DOT[status]}`} />
      </span>
      {STATUS_LABEL[status]}
    </span>
  );
}
