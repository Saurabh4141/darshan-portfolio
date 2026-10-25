import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";
import { AI_BOTS, PREVIEW_BOTS, SEARCH_BOTS } from "@/lib/bots";

/**
 * Search engines and link-preview bots may crawl; AI crawlers are refused by
 * name; everyone else is refused by default. robots.txt is a request that
 * honest bots follow — src/proxy.ts enforces it for those that don't.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: [...SEARCH_BOTS, ...PREVIEW_BOTS], allow: "/" },
      { userAgent: AI_BOTS, disallow: "/" },
      { userAgent: "*", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
