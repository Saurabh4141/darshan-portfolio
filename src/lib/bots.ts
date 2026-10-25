/**
 * Who may crawl the site. Shared by app/robots.ts (the polite request) and
 * src/proxy.ts (the enforcement), so the two never drift apart.
 */

/** Search engines: allowed to crawl and index. */
export const SEARCH_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Google-InspectionTool",
  "Bingbot",
  "msnbot",
  "Slurp",
  "DuckDuckBot",
  "Applebot",
  "YandexBot",
  "Baiduspider",
  "Yeti",
  "SeznamBot",
  "Qwantbot",
];

/** Link-preview fetchers: allowed, or shared links lose their preview card. */
export const PREVIEW_BOTS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "Slackbot-LinkExpanding",
  "WhatsApp",
  "TelegramBot",
  "Discordbot",
  "SkypeUriPreview",
];

/**
 * AI crawlers and AI-training opt-out tokens. Some (Google-Extended,
 * Applebot-Extended) are robots.txt tokens only — they let Google and Apple
 * keep indexing for search while opting out of AI training.
 */
export const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "PerplexityBot",
  "Perplexity-User",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "YouBot",
  "DuckAssistBot",
  "MistralAI-User",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "Omgilibot",
  "Omgili",
  "ImagesiftBot",
  "Timpibot",
  "Webzio-Extended",
  "PanguBot",
  "Kangaroo Bot",
  "iaskspider",
  "img2dataset",
  "Brightbot",
  "VelenPublicWebCrawler",
  "ICC-Crawler",
  "Sidetrade indexer bot",
  "Novellum",
];

/**
 * Refused outright by the server (403), matched case-insensitively against
 * the User-Agent: AI crawlers, SEO/data scrapers, scraping libraries and
 * attack scanners. Real browsers and the search/preview bots above pass.
 * A scraper can still fake a browser User-Agent — no site can prevent that —
 * but this stops every tool that identifies itself.
 */
export const BLOCKED_UA_PATTERNS = [
  ...AI_BOTS.filter((b) => !b.endsWith("-Extended")),
  // SEO and data scrapers.
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "BLEXBot",
  "MegaIndex",
  "serpstatbot",
  "PetalBot",
  "magpie-crawler",
  "Barkrowler",
  // Scraping libraries and headless browsers.
  "python-requests",
  "python-urllib",
  "python-httpx",
  "aiohttp",
  "Scrapy",
  "Go-http-client",
  "colly",
  "curl/",
  "Wget",
  "libwww-perl",
  "Java/",
  "okhttp",
  "axios",
  "node-fetch",
  "undici",
  "HeadlessChrome",
  "PhantomJS",
  "HTTrack",
  // Vulnerability and attack scanners.
  "sqlmap",
  "Nikto",
  "Nmap",
  "nuclei",
  "WPScan",
  "zgrab",
  "masscan",
  "gobuster",
  "dirbuster",
  "feroxbuster",
  "Fuzz Faster U Fool",
];
