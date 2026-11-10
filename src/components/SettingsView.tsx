"use client";

export interface AlertSettings {
  approachPips: number;
  touchPips: number;
  cooldownMinutes: number;
}

function Field({
  label,
  hint,
  value,
  unit,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-text-muted mb-1.5">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-28 rounded-md border border-border/15 bg-surface-panel px-3 py-1.5 text-sm font-mono tabular-nums text-text-primary outline-none focus:ring-2 focus:ring-accent/50"
        />
        <span className="text-xs text-text-secondary">{unit}</span>
      </div>
      <p className="mt-1 text-[11px] text-text-muted">{hint}</p>
    </div>
  );
}

export function SettingsView({ settings, onChange }: { settings: AlertSettings; onChange: (s: AlertSettings) => void }) {
  return (
    <div className="max-w-xl rounded-lg border border-border/15 bg-surface-elevated p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-1">Detection thresholds</h3>
      <p className="text-xs text-text-secondary mb-5">
        Applies to every active level across all pairs. Changes take effect immediately.
      </p>

      <div className="flex flex-col gap-5">
        <Field
          label="Approaching distance"
          hint="Alert fires once price comes within this many pips of a level."
          value={settings.approachPips}
          unit="pips"
          onChange={(v) => onChange({ ...settings, approachPips: v })}
        />
        <Field
          label="Touching tolerance"
          hint="Alert upgrades to touching within this many pips of a level."
          value={settings.touchPips}
          unit="pips"
          onChange={(v) => onChange({ ...settings, touchPips: v })}
        />
        <Field
          label="Cooldown"
          hint="Minimum time before the same level can alert again, to prevent spam."
          value={settings.cooldownMinutes}
          unit="minutes"
          onChange={(v) => onChange({ ...settings, cooldownMinutes: v })}
        />
      </div>
    </div>
  );
}
