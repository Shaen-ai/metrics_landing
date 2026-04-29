function env(key: string): string {
  return process.env[key]?.trim() ?? "";
}

const DEFAULT_PRODUCTION_API_BASE = "https://api.tunzone.com/api";

/**
 * Public Laravel API base (no trailing slash). Used for unauthenticated endpoints
 * like the landing contact form.
 */
export function getPublicApiBaseUrl(): string {
  const apiBase = env("NEXT_PUBLIC_API_URL").replace(/\/+$/, "");
  if (apiBase) {
    return apiBase;
  }
  const billingCheckout = env("NEXT_PUBLIC_BILLING_CHECKOUT_BASE_URL").replace(/\/+$/, "");
  if (billingCheckout.endsWith("/billing/checkout")) {
    return billingCheckout.slice(0, -"/billing/checkout".length);
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8000/api";
  }
  return DEFAULT_PRODUCTION_API_BASE;
}

export function getContactSubmitUrl(): string {
  return `${getPublicApiBaseUrl()}/contact`;
}
