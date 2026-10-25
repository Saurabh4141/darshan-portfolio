# Darshan Gaikwad — Portfolio

Personal site for Darshan Gaikwad, Computer Science graduate (BCS, 2026) and
entry-level software developer (Python · AI · Mobile), Pune.

## Design idea: sensor to screen, at a temperature

Darshan's strongest piece of work is the Thermowear Jacket: a DS18B20 sensor
and an ESP32 feeding a Flutter app, with Auto / Low / Medium / High heating.
The site is built on that:

- **Heat as the accent colour.** There is no fixed brand colour. `--heat`
  (0–1) mixes teal → amber → ember. In **Auto** the page warms as you scroll,
  like the jacket adjusting itself; the jacket's own control panel in the
  Build section pins it to Low, Medium or High. It's all CSS: a registered
  `@property`, `color-mix()`, a scroll timeline and `:has()` on the radios.
- **Instrument channels.** Sections open as `CH-01 … CH-05` with a tick scale.
- **Signal path** in the hero: Sense → Process → Present, the three stages his
  skills cover.
- **Mark: the "Thermo-D".** A letter D whose stem is a thermometer — a tube
  ending in a sensor bulb, with the D's bowl running round into the bulb.
  His initial and his Thermowear project in one shape. In the header the
  mercury is live: its level follows the page heat, and it shoots up on
  hover. Geometry in `src/lib/mark.ts`; used by `<Logo>`, the favicon
  (`src/app/icon.svg`, hand-copied) and the Open Graph card.
- **Backdrop: a circuit board** (`Backdrop.tsx`). A fixed layer behind the
  page: a perfboard dot grid toward the edges, PCB traces and pads running in
  from both sides with an occasional signal pulse, an ESP32-style module in
  the top-right corner that steps back after the hero, and a corner glow that
  follows the page heat. Server-rendered from a seeded generator — the same
  board on every request, no JavaScript.

Fixed on screen: a profile rail (LinkedIn, email) on the left edge of wide
screens, which steps aside while Contact is in view, and a **Resume · PDF**
pill at the bottom right.

| Section | What it shows |
| --- | --- |
| Hero | Name, intro, signal path, page-heat thermometer, four resume-derived facts |
| 01 Build | Thermowear Jacket case study + the heating-mode control panel |
| 02 Experience | Both 2026 internships on a shared Jan–Mar timeline (they overlap) |
| 03 Toolkit | The resume's skill groups as a spec sheet, each with what backs it |
| 04 Education | BCS, HSC, SSC; certifications; NSS volunteering |
| 05 Contact | Email (with copy button) and LinkedIn |

Type: Bricolage Grotesque + IBM Plex Mono, self-hosted at build time via
`next/font`. Light and dark themes follow the system setting.

## Content and accuracy

All copy lives in [`src/content/profile.ts`](src/content/profile.ts) and comes
from the resume.

The resume exists twice:

- `Darshan Gaiwkad.pdf` (project root) — the original. Never served, and
  git-ignored (`/*.pdf`).
- `public/Darshan_Gaikwad_Resume.pdf` — an identical copy, served at
  `/Darshan_Gaikwad_Resume.pdf` and linked from the resume pill and Contact
  (`profile.resume`). To publish a new CV, replace this file (or add a new one
  and update `profile.resume`).

The page text leaves out the phone number and the HSC/SSC percentages; note
the linked PDF does include them.

## Performance and accessibility

- Statically prerendered; no runtime dependencies beyond Next.js and React.
- Two small client components: `MobileMenu` (closes the native popover after a
  link is chosen) and `CopyEmail`. Everything else — including the backdrop,
  profile rail and resume pill — ships no JavaScript.
- Animations are CSS-only on `transform`/`opacity`; section reveals use view
  timelines, so content is visible without them and nothing waits on script.
  No loader, and the hero name and intro (the LCP candidates) are never
  animated in. The few load-in effects run a fixed number of times.
- `prefers-reduced-motion: reduce` turns off all motion, including smooth scroll.
- CSS is inlined (`experimental.inlineCss`); no third-party requests; CSP and
  security headers in `next.config.ts`.
- Skip link, landmarks, visible focus rings, native radios/popover, AA text
  contrast in both themes.

## Getting started

Requires Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |

Before deploying, set the real domain so canonical URLs, the sitemap and
Open Graph tags are correct:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
```
