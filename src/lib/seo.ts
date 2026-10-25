import { SITE_URL, education, profile, toolkit } from "@/content/profile";

export const SITE_TITLE = `${profile.name} — ${profile.role} (${profile.focus})`;

export const SITE_DESCRIPTION = `${profile.name} is a Computer Science graduate (BCS, 2026) in ${profile.location}, working in Python, SQL, Generative AI / LLM integration and Flutter, with an end-to-end IoT wearable app and internships in IoT and technical product roles.`;

export const KEYWORDS = [
  profile.name,
  `${profile.name} portfolio`,
  "Software Developer Pune",
  "Python Developer",
  "Flutter Developer",
  "Generative AI",
  "LLM Integration",
  "IoT",
  "ESP32",
  "Entry-level Software Developer",
];

/** schema.org Person, rendered as JSON-LD in the layout. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education[0].place,
  },
  knowsAbout: toolkit.flatMap((g) => g.items),
  sameAs: [profile.linkedin],
};

export { SITE_URL };
