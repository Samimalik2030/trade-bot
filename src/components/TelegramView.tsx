"use client";

import { useState } from "react";

export function TelegramView() {
  const [linked, setLinked] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const code = "FX-7K2Q9P";

  return (
    <div className="max-w-xl flex flex-col gap-4">
      <div className="rounded-lg border border-border/15 bg-surface-elevated p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-text-primary">Connection status</h3>
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${
              linked ? "bg-positive/15 text-positive border-positive/30" : "bg-surface-panel text-text-muted border-border/15"
            }`}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-current" />
            {linked ? "Linked" : "Not linked"}
          </span>
        </div>
        <p className="text-xs text-text-secondary">
          Open Telegram, start a chat with the bot, and send <span className="font-mono text-text-primary">/start</span> with the
          code below to link your account.
        </p>

        <div className="mt-4 flex items-center justify-between rounded-md border border-border/15 bg-surface-panel px-4 py-3">
          <span className="font-mono text-lg font-semibold tracking-wider text-text-primary">{code}</span>
          <button
            onClick={() => navigator.clipboard?.writeText(code)}
            className="rounded-md border border-border/15 bg-surface-elevated px-2.5 py-1 text-[11px] font-medium text-text-secondary hover:bg-surface-hover/50 transition-colors duration-150"
          >
            Copy
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setLinked((v) => !v)}
            className="rounded-md bg-accent px-3.5 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
          >
            {linked ? "Unlink account" : "I've sent /start"}
          </button>
          <button
            disabled={!linked}
            onClick={() => {
              setTestSent(true);
              setTimeout(() => setTestSent(false), 2500);
            }}
            className="rounded-md border border-border/15 bg-surface-elevated px-3.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-hover/40 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send test alert
          </button>
        </div>
        {testSent && <p className="mt-2 text-xs text-positive">Test alert sent — check your Telegram chat.</p>}
      </div>

      <div className="rounded-lg border border-border/15 bg-surface-elevated p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Delivery</h3>
        <p className="text-xs text-text-secondary">
          If a message fails to send, the system retries automatically and logs the failure so no alert is silently lost.
        </p>
      </div>
    </div>
  );
}
