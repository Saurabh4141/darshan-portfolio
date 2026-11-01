import type { Metadata } from "next";
import JobsTable from "@/components/JobsTable";
import { CHECKED_ON } from "@/content/jobs";

// A private working page: linked from the footer only, left out of the sitemap,
// and marked noindex so search engines that do find it will not list it. It is
// not disallowed in robots.txt, because a crawler must be able to read the
// noindex to honour it.
export const metadata: Metadata = {
  title: "Jobs",
  description: "Fresher software jobs and Pune walk-ins found on Naukri and LinkedIn.",
  alternates: { canonical: "/jobs" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

// This page is always light, whatever the visitor's system theme. The tokens
// below are the light values from globals.css and Backdrop.module.css; the
// doubled :root outranks the dark-mode media query. The style tag is rendered
// with the page, so there is no flash, and it leaves with the page when the
// visitor navigates back to the portfolio.
const LIGHT_THEME = `
:root:root {
  color-scheme: light;
  --bg: #f2f3ef;
  --bg-2: #e8eae4;
  --bg-3: #dde0d8;
  --ink: #0f1312;
  --ink-2: #3a423e;
  --ink-3: #555e5a;
  --rule: #cdd2ca;
  --rule-strong: #0f1312;
  --on-ink: #f2f3ef;
  --cool: #16839e;
  --warm: #b0730a;
  --hot: #cf3f22;
}
:root:root [data-backdrop] {
  --board-line: color-mix(in srgb, var(--ink) 14%, var(--bg));
  --board-dot: rgb(15 19 18 / 0.14);
  --glow: 15%;
}
`;

export default function JobsPage() {
  return (
    <section id="top" className="wrap" style={{ paddingBlock: "clamp(48px, 8vw, 96px)" }}>
      <style>{LIGHT_THEME}</style>
      <p className="mono" style={{ color: "var(--ink-3)", fontSize: "0.8125rem" }}>
        Checked {CHECKED_ON} · Naukri and LinkedIn
      </p>
      <h1
        style={{
          marginTop: 12,
          fontSize: "clamp(2.25rem, 6vw, 4rem)",
          fontWeight: 800,
          lineHeight: 0.98,
          letterSpacing: "-0.035em",
        }}
      >
        Jobs and walk-ins
      </h1>
      <p style={{ margin: "16px 0 clamp(28px, 5vw, 48px)", maxWidth: "62ch", color: "var(--ink-2)" }}>
        Fresher software openings found by searching Naukri and LinkedIn. Jobs can be in any city; walk-ins are Pune
        only. Posted dates and applicant counts are as they read on {CHECKED_ON}, so confirm each posting before
        applying.
      </p>
      <JobsTable />
    </section>
  );
}
