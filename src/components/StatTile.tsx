type Tone = "default" | "positive" | "warning" | "negative";

const TONE_TEXT: Record<Tone, string> = {
  default: "text-text-primary",
  positive: "text-positive",
  warning: "text-warning",
  negative: "text-negative",
};

export function StatTile({ label, value, tone = "default", hint }: { label: string; value: string | number; tone?: Tone; hint?: string }) {
  return (
    <div className="rounded-lg border border-border/15 bg-surface-elevated px-4 py-3.5">
      <p className="text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      <p className={`mt-1.5 font-mono text-2xl font-semibold tabular-nums ${TONE_TEXT[tone]}`}>{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-text-secondary">{hint}</p>}
    </div>
  );
}
