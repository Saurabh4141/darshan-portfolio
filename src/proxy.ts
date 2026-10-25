import { NextResponse, type NextRequest } from "next/server";
import { BLOCKED_UA_PATTERNS } from "@/lib/bots";

const blocked = BLOCKED_UA_PATTERNS.map((p) => p.toLowerCase());

/**
 * Refuses AI crawlers, scrapers and attack scanners (see lib/bots.ts) with a
 * 403 before any page is served. Requests with no User-Agent at all are
 * refused too. robots.txt and security.txt stay readable to everyone, so
 * well-behaved bots can learn the rules and researchers can find the contact.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/robots.txt" || pathname === "/.well-known/security.txt") return NextResponse.next();

  const ua = (request.headers.get("user-agent") ?? "").toLowerCase();
  if (!ua || blocked.some((pattern) => ua.includes(pattern))) {
    return new NextResponse("Automated access is not permitted.", {
      status: 403,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }
  return NextResponse.next();
}

export const config = {
  // Everything except Next's own static build assets.
  matcher: "/((?!_next/static|_next/image).*)",
};
