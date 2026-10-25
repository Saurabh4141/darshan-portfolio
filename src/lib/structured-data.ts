import { SITE_URL, education, profile, toolkit } from "@/content/profile";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// One linked @graph: Person is the entity search engines tie the name query
// to, WebSite declares the site, ProfilePage says the home page is *about*
// that person. Same shape as gaikwadsaurabh.com.
export const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: profile.name,
      alternateName: [profile.fullName, `${profile.name} Pune`],
      givenName: profile.firstName,
      familyName: profile.lastName,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: profile.role,
      description: SITE_DESCRIPTION,
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      nationality: { "@type": "Country", name: "India" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Sinhgad College of Science" },
        { "@type": "CollegeOrUniversity", name: "Savitribai Phule Pune University" },
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: `${education[0].title}, ${education[0].year}`,
      },
      sameAs: [profile.linkedin],
      knowsAbout: toolkit.flatMap((g) => g.items),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: profile.name,
      alternateName: `${profile.name} Portfolio`,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
    },
  ],
};
