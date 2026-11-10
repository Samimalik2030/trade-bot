"use client";

import { ConnectionPill } from "./StatusPill";
import type { ConnectionState } from "@/lib/types";
import type { View } from "./Sidebar";

const TITLES: Record<View, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Live status across all monitored pairs" },
  pairs: { title: "Pairs & levels", subtitle: "Manage pairs and support/resistance levels" },
  history: { title: "Alert history", subtitle: "Past Telegram notifications" },
  telegram: { title: "Telegram", subtitle: "Link your account to receive alerts" },
  settings: { title: "Settings", subtitle: "Alert distance, tolerance and cooldown" },
};

interface HeaderProps {
  view: View;
  connection: ConnectionState;
  theme: "dark" | "light";
  onThemeToggle: () => void;
  onMenuClick: () => void;
}

export function Header({ view, connection, theme, onThemeToggle, onMenuClick }: HeaderProps) {
  const { title, subtitle } = TITLES[view];
  return (
    <header className="sticky top-0 z-20 border-b border-border/10 bg-surface-elevated px-4 sm:px-6 lg:px-8">
      <div className="flex h-14 items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="rounded-md p-1.5 text-text-secondary hover:bg-surface-hover/40 lg:hidden"
          >
            ☰
          </button>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-text-primary leading-tight truncate">{title}</h2>
            <p className="text-[11px] text-text-secondary truncate hidden sm:block">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <ConnectionPill state={connection} />
          <button
            onClick={onThemeToggle}
            aria-label="Toggle theme"
            className="rounded-md border border-border/15 bg-surface-panel px-2 py-1 text-xs text-text-secondary hover:bg-surface-hover/50 transition-colors duration-150"
          >
            {theme === "dark" ? "☾" : "☀"}
          </button>
        </div>
      </div>
    </header>
  );
}
