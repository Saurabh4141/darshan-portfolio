import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(72px, 14vw, 160px)" }}>
      <p className="mono" style={{ color: "var(--ink-3)", fontSize: "0.8125rem" }}>
        404 · No signal
      </p>
      <h1
        style={{
          marginTop: 12,
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: "-0.035em",
        }}
      >
        This page doesn&rsquo;t exist.
      </h1>
      <p style={{ marginTop: 16, color: "var(--ink-2)" }}>
        The link may be old or mistyped. Everything lives on one page.
      </p>
      <Link prefetch={false} href="/" className="btn" style={{ marginTop: 28 }}>
        Back to the portfolio <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
