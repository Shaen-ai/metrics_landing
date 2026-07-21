import type { MetadataRoute } from "next";
import { TUNZONE_SITE_URL } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    { url: TUNZONE_SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${TUNZONE_SITE_URL}/vista`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${TUNZONE_SITE_URL}/studio`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${TUNZONE_SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${TUNZONE_SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${TUNZONE_SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
