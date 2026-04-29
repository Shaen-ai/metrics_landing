/**
 * Admin app (metrics platform) origin, no trailing slash.
 * Used for Sign in and billing routes that leave the marketing site.
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

/**
 * Primary hero/nav CTAs (“Subscribe now — pay in 14 days”, “Get Started”): same-origin `/pricing`
 * so users pick a plan first. Plan checkout uses `getBillingStartHref` → admin `/billing/start` →
 * login if needed → Stripe with Bearer (`client_reference_id` = user id).
 */
export function getStartedHref(): string {
  return "/pricing";
}
