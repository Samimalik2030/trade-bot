import { StatTile } from "./StatTile";
import { LevelStatusPill, LevelTypePill } from "./StatusPill";
import { PairBadge } from "./PairBadge";
import { formatPips, formatPrice, pipsBetween } from "@/lib/format";
import type { Level, Pair } from "@/lib/types";

interface OverviewViewProps {
  pairs: Pair[];
  levels: Level[];
  levelStatus: (level: Level, pair: Pair | undefined) => Level["status"];
}

export function OverviewView({ pairs, levels, levelStatus }: OverviewViewProps) {
  const enabledPairs = pairs.filter((p) => p.enabled);
  const activeLevels = levels.filter((l) => l.active);

  const rows = activeLevels
    .map((l) => {
      const pair = pairs.find((p) => p.id === l.pairId);
      if (!pair) return null;
      const status = levelStatus(l, pair);
      const distance = pipsBetween(pair.price, l.price, pair.isJpy);
      return { level: l, pair, status, distance };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null && r.pair.enabled)
    .sort((a, b) => a.distance - b.distance);

  const approachingCount = rows.filter((r) => r.status === "approaching").length;
  const touchedCount = rows.filter((r) => r.status === "touched").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile label="Active pairs" value={enabledPairs.length} hint={`of ${pairs.length} total`} />
        <StatTile label="Active levels" value={activeLevels.length} hint={`of ${levels.length} total`} />
        <StatTile label="Approaching" value={approachingCount} tone={approachingCount > 0 ? "warning" : "default"} />
        <StatTile label="Touched" value={touchedCount} tone={touchedCount > 0 ? "negative" : "default"} />
      </div>

      <div className="rounded-lg border border-border/15 bg-surface-elevated overflow-hidden">
        <div className="px-4 py-3.5 border-b border-border/10">
          <h3 className="text-sm font-semibold text-text-primary">Closest to triggering</h3>
          <p className="text-xs text-text-secondary mt-0.5">Active levels ranked by distance from the live price.</p>
        </div>
        <div className="divide-y divide-border/10">
          {rows.length === 0 && <p className="px-4 py-8 text-center text-xs text-text-muted">No active levels on enabled pairs.</p>}
          {rows.slice(0, 8).map(({ level, pair, status, distance }) => (
            <div key={level.id} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5">
              <PairBadge symbol={pair.symbol} />
              <span className="font-mono text-sm font-medium text-text-primary w-20">{pair.symbol}</span>
              <LevelTypePill type={level.type} />
              <span className="font-mono text-sm tabular-nums text-text-secondary">{formatPrice(level.price, pair.isJpy)}</span>
              <span className="text-xs tabular-nums text-text-muted">{formatPips(distance)} away</span>
              <div className="ml-auto">
                <LevelStatusPill status={status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
