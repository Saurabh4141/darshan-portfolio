# Security

What protects Darshan Gaikwad's portfolio, where each piece lives, and what it
does not cover. Verified against a local production build (`npm run build &&
npm start`) on 2026-10-25; the site is not deployed yet.

## 1. Bot and scraper blocking — `src/proxy.ts`, `src/lib/bots.ts`

Every request (except Next's static build files) is checked by its User-Agent
before a page is served. Matches get **403 "Automated access is not
permitted."**, and so does a request with no User-Agent at all.

| Allowed | Blocked |
|---|---|
| Normal browsers | AI crawlers: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, CCBot, Bytespider and others |
| Search engines: Googlebot, Bingbot and others | SEO scrapers: AhrefsBot, SemrushBot and others |
| Link previews: LinkedIn, WhatsApp, Facebook, X and others | Scraping tools: curl, wget, python-requests, Scrapy, HeadlessChrome and others |
| | Attack scanners: sqlmap, Nikto and others |

The resume PDF is covered too. `/robots.txt` and `/.well-known/security.txt`
are always readable, so well-behaved bots can read the rules and researchers
can find the contact.

`src/lib/bots.ts` is the same list as the gaikwadsaurabh.com site; keep the
two in step when adding bots.

## 2. robots.txt — `src/app/robots.ts`

- Search engines and link-preview bots: allowed.
- AI crawlers: disallowed by name.
- Everyone else: disallowed by default.
- Points to `sitemap.xml`.

## 3. "No AI training" signals — `next.config.ts`

- `tdm-reservation: 1` reserves text-and-data-mining rights (W3C TDMRep / EU law).
- `X-Robots-Tag: noai, noimageai` is the opt-out convention some AI crawlers honour.

Search indexing is not affected.

## 4. Security headers — `next.config.ts` (on every response)

| Header | Protects against |
|---|---|
| `Content-Security-Policy` (production) | Injected scripts (XSS). Only the site's own scripts, styles, fonts and images can load; no plugins, no frames; forms post only to this site. |
| `Strict-Transport-Security` (2 years, preload) | Downgrade to insecure HTTP (takes effect once served over HTTPS) |
| `X-Frame-Options: DENY` + CSP `frame-ancestors 'none'` | Clickjacking (embedding the site in a frame) |
| `X-Content-Type-Options: nosniff` | Browsers guessing file types (MIME sniffing) |
| `Referrer-Policy: strict-origin-when-cross-origin` | Leaking full URLs to other sites |
| `Permissions-Policy` | Camera, microphone, location, payment and USB access; ad tracking (FLoC/Topics) |
| `Cross-Origin-Opener-Policy: same-origin` | Other sites' pop-ups or openers reaching into this page |
| `X-Permitted-Cross-Domain-Policies: none` | Old Flash/PDF cross-domain access |
| `poweredByHeader: false` | Revealing the framework (no `X-Powered-By`) |

## 5. Small attack surface by design

- No database, no login, no forms, no API routes. That leaves nothing for SQL
  injection or account attacks to reach. (The heating-mode radios are a
  client-side colour control; nothing is submitted.)
- No third-party scripts, analytics, trackers or external fonts. Everything is
  self-hosted, which is why the CSP can stay strict.
- All pages are pre-rendered static HTML.
- No secrets in the code. The only environment variable is the public
  `NEXT_PUBLIC_SITE_URL`; `.env*` files are git-ignored.
- Dependencies: only next, react and react-dom. `npm audit`: 0 vulnerabilities
  (2026-10-25).
- `/.env`, `/.git/config`, `/wp-login.php`, `/api/*` and path tricks like
  `/..%2f..%2fetc%2fpasswd` all return 404 (local production build).

## 6. Contact for security reports — `public/.well-known/security.txt`

This is a standard file telling researchers how to report a problem. It
**expires on 2027-10-24**; update the `Expires` date before then. Once the
domain is known, add a `Canonical:` line pointing at
`https://<domain>/.well-known/security.txt`.

## 7. Server — to do at deployment (outside this repo)

Not set up yet. When the site goes live:

- Build with `NEXT_PUBLIC_SITE_URL=https://<domain>` so robots.txt, the
  sitemap and canonical links use the real address.
- HTTPS with a Let's Encrypt certificate (Certbot, auto-renewing).
- Redirect `http://` and the bare/`www` variant with a 301 to the one
  canonical `https://` address.
- Hide the web server's version number (nginx: `server_tokens off;`).

## What this does not cover

- **Disguised bots.** Blocking is by User-Agent, which any script can fake, for
  example by claiming to be Chrome or Googlebot. It stops honest AI crawlers,
  default tools and lazy scrapers, not a determined person. For that, put
  Cloudflare (free plan) in front, with Bot Fight Mode and AI-bot blocking on
  and SSL set to **Full (strict)**.
- **Rate limiting.** Not enabled. An nginx `limit_req` rule would cap requests
  per IP.
- **Viewing source.** Anyone visiting in a browser can use Inspect / View
  Source. No website can prevent that, and nothing private is in the page.
- **The resume PDF is public by design.** Browsers can download it, and it
  contains Darshan's phone number and email.

## Checking it

A plain `curl` is blocked, so pretend to be a browser. Replace the URL with
the live address once deployed:

```bash
URL=http://localhost:3000
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 Chrome/130" $URL/   # 200
curl -s -o /dev/null -w "%{http_code}\n" -A "GPTBot/1.2" $URL/              # 403
curl -s -o /dev/null -w "%{http_code}\n" $URL/                              # 403 (curl's own UA)
curl -sI -A "Mozilla/5.0 Chrome/130" $URL/                                # headers
curl -s -A "Mozilla/5.0 Chrome/130" $URL/robots.txt                       # rules
```
