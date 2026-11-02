export function TechTags({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items;
  const rest = items.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {shown.map((t) => (
        <li key={t} className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-mid">
          {t}
        </li>
      ))}
      {rest > 0 && (
        <li className="px-1 py-0.5 font-mono text-[11px] text-low" aria-label={`and ${rest} more`}>
          +{rest}
        </li>
      )}
    </ul>
  );
}
