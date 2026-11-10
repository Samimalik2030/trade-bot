"use client";

import { useEffect, useRef, useState } from "react";

export function PriceCell({ value, format, className = "" }: { value: number; format: (n: number) => string; className?: string }) {
  const prev = useRef(value);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (value === prev.current) return;
    setFlash(value > prev.current ? "up" : "down");
    prev.current = value;
    const t = setTimeout(() => setFlash(null), 400);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <span
      data-flash={flash ?? undefined}
      className={`tabular-nums tracking-tight transition-colors duration-300 px-1 rounded-sm data-[flash=up]:bg-positive/15 data-[flash=down]:bg-negative/15 ${className}`}
    >
      {format(value)}
    </span>
  );
}
