"use client";

import { useState } from "react";
import type { Level, LevelType } from "@/lib/types";

interface LevelModalProps {
  pairSymbol: string;
  initial?: Level;
  onClose: () => void;
  onSave: (data: { type: LevelType; price: number; note?: string; active: boolean }) => void;
}

export function LevelModal({ pairSymbol, initial, onClose, onSave }: LevelModalProps) {
  const [type, setType] = useState<LevelType>(initial?.type ?? "support");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [note, setNote] = useState(initial?.note ?? "");
  const [active, setActive] = useState(initial?.active ?? true);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = Number(price);
    if (!price || Number.isNaN(parsed) || parsed <= 0) {
      setError("Enter a valid price.");
      return;
    }
    onSave({ type, price: parsed, note: note.trim() || undefined, active });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-lg border border-border/15 bg-surface-elevated p-5 shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-semibold text-text-primary">
            {initial ? "Edit level" : "New level"} <span className="font-mono text-xs text-text-secondary ml-1">{pairSymbol}</span>
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-sm" aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-text-muted mb-1.5">Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType("support")}
                className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                  type === "support"
                    ? "bg-positive/15 text-positive border-positive/30"
                    : "bg-surface-panel text-text-secondary border-border/15 hover:bg-surface-hover/40"
                }`}
              >
                ▲ Support
              </button>
              <button
                type="button"
                onClick={() => setType("resistance")}
                className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                  type === "resistance"
                    ? "bg-negative/15 text-negative border-negative/30"
                    : "bg-surface-panel text-text-secondary border-border/15 hover:bg-surface-hover/40"
                }`}
              >
                ▼ Resistance
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="level-price" className="block text-[11px] uppercase tracking-wider text-text-muted mb-1.5">
              Price
            </label>
            <input
              id="level-price"
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1.08500"
              className="w-full rounded-md border border-border/15 bg-surface-panel px-3 py-1.5 text-sm font-mono tabular-nums text-text-primary outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label htmlFor="level-note" className="block text-[11px] uppercase tracking-wider text-text-muted mb-1.5">
              Note (optional)
            </label>
            <input
              id="level-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Daily high zone"
              className="w-full rounded-md border border-border/15 bg-surface-panel px-3 py-1.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="size-3.5 rounded border-border/30 accent-[rgb(var(--accent))]"
            />
            Active
          </label>

          {error && <p className="text-xs text-negative">{error}</p>}

          <div className="flex gap-2 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border/15 bg-surface-elevated px-4 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-hover/40 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-accent px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
            >
              {initial ? "Save changes" : "Add level"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
