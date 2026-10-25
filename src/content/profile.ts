/**
 * Every fact on the site lives here and comes from Darshan's resume
 * (Darshan Gaiwkad.pdf in the project root). Components only render this data.
 * Rewording is fine; adding claims the resume doesn't make is not.
 *
 * Deliberately left out of the page text: the phone number and the HSC/SSC
 * percentages. Add them here if Darshan wants them shown. (Both are in the
 * resume PDF served from public/, which is linked from the site.)
 */

/**
 * The canonical address (no www; the server redirects www and http here).
 * NEXT_PUBLIC_SITE_URL overrides it at build time, e.g. for a staging copy.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://darshangaikwad.cloud").replace(/\/$/, "");

export const profile = {
  name: "Darshan Gaikwad",
  fullName: "Darshan Satyavan Gaikwad",
  firstName: "Darshan",
  lastName: "Gaikwad",
  initials: "DG",
  role: "Software Developer",
  focus: "Python · AI · Flutter",
  location: "Pune, Maharashtra",
  email: "darshgaikwad2005@gmail.com",
  linkedin: "https://linkedin.com/in/darshan-gaikwad-13b139286",
  /** A copy of the resume in public/; the original in the project root is never served. */
  resume: "/Darshan_Gaikwad_Resume.pdf",
  seeking: "Seeking an entry-level Software Developer role",
  intro:
    "I build software that connects the physical and the digital — from a temperature sensor wired to an ESP32 to the Flutter app that shows its reading on a phone.",
  summary:
    "Computer Science graduate (BCS, 2026) working in Python, SQL and Generative AI / LLM integration, with hands-on cross-platform mobile development in Flutter. I've built and shipped an end-to-end IoT wearable app and completed internships in IoT and technical product roles. I'm looking for an entry-level software developer role where I can build and ship reliable, user-focused software.",
};

/** Header navigation, in page order. */
export const sections = [
  { id: "build", label: "Build" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Toolkit" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

/** The hero's signal path: the three stages his skills cover, end to end. */
export const signalPath = [
  { stage: "Sense", detail: "ESP32 · sensors · IoT protocols" },
  { stage: "Process", detail: "Python · SQL · LLM integration" },
  { stage: "Present", detail: "Flutter apps · Power BI" },
];

/** Counts derived directly from the resume's sections. */
export const facts = [
  { value: "BCS", label: "Computer Science, SPPU · 2026" },
  { value: "2", label: "Internships · 2026" },
  { value: "4", label: "Certifications" },
  { value: "1", label: "IoT wearable, built & shipped" },
];

export const project = {
  name: "Thermowear Jacket",
  tagline: "Smart temperature-controlled wearable",
  kind: "Academic group project",
  stack: ["Flutter", "IoT", "ESP32 Microcontroller", "DS18B20 Sensor"],
  overview:
    "A heated jacket that watches the wearer's body temperature in real time and adjusts its own heating to keep them safe and comfortable.",
  points: [
    {
      title: "Real-time sensing",
      body: "Body temperature is monitored in real time with a DS18B20 sensor and an ESP32 module, and the jacket adjusts its heating level automatically.",
    },
    {
      title: "Cross-platform app",
      body: "A mobile app built in Flutter reads live temperature data from the ESP32 module and displays it to the wearer.",
    },
    {
      title: "Auto and manual control",
      body: "An Auto mode, plus manual controls that switch heating between Low, Medium and High.",
    },
  ],
  /** Matches the jacket's own control model; drives the page's accent. */
  modes: [
    { id: "auto", label: "Auto" },
    { id: "low", label: "Low" },
    { id: "medium", label: "Medium" },
    { id: "high", label: "High" },
  ],
};

/** Months covered by the experience timeline (both internships fall in 2026). */
export const timelineMonths = ["Jan", "Feb", "Mar"];

export const experience = [
  {
    role: "IoT & Robotics Intern",
    company: "Incubator Pvt. Ltd.",
    place: "Pune",
    dates: "Jan 2026 – Feb 2026",
    // Inclusive month indexes into timelineMonths.
    span: [0, 1],
    points: [
      "Worked hands-on with IoT architectures, sensor configurations and low-power microcontroller deployment.",
      "Tested and refined hardware prototypes, making sure data flowed reliably between physical sensors and backend interfaces.",
    ],
  },
  {
    role: "Technical Marketing Intern",
    company: "Core2web Technologies Pvt. Ltd.",
    place: "Pune",
    dates: "Jan 2026 – Mar 2026",
    span: [0, 2],
    points: [
      "Supported awareness campaigns for software products by translating technical features into clear business value.",
      "Coordinated between the development and distribution teams and tracked project progress.",
    ],
  },
];

/** The resume's skill groups, unchanged. `seenIn` only cites other resume entries. */
export const toolkit = [
  {
    group: "Programming Languages",
    items: ["Python", "SQL (MySQL)", "C++"],
    seenIn: "Python Application Development certification",
  },
  {
    group: "AI & Data",
    items: ["Generative AI / LLM Integration", "Prompt Engineering", "Power BI (Data Visualization)"],
    seenIn: "Generative AI and Power BI certifications",
  },
  {
    group: "Mobile Development",
    items: ["Flutter (Dart)", "Cross-Platform App Development"],
    seenIn: "Thermowear Jacket app · Flutter certification",
  },
  {
    group: "IoT & Hardware",
    items: ["ESP32 Microcontroller", "Sensor Interfacing", "IoT Protocols"],
    seenIn: "Thermowear Jacket · IoT & Robotics internship",
  },
  {
    group: "Tools & Platforms",
    items: ["Git", "VS Code", "Linux"],
  },
  {
    group: "Concepts",
    items: ["DBMS", "Object-Oriented Programming", "Data Structures & Algorithms"],
  },
];

export const education = [
  {
    year: "2026",
    title: "Bachelor of Computer Science (BCS)",
    place: "Sinhgad College of Science, Savitribai Phule Pune University (SPPU), Pune",
  },
  {
    year: "2023",
    title: "Higher Secondary (HSC), Science",
    place: "Maharashtra State Board",
  },
  {
    year: "2021",
    title: "Secondary (SSC)",
    place: "Maharashtra State Board",
  },
];

export const certifications = [
  "Flutter Mobile Application Development",
  "Python Application Development",
  "Generative AI Foundations & AI Tool Integration",
  "Power BI for Business Intelligence (Data Wrangling & Dashboard Design)",
];

export const activities = [
  {
    title: "National Service Scheme (NSS) Volunteer",
    body: "Coordinated field-level activities for rural community welfare drives — work that built teamwork and leadership.",
  },
];
