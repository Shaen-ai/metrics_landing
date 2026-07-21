/**
 * Marketing site (tunzone.com) canonical origin, no trailing slash.
 * Override with NEXT_PUBLIC_TUNZONE_URL for staging / preview hosts.
 */
export const TUNZONE_SITE_URL =
  process.env.NEXT_PUBLIC_TUNZONE_URL?.trim().replace(/\/+$/, "") ||
  "https://tunzone.com";
