"use client";

import type { Pair } from "@/lib/types";

interface AddPairModalProps {
  pairs: Pair[];
  onClose: () => void;
  onToggle: (pairId: string) => void;
}

export function AddPairModal({ pairs, onClose, onToggle }: AddPairModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-lg border border-border/15 bg-surface-elevated p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-semibold text-text-primary">Manage pairs</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-sm" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="flex flex-col divide-y divide-border/10 -mx-1">
          {pairs.map((p) => (
            <label key={p.id} className="flex items-center justify-between gap-3 px-1 py-2.5 cursor-pointer">
              <div>
                <p className="font-mono text-sm font-medium text-text-primary">{p.symbol}</p>
                <p className="text-xs text-text-secondary">{p.name}</p>
              </div>
              <input
                type="checkbox"
                checked={p.enabled}
                onChange={() => onToggle(p.id)}
                className="size-4 rounded border-border/30 accent-[rgb(var(--accent))]"
              />
            </label>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-md bg-accent px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
        >
          Done
        </button>
      </div>
    </div>
  );
}
