export function PairBadge({ symbol }: { symbol: string }) {
  const base = symbol.slice(0, 3);
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-panel font-mono text-[10px] font-bold tracking-tight text-text-secondary">
      {base}
    </span>
  );
}
