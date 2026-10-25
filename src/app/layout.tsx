import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import Backdrop from "@/components/Backdrop";
import FloatingLinks from "@/components/FloatingLinks";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import { KEYWORDS, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/seo";
import { personJsonLd } from "@/lib/structured-data";
import "./globals.css";

// Self-hosted at build time: no request to Google from the visitor's browser,
// and size-adjusted fallbacks keep the font swap from shifting layout.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${profile.name}` },
  description: SITE_DESCRIPTION,
  applicationName: `${profile.name} Portfolio`,
  keywords: KEYWORDS,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: "/" },
  // Icons come from the app/ file conventions (icon.svg, apple-icon.tsx).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: profile.name,
    locale: "en_IN",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: profile.firstName,
    lastName: profile.lastName,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0f10" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body>
        <Backdrop />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <FloatingLinks />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
