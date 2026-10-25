import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Without the real domain, canonical links, the sitemap, robots.txt and the
// link-preview image all point at localhost. Not fatal (local production
// builds are useful), but it must never go live that way.
if (isProd && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set — URLs will point at http://localhost:3000.\n" +
      "   Set it to the live domain before a deploy build (see .env.example).\n",
  );
}

// The site loads nothing from third parties: fonts are self-hosted by
// next/font and there is no analytics. 'unsafe-inline' on script-src covers the
// inline bootstrap scripts Next emits for statically rendered pages. The policy
// is production-only because the dev server relies on eval for fast refresh.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Browsers only honour this over HTTPS, so it is harmless on localhost.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
  // Process isolation from other origins (no window.opener access, no
  // cross-origin popups reaching into this page).
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  // Machine-readable opt-out of text-and-data mining (W3C TDMRep, EU DSM
  // Directive art. 4), plus the noai convention some crawlers honour. Search
  // indexing is unaffected.
  { key: "tdm-reservation", value: "1" },
  { key: "X-Robots-Tag", value: "noai, noimageai" },
  ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // The site's CSS is a few KB; inlining it removes the render-blocking
    // stylesheet request from the critical path.
    inlineCss: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
