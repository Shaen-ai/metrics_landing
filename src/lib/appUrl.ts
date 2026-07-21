/**
 * Admin app (metrics platform) origin, no trailing slash.
 * Used for Sign in and billing routes that leave the marketing site.
 *
 * NEXT_PUBLIC_APP_URL overrides everything (set for local dev, staging, or alternate hosts).
 * Production builds without env default to the live admin host so deploys don’t need extra config.
 */
const DEFAULT_PRODUCTION_APP_BASE = "https://admin.tunzone.com";

const DEFAULT_PRODUCTION_VISTA_BASE = "https://vista.tunzone.com";
const DEFAULT_DEV_VISTA_BASE = "http://localhost:3003";

const DEFAULT_PRODUCTION_STUDIO_BASE = "https://editor.tunzone.com";
const DEFAULT_DEV_STUDIO_BASE = "http://localhost:3000";

/**
 * Vista B2C consumer AI interior app origin — no trailing slash.
 * Override with NEXT_PUBLIC_VISTA_URL for staging / custom domains.
 */
export function getVistaBaseUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_VISTA_URL ?? "").trim().replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return DEFAULT_PRODUCTION_VISTA_BASE;
  return DEFAULT_DEV_VISTA_BASE;
}

/** Open Vista design canvas (homepage is the tool). */
export function getVistaConsumerDesignHref(): string {
  return `${getVistaBaseUrl()}/`;
}

/**
 * Studio B2B admin app origin — no trailing slash.
 * Override with NEXT_PUBLIC_STUDIO_URL for staging / custom domains.
 */
export function getStudioBaseUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_STUDIO_URL ?? "").trim().replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return DEFAULT_PRODUCTION_STUDIO_BASE;
  return DEFAULT_DEV_STUDIO_BASE;
}

/** Open Studio product (admin root redirects to login when unauthenticated). */
export function getStudioHref(): string {
  return `${getStudioBaseUrl()}/`;
}

export function getAppBaseUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_APP_URL ?? "").trim().replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return DEFAULT_PRODUCTION_APP_BASE;
  return "";
}

/**
 * “Get Started” in nav and bottom CTA → Vista B2C app.
 * B2B subscription flow stays on `/pricing` (hero primary button).
 */
export function getStartedHref(): string {
  return getVistaConsumerDesignHref();
}
