"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShowcase } from "@/components/AuthShowcase";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    // Dummy auth — Phase 1 has no real backend yet. Any non-empty credentials pass.
    setTimeout(() => router.push("/dashboard"), 400);
  }

  return (
    <div className="flex flex-1 min-h-dvh items-center justify-center bg-surface-panel/50 px-4 py-10">
      <div className="w-full max-w-4xl rounded-xl border border-border/15 bg-surface-elevated overflow-hidden grid lg:grid-cols-[1.05fr_1fr] lg:min-h-[600px]">
        <AuthShowcase />

        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-[340px]">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <span className="flex size-7 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-white">FX</span>
            <span className="text-xs font-semibold tracking-wide text-text-primary uppercase">Price Alert</span>
          </div>

          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">Sign in</h1>
          <p className="text-sm text-text-secondary mt-2 mb-9 leading-relaxed">
            Welcome back. Enter your credentials to open the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-text-secondary mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 rounded-md border border-border/15 bg-surface-panel px-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-shadow duration-150 focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-medium text-text-secondary">
                  Password
                </label>
                <button type="button" className="text-xs font-medium text-accent hover:opacity-80 transition-opacity duration-150">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 rounded-md border border-border/15 bg-surface-panel px-3.5 pr-11 text-sm text-text-primary placeholder:text-text-muted outline-none transition-shadow duration-150 focus:border-accent/50 focus:ring-2 focus:ring-accent/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center text-text-muted hover:text-text-secondary transition-colors duration-150"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.4 5.5A10.4 10.4 0 0112 5c6 0 9.5 5.5 9.5 7a10.9 10.9 0 01-2.1 2.9M6.6 6.6C4.4 8 2.8 10 2.5 12c0 1.5 3.5 7 9.5 7 1.2 0 2.3-.2 3.3-.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="2.8" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer select-none -mt-1">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-3.5 rounded border-border/30 accent-[rgb(var(--accent))]"
              />
              Keep me signed in
            </label>

            {error && (
              <p className="rounded-md border border-negative/30 bg-negative/10 px-3 py-2 text-xs text-negative">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-md bg-accent text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                  <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {loading ? "Signing in" : "Sign in"}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/10" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">Demo build</span>
            <div className="h-px flex-1 bg-border/10" />
          </div>
          <p className="mt-3 text-center text-xs text-text-muted">Any email and password will sign you in.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
