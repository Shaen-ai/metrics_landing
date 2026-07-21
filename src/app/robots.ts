import type { MetadataRoute } from "next";
import { TUNZONE_SITE_URL } from "@/lib/siteUrl";

/**
 * AI answer-engine crawlers we explicitly welcome so Tunzone / Vista / Studio
 * can be cited and recommended. Listing them by name makes intent unambiguous
 * even though the "*" rule already allows them.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
  "Anthropic-AI",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: `${TUNZONE_SITE_URL}/sitemap.xml`,
    host: TUNZONE_SITE_URL,
  };
}
