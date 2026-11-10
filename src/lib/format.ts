export function pipSize(isJpy: boolean): number {
  return isJpy ? 0.01 : 0.0001;
}

export function formatPrice(price: number, isJpy: boolean): string {
  return price.toFixed(isJpy ? 3 : 5);
}

export function pipsBetween(a: number, b: number, isJpy: boolean): number {
  return Math.abs(a - b) / pipSize(isJpy);
}

export function formatPips(pips: number): string {
  return `${pips.toFixed(1)} pips`;
}

export function formatTime(date: Date): string {
  return (
    date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }) + " UTC"
  );
}
