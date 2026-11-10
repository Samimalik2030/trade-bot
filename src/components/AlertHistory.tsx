import type { AlertRecord } from "@/lib/types";

function statusTone(status: AlertRecord["status"]) {
  if (status.startsWith("Touching")) return "bg-negative/15 text-negative border-negative/30";
  return "bg-warning/15 text-warning border-warning/30";
}

export function AlertHistory({ alerts }: { alerts: AlertRecord[] }) {
  return (
    <div className="rounded-lg border border-border/15 bg-surface-elevated overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border/10">
        <h2 className="text-sm font-semibold text-text-primary">Alert history</h2>
        <p className="text-xs text-text-secondary mt-0.5">Past Telegram notifications sent for your active levels.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-surface-panel/40 sticky top-0">
            <tr className="text-left text-[10px] uppercase tracking-wider text-text-muted">
              <th className="px-4 py-2 font-medium">Pair</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium text-right">Level</th>
              <th className="px-4 py-2 font-medium text-right">Price</th>
              <th className="px-4 py-2 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {alerts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                  No alerts yet. They will appear here once a level is approached or touched.
                </td>
              </tr>
            )}
            {alerts.map((a) => (
              <tr key={a.id} className="hover:bg-surface-hover/30 transition-colors duration-150">
                <td className="px-4 py-2.5 font-mono font-medium text-text-primary">{a.pairSymbol}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${statusTone(a.status)}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums text-text-secondary">{a.level}</td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums text-text-primary">{a.price}</td>
                <td className="px-4 py-2.5 text-right text-text-muted whitespace-nowrap">{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
