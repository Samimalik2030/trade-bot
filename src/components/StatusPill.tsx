import type { ConnectionState, LevelStatus } from "@/lib/types";

const LEVEL_STYLES: Record<LevelStatus, string> = {
  idle: "bg-surface-panel text-text-muted border-border/15",
  approaching: "bg-warning/15 text-warning border-warning/30",
  touched: "bg-negative/15 text-negative border-negative/30 shadow-[0_0_10px_-2px_rgba(239,68,68,0.6)]",
};

const LEVEL_LABELS: Record<LevelStatus, string> = {
  idle: "Idle",
  approaching: "Approaching",
  touched: "Touched",
};

export function LevelStatusPill({ status }: { status: LevelStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${LEVEL_STYLES[status]}`}
    >
      {status !== "idle" && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
      {LEVEL_LABELS[status]}
    </span>
  );
}

const CONN_STYLES: Record<ConnectionState, string> = {
  connecting: "bg-warning/15 text-warning border-warning/30",
  live: "bg-positive/15 text-positive border-positive/30 shadow-[0_0_10px_-2px_rgba(34,197,94,0.6)]",
  stale: "bg-warning/15 text-warning border-warning/30",
  disconnected: "bg-negative/15 text-negative border-negative/30",
};

const CONN_LABELS: Record<ConnectionState, string> = {
  connecting: "Connecting",
  live: "Live",
  stale: "Stale",
  disconnected: "Disconnected",
};

export function ConnectionPill({ state }: { state: ConnectionState }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${CONN_STYLES[state]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {CONN_LABELS[state]}
    </span>
  );
}

export function LevelTypePill({ type }: { type: "support" | "resistance" }) {
  const isSupport = type === "support";
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${
        isSupport ? "bg-positive/15 text-positive border-positive/30" : "bg-negative/15 text-negative border-negative/30"
      }`}
    >
      {isSupport ? "▲" : "▼"} {isSupport ? "Support" : "Resistance"}
    </span>
  );
}
