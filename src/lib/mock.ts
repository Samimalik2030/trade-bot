import type { AlertRecord, Level, Pair } from "./types";

export const INITIAL_PAIRS: Pair[] = [
  { id: "eurusd", symbol: "EURUSD", name: "Euro / US Dollar", price: 1.0852, prevPrice: 1.0852, enabled: true, isJpy: false },
  { id: "gbpusd", symbol: "GBPUSD", name: "British Pound / US Dollar", price: 1.2634, prevPrice: 1.2634, enabled: true, isJpy: false },
  { id: "usdjpy", symbol: "USDJPY", name: "US Dollar / Japanese Yen", price: 154.218, prevPrice: 154.218, enabled: true, isJpy: true },
  { id: "audusd", symbol: "AUDUSD", name: "Australian Dollar / US Dollar", price: 0.6512, prevPrice: 0.6512, enabled: true, isJpy: false },
  { id: "usdcad", symbol: "USDCAD", name: "US Dollar / Canadian Dollar", price: 1.3978, prevPrice: 1.3978, enabled: false, isJpy: false },
  { id: "usdchf", symbol: "USDCHF", name: "US Dollar / Swiss Franc", price: 0.8821, prevPrice: 0.8821, enabled: false, isJpy: false },
  { id: "nzdusd", symbol: "NZDUSD", name: "New Zealand Dollar / US Dollar", price: 0.5887, prevPrice: 0.5887, enabled: false, isJpy: false },
  { id: "xauusd", symbol: "XAUUSD", name: "Gold / US Dollar", price: 2638.4, prevPrice: 2638.4, enabled: false, isJpy: false },
];

export const INITIAL_LEVELS: Level[] = [
  { id: "l1", pairId: "eurusd", type: "resistance", price: 1.085, note: "Daily high zone", active: true, status: "touched" },
  { id: "l2", pairId: "eurusd", type: "support", price: 1.0795, active: true, status: "idle" },
  { id: "l3", pairId: "gbpusd", type: "resistance", price: 1.2650, note: "Weekly supply", active: true, status: "approaching" },
  { id: "l4", pairId: "gbpusd", type: "support", price: 1.258, active: true, status: "idle" },
  { id: "l5", pairId: "usdjpy", type: "resistance", price: 154.5, active: true, status: "idle" },
  { id: "l6", pairId: "usdjpy", type: "support", price: 153.8, active: false, status: "idle" },
  { id: "l7", pairId: "audusd", type: "support", price: 0.6495, note: "200 EMA confluence", active: true, status: "approaching" },
];

export const INITIAL_ALERTS: AlertRecord[] = [
  { id: "a1", pairSymbol: "EURUSD", level: 1.085, price: 1.08498, status: "Touching Resistance", time: "10 Nov 2026, 14:32 UTC" },
  { id: "a2", pairSymbol: "GBPUSD", level: 1.265, price: 1.2639, status: "Approaching Resistance", time: "10 Nov 2026, 13:58 UTC" },
  { id: "a3", pairSymbol: "AUDUSD", level: 0.6495, price: 0.6499, status: "Approaching Support", time: "10 Nov 2026, 11:04 UTC" },
  { id: "a4", pairSymbol: "USDJPY", level: 154.5, price: 154.497, status: "Touching Resistance", time: "9 Nov 2026, 21:17 UTC" },
];
