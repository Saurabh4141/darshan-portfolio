# Darshan Gaikwad — Portfolio

Personal site for Darshan Gaikwad, Computer Science graduate (BCS, 2026) and
entry-level software developer (Python · AI · Flutter), Pune.

**Live address:** https://darshangaikwad.cloud (not deployed yet)

A single-page Next.js site, statically prerendered, with no runtime
dependencies beyond Next.js and React.

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
  (`src/app/icon.svg`, hand-copied), the Apple touch icon and the Open Graph
  card.
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
| 05 Contact | Email (with copy button), LinkedIn and the resume |

Type: Bricolage Grotesque + IBM Plex Mono, self-hosted at build time via
`next/font`. Light and dark themes follow the system setting.

## Project structure

```
src/
  app/          layout, page, 404, icon.svg, apple-icon, opengraph-image,
                robots, sitemap, globals.css (tokens + heat system)
  components/   one component + CSS module per section; Backdrop,
                FloatingLinks, Logo, icons; MobileMenu and CopyEmail are
                the only client components
  content/      profile.ts — every word and fact on the site
  lib/          seo.ts (metadata, JSON-LD), mark.ts (logo geometry),
                bots.ts (crawler allow/block lists)
  proxy.ts      bot and scraper blocking (403)
public/
  Darshan_Gaikwad_Resume.pdf   the published resume
  .well-known/security.txt     security contact
next.config.ts  security headers, CSP, no-AI-training headers
SECURITY.md     every security measure, its limits, and how to check it
```

## Content and the resume

All copy lives in [`src/content/profile.ts`](src/content/profile.ts) and comes
from Darshan's resume. Nothing is invented; when editing, keep it that way.

- The **published resume** is `public/Darshan_Gaikwad_Resume.pdf`, served at
  `/Darshan_Gaikwad_Resume.pdf` and linked from the resume pill and Contact
  (`profile.resume`). To publish a new CV, replace this file (same name), or
  add a new one and update `profile.resume`.
- The **original** resume file is kept outside this repository. Any `*.pdf`
  dropped in the project root is git-ignored (`/*.pdf`), so a working copy
  there is never committed by accident.
- The page text leaves out the phone number and the HSC/SSC percentages, but
  the published PDF includes them.

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
| `npm start` | Serve the production build (port 3000; `npm start -- -p 3002` for another) |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |

Plain `curl` gets a 403 from the bot blocking (see [SECURITY.md](SECURITY.md));
pass a browser User-Agent when testing: `curl -A "Mozilla/5.0 Chrome/130" …`.

## Deploying

The site needs a Node.js server (`next start`): the bot blocking
(`src/proxy.ts`) and the security headers run there. A purely static host
(GitHub Pages, a plain bucket) would serve the pages but silently drop both.

### The address

The canonical address is **`https://darshangaikwad.cloud`** (no `www`). It is
set in `src/content/profile.ts` and baked in at build time, feeding canonical
links, the sitemap, robots.txt, structured data and the link-preview image —
so a plain `npm run build` is already correct for production.
`NEXT_PUBLIC_SITE_URL` overrides it for a build meant for somewhere else (a
staging copy, say; see `.env.example`).

### 1. DNS

At the domain registrar, point both names at the server's IP address:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` (darshangaikwad.cloud) | server IPv4 |
| A | `www` | server IPv4 |

(Plus matching `AAAA` records if the server has IPv6.)

### 2. Build and run

```bash
git clone https://github.com/Saurabh4141/darshan-portfolio.git
cd darshan-portfolio
npm ci
npm run build
npm start -- -p 3002        # pick a port that's free on the server
```

To keep it running across reboots, use a process manager such as PM2:

```bash
pm2 start npm --name darshan-portfolio -- start -- -p 3002
pm2 save
```

To ship an update later: `git pull && npm ci && npm run build && pm2 restart darshan-portfolio`.

### 3. nginx in front, with HTTPS

Get a certificate covering both names (`sudo certbot --nginx -d
darshangaikwad.cloud -d www.darshangaikwad.cloud`), then end up with three
server blocks — everything redirects to the one canonical address, which
proxies to the app:

```nginx
# http (both names) → https://darshangaikwad.cloud
server {
    listen 80;
    listen [::]:80;
    server_name darshangaikwad.cloud www.darshangaikwad.cloud;
    return 301 https://darshangaikwad.cloud$request_uri;
}

# https://www → https://darshangaikwad.cloud
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name www.darshangaikwad.cloud;
    ssl_certificate     /etc/letsencrypt/live/darshangaikwad.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/darshangaikwad.cloud/privkey.pem;
    return 301 https://darshangaikwad.cloud$request_uri;
}

# The site
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name darshangaikwad.cloud;
    ssl_certificate     /etc/letsencrypt/live/darshangaikwad.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/darshangaikwad.cloud/privkey.pem;
    server_tokens off;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

(`http2 on;` needs nginx 1.25.1+; on older versions write
`listen 443 ssl http2;` instead.) Test with `sudo nginx -t`, then
`sudo systemctl reload nginx`.

### Go-live checklist

- [ ] DNS: `darshangaikwad.cloud` and `www` resolve to the server
- [ ] App built and running under PM2; survives a reboot (`pm2 startup`)
- [ ] https://darshangaikwad.cloud loads with a valid certificate
- [ ] `http://…` and `https://www.…` both 301 to `https://darshangaikwad.cloud/`
- [ ] Browser User-Agent gets 200, `GPTBot` gets 403, headers present — commands in [SECURITY.md](SECURITY.md#checking-it)
- [ ] `/robots.txt`, `/sitemap.xml` and `/.well-known/security.txt` load
- [ ] The resume pill opens the PDF
- [ ] Paste the URL into LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) to check the preview card
- [ ] Optionally add the site to Google Search Console and submit `https://darshangaikwad.cloud/sitemap.xml`

## Performance and accessibility

- Statically prerendered. Two small client components (`MobileMenu`,
  `CopyEmail`); everything else — backdrop, profile rail, resume pill —
  ships no JavaScript.
- Animations are CSS-only on `transform`/`opacity`; section reveals use view
  timelines, so content is visible without them and nothing waits on script.
  No loader, and the hero name and intro (the LCP candidates) are never
  animated in. The few load-in effects run a fixed number of times.
- `prefers-reduced-motion: reduce` turns off all motion, including smooth scroll.
- CSS is inlined (`experimental.inlineCss`); fonts are self-hosted; no
  third-party requests.
- Skip link, landmarks, visible focus rings, native radios/popover, AA text
  contrast in both themes.

Measured on a local production build (Lighthouse 13.5, Chrome 150, Oct 2026):
desktop 100 in every category; mobile (simulated slow 4G, 4× CPU)
performance 93–97 over five runs, accessibility, best practices and SEO 100,
CLS 0. Real-world numbers depend on the server and network.

## Security

Bot and scraper blocking, robots.txt rules, "no AI training" headers,
security headers, security.txt, and what none of it covers — all in
[SECURITY.md](SECURITY.md).

## Upkeep

- **security.txt expires on 2027-10-24.** Update the `Expires` date in
  `public/.well-known/security.txt` before then.
- **New crawlers** appear over time; add them to `src/lib/bots.ts` (shared with
  the gaikwadsaurabh.com site — keep the two in step).
- **Content**: edit `src/content/profile.ts`, rebuild, redeploy.
