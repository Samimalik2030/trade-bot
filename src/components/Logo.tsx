export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <span
      className="brand-gradient-bg flex shrink-0 items-center justify-center rounded-md text-white"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
        <path d="M3 17l5-5 4 4 9-11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 5h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className={`font-sans italic font-extrabold tracking-tight text-sm ${dark ? "text-white" : "text-text-primary"}`}>
        PRICE <span className="brand-gradient-text">ALERT</span>
      </span>
    </span>
  );
}
