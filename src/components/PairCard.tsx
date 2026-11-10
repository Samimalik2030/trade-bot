"use client";

import { useState } from "react";
import type { Level, LevelType, Pair } from "@/lib/types";
import { formatPips, formatPrice, pipsBetween } from "@/lib/format";
import { PriceCell } from "./PriceCell";
import { LevelStatusPill, LevelTypePill } from "./StatusPill";
import { LevelModal } from "./LevelModal";
import { PairBadge } from "./PairBadge";

interface PairCardProps {
  pair: Pair;
  levels: Level[];
  onToggleEnabled: (pairId: string) => void;
  onAddLevel: (pairId: string, data: { type: LevelType; price: number; note?: string; active: boolean }) => void;
  onEditLevel: (levelId: string, data: { type: LevelType; price: number; note?: string; active: boolean }) => void;
  onDeleteLevel: (levelId: string) => void;
  onToggleLevelActive: (levelId: string) => void;
}

export function PairCard({
  pair,
  levels,
  onToggleEnabled,
  onAddLevel,
  onEditLevel,
  onDeleteLevel,
  onToggleLevelActive,
}: PairCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<Level | undefined>(undefined);

  const activeLevels = levels.filter((l) => l.active);
  const nearest = activeLevels
    .map((l) => ({ level: l, distance: pipsBetween(pair.price, l.price, pair.isJpy) }))
    .sort((a, b) => a.distance - b.distance)[0];

  const delta = pair.price - pair.prevPrice;
  const deltaPips = delta / (pair.isJpy ? 0.01 : 0.0001);

  function openCreate() {
    setEditingLevel(undefined);
    setModalOpen(true);
  }

  function openEdit(level: Level) {
    setEditingLevel(level);
    setModalOpen(true);
  }

  function handleSave(data: { type: LevelType; price: number; note?: string; active: boolean }) {
    if (editingLevel) {
      onEditLevel(editingLevel.id, data);
    } else {
      onAddLevel(pair.id, data);
    }
    setModalOpen(false);
  }

  return (
    <div className="rounded-lg border border-border/15 bg-surface-elevated overflow-hidden flex flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/10">
        <div className="flex items-center gap-3 min-w-0">
          <PairBadge symbol={pair.symbol} />
          <div className="min-w-0">
            <h3 className="font-mono text-sm font-semibold text-text-primary leading-tight">{pair.symbol}</h3>
            <span className="text-[11px] text-text-secondary truncate block">{pair.name}</span>
          </div>
        </div>
        <button
          role="switch"
          aria-checked={pair.enabled}
          aria-label={`${pair.enabled ? "Disable" : "Enable"} ${pair.symbol}`}
          onClick={() => onToggleEnabled(pair.id)}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-150 ${
            pair.enabled ? "bg-accent" : "bg-surface-panel"
          }`}
        >
          <span
            className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform duration-150 ${
              pair.enabled ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/10 bg-surface-panel/40">
        <div>
          <div className="flex items-baseline gap-2">
            <PriceCell
              value={pair.price}
              format={(v) => formatPrice(v, pair.isJpy)}
              className="font-mono text-xl font-semibold text-text-primary"
            />
          </div>
          <span className={`tabular-nums text-[11px] font-medium ${deltaPips >= 0 ? "text-positive" : "text-negative"}`}>
            {deltaPips >= 0 ? "+" : ""}
            {deltaPips.toFixed(1)} pips
          </span>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-text-muted">Nearest level</p>
          <p className="mt-0.5 text-sm font-medium text-text-secondary tabular-nums">
            {nearest ? formatPips(nearest.distance) : "—"}
          </p>
        </div>
      </div>

      <div className="divide-y divide-border/10 flex-1">
        {levels.length === 0 && (
          <p className="px-4 py-8 text-center text-xs text-text-muted">No levels yet. Add a support or resistance level.</p>
        )}
        {levels.map((level) => (
          <div key={level.id} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5 hover:bg-surface-hover/30 transition-colors duration-150">
            <LevelTypePill type={level.type} />
            <span className="font-mono text-sm tabular-nums text-text-primary">
              {formatPrice(level.price, pair.isJpy)}
            </span>
            <LevelStatusPill status={level.status} />
            {level.note && <span className="text-xs text-text-muted truncate max-w-32">{level.note}</span>}
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => onToggleLevelActive(level.id)}
                className="text-[11px] px-2 py-1 rounded text-text-secondary hover:bg-surface-hover/50 hover:text-text-primary transition-colors duration-150"
              >
                {level.active ? "Disable" : "Enable"}
              </button>
              <button
                onClick={() => openEdit(level)}
                className="text-[11px] px-2 py-1 rounded text-text-secondary hover:bg-surface-hover/50 hover:text-text-primary transition-colors duration-150"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteLevel(level.id)}
                className="text-[11px] px-2 py-1 rounded text-negative hover:bg-negative/10 transition-colors duration-150"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 border-t border-border/10">
        <button
          onClick={openCreate}
          className="w-full rounded-md text-xs font-medium text-accent hover:bg-accent/10 transition-colors duration-150 py-1.5"
        >
          + Add level
        </button>
      </div>

      {modalOpen && (
        <LevelModal pairSymbol={pair.symbol} initial={editingLevel} onClose={() => setModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
}
