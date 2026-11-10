"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar, type View } from "@/components/Sidebar";
import { PairCard } from "@/components/PairCard";
import { AlertHistory } from "@/components/AlertHistory";
import { AddPairModal } from "@/components/AddPairModal";
import { OverviewView } from "@/components/OverviewView";
import { TelegramView } from "@/components/TelegramView";
import { SettingsView, type AlertSettings } from "@/components/SettingsView";
import { INITIAL_ALERTS, INITIAL_LEVELS, INITIAL_PAIRS } from "@/lib/mock";
import { pipsBetween } from "@/lib/format";
import type { AlertRecord, ConnectionState, Level, LevelType, Pair } from "@/lib/types";

export default function DashboardPage() {
  const [pairs, setPairs] = useState<Pair[]>(INITIAL_PAIRS);
  const [levels, setLevels] = useState<Level[]>(INITIAL_LEVELS);
  const [alerts] = useState<AlertRecord[]>(INITIAL_ALERTS);
  const [view, setView] = useState<View>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connection, setConnection] = useState<ConnectionState>("connecting");
  const [addPairOpen, setAddPairOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [settings, setSettings] = useState<AlertSettings>({ approachPips: 10, touchPips: 2, cooldownMinutes: 30 });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setConnection("live"), 900);
    return () => clearTimeout(t);
  }, []);

  // Simulated live price feed. A real build swaps this for a websocket/polling price source.
  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((p) => {
          if (!p.enabled) return p;
          const pip = p.isJpy ? 0.01 : 0.0001;
          const wiggle = (Math.random() - 0.5) * pip * 6;
          const next = Number((p.price + wiggle).toFixed(p.isJpy ? 3 : 5));
          return { ...p, prevPrice: p.price, price: next };
        }),
      );
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Level status (idle/approaching/touched) is derived from live price, not stored as state.
  function levelStatus(level: Level, pair: Pair | undefined): Level["status"] {
    if (!level.active || !pair || !pair.enabled) return "idle";
    const distance = pipsBetween(pair.price, level.price, pair.isJpy);
    return distance <= settings.touchPips ? "touched" : distance <= settings.approachPips ? "approaching" : "idle";
  }

  function toggleEnabled(pairId: string) {
    setPairs((prev) => prev.map((p) => (p.id === pairId ? { ...p, enabled: !p.enabled } : p)));
  }

  function addLevel(pairId: string, data: { type: LevelType; price: number; note?: string; active: boolean }) {
    setLevels((prev) => [
      ...prev,
      { id: `l${Date.now()}`, pairId, type: data.type, price: data.price, note: data.note, active: data.active, status: "idle" },
    ]);
  }

  function editLevel(levelId: string, data: { type: LevelType; price: number; note?: string; active: boolean }) {
    setLevels((prev) => prev.map((l) => (l.id === levelId ? { ...l, ...data } : l)));
  }

  function deleteLevel(levelId: string) {
    setLevels((prev) => prev.filter((l) => l.id !== levelId));
  }

  function toggleLevelActive(levelId: string) {
    setLevels((prev) => prev.map((l) => (l.id === levelId ? { ...l, active: !l.active } : l)));
  }

  const enabledPairs = pairs.filter((p) => p.enabled);

  return (
    <div className="flex flex-1 min-h-screen">
      <Sidebar view={view} onViewChange={setView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col min-w-0">
        <Header
          view={view}
          connection={connection}
          theme={theme}
          onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {view === "overview" && <OverviewView pairs={pairs} levels={levels} levelStatus={levelStatus} />}

          {view === "pairs" && (
            <>
              <div className="flex items-end justify-between mb-4">
                <p className="text-xs text-text-secondary">Live prices update every few seconds while monitoring is active.</p>
                <button
                  onClick={() => setAddPairOpen(true)}
                  className="rounded-md border border-border/15 bg-surface-elevated px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-hover/40 transition-colors duration-150 shrink-0"
                >
                  Manage pairs
                </button>
              </div>

              {enabledPairs.length === 0 ? (
                <div className="rounded-lg border border-border/15 bg-surface-elevated px-4 py-14 text-center">
                  <p className="text-sm text-text-secondary">No pairs enabled yet.</p>
                  <button
                    onClick={() => setAddPairOpen(true)}
                    className="mt-3 rounded-md bg-accent px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
                  >
                    Add a pair
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
                  {enabledPairs.map((pair) => (
                    <PairCard
                      key={pair.id}
                      pair={pair}
                      levels={levels
                        .filter((l) => l.pairId === pair.id)
                        .map((l) => ({ ...l, status: levelStatus(l, pair) }))}
                      onToggleEnabled={toggleEnabled}
                      onAddLevel={addLevel}
                      onEditLevel={editLevel}
                      onDeleteLevel={deleteLevel}
                      onToggleLevelActive={toggleLevelActive}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {view === "history" && <AlertHistory alerts={alerts} />}
          {view === "telegram" && <TelegramView />}
          {view === "settings" && <SettingsView settings={settings} onChange={setSettings} />}
        </main>
      </div>

      {addPairOpen && <AddPairModal pairs={pairs} onClose={() => setAddPairOpen(false)} onToggle={toggleEnabled} />}
    </div>
  );
}
