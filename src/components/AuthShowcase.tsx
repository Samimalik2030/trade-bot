import { formatPrice } from "@/lib/format";
import { INITIAL_PAIRS } from "@/lib/mock";
import { Logo } from "./Logo";

const SPARK_POINTS = "0,28 10,24 20,26 30,18 40,20 50,12 60,15 70,8 80,11 90,4 100,7";

const BADGES = ["Price alerts", "Telegram notifications", "Support & resistance", "Multi-pair monitoring"];

export function AuthShowcase() {
  const hero = INITIAL_PAIRS[0];
  const tape = INITIAL_PAIRS.slice(1, 6);

  return (
    <div className="hidden lg:flex relative flex-col justify-between h-full px-10 py-10 bg-[#070910] text-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-2)))" }}
      />

      <Logo dark className="relative" />

      <div className="relative">
        <h1 className="text-[28px] font-semibold leading-[1.2] tracking-tight max-w-sm">
          Set the level.
          <br />
          We watch the tape.
        </h1>
        <p className="mt-3 text-sm text-white/55 max-w-xs leading-relaxed">
          Support and resistance alerts across majors and gold, delivered to Telegram the instant price arrives.
        </p>

        <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-xs font-medium text-white/50">{hero.symbol}</p>
              <p className="mt-1 font-mono text-3xl font-semibold tabular-nums text-white">{formatPrice(hero.price, hero.isJpy)}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium tabular-nums text-positive">▲ +4.2 pips</span>
            </div>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border bg-negative/15 text-negative border-negative/30 shadow-[0_0_12px_-2px_rgba(239,68,68,0.6)]">
              <span aria-hidden className="size-1.5 rounded-full bg-current" />
              Touching resistance
            </span>
          </div>
          <svg viewBox="0 0 100 32" className="mt-4 w-full h-10 text-positive" preserveAspectRatio="none">
            <polyline points={SPARK_POINTS} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] divide-y divide-white/10">
          {tape.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-2 text-xs">
              <span className="font-mono font-medium text-white/60">{p.symbol}</span>
              <span className="font-mono tabular-nums text-white">{formatPrice(p.price, p.isJpy)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-wrap gap-x-4 gap-y-1.5">
        {BADGES.map((b) => (
          <span key={b} className="inline-flex items-center gap-1 text-[11px] text-white/45">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--accent-2))" strokeWidth="3">
              <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
