"use client";

import { useEffect, useRef, useState } from "react";

/** Copies the address to the clipboard; the mailto link beside it still works without JS. */
export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  return (
    <button type="button" className="btn" onClick={copy}>
      <span className="mono" aria-hidden="true">
        {state === "copied" ? "✓" : "⧉"}
      </span>
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy address"}
      </span>
    </button>
  );
}
