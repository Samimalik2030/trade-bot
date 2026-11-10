"use client";

import { Logo } from "./Logo";

export type View = "overview" | "pairs" | "history" | "telegram" | "settings";

const NAV_ITEMS: { id: View; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "◧" },
  { id: "pairs", label: "Pairs & levels", icon: "≋" },
  { id: "history", label: "Alert history", icon: "▤" },
  { id: "telegram", label: "Telegram", icon: "✉" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

interface SidebarProps {
  view: View;
  onViewChange: (view: View) => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ view, onViewChange, open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 shrink-0 border-r border-border/10 bg-surface-elevated transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center px-4 border-b border-border/10">
          <Logo />
        </div>

        <nav className="flex flex-col gap-0.5 p-3">
          {NAV_ITEMS.map((item) => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  onClose();
                }}
                className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-medium transition-colors duration-150 border-l-2 ${
                  active
                    ? "bg-accent/10 border-accent text-accent"
                    : "border-transparent text-text-muted hover:bg-surface-hover/40 hover:text-text-secondary"
                }`}
              >
                <span aria-hidden className="w-4 text-center text-sm">
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-3 absolute bottom-0 w-full">
          <p className="px-3 py-2 text-[10px] text-text-muted">Phase 1 · Dashboard & levels</p>
        </div>
      </aside>
    </>
  );
}
