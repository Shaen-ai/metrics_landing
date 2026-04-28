/**
 * Admin app (metrics platform) origin, no trailing slash.
 * Used for Sign in and Get started → /login.
 *
 * NEXT_PUBLIC_APP_URL overrides everything (set for local dev, staging, or alternate hosts).
 * Production builds without env default to the live admin host so deploys don’t need extra config.
 */
const DEFAULT_PRODUCTION_APP_BASE = "https://admin.tunzone.com";

export function getAppBaseUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_APP_URL ?? "").trim().replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return DEFAULT_PRODUCTION_APP_BASE;
  return "";
}

/** Metrics app login URL, or empty string in local dev when NEXT_PUBLIC_APP_URL is unset. */
export function getAppLoginHref(): string {
  const base = getAppBaseUrl();
  return base ? `${base}/login` : "";
}

/** Primary CTA: admin /login in production, else env login, else /pricing when no base (local). */
export function getStartedHref(): string {
  return getAppLoginHref() || "/pricing";
}
