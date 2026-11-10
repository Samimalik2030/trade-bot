export type LevelType = "support" | "resistance";
export type LevelStatus = "idle" | "approaching" | "touched";
export type ConnectionState = "connecting" | "live" | "stale" | "disconnected";

export interface Level {
  id: string;
  pairId: string;
  type: LevelType;
  price: number;
  note?: string;
  active: boolean;
  status: LevelStatus;
}

export interface Pair {
  id: string;
  symbol: string;
  name: string;
  price: number;
  prevPrice: number;
  enabled: boolean;
  isJpy: boolean;
}

export type AlertStatus = "Approaching Support" | "Approaching Resistance" | "Touching Support" | "Touching Resistance";

export interface AlertRecord {
  id: string;
  pairSymbol: string;
  level: number;
  price: number;
  status: AlertStatus;
  time: string;
}
