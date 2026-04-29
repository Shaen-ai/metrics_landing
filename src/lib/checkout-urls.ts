import type { TierColumnId } from "./pricing-data";

function env(key: string): string {
  return process.env[key]?.trim() ?? "";
}

/**
 * Laravel billing redirect — GET creates Stripe Checkout and 302s to Stripe.
 *
 * Resolution order:
 * - NEXT_PUBLIC_BILLING_CHECKOUT_BASE_URL (full URL to GET .../api/billing/checkout)
 * - NEXT_PUBLIC_API_URL + `/billing/checkout`
 * - Development: localhost:8000
 * - Production build without env (e.g. CI omitting NEXT_PUBLIC_*): Tunzone canonical API —
 *   override via env for staging / white-label forks.
 */
const DEFAULT_PRODUCTION_CHECKOUT_BASE = "https://api.tunzone.com/api/billing/checkout";

function billingCheckoutBase(): string {
  const explicit = env("NEXT_PUBLIC_BILLING_CHECKOUT_BASE_URL").replace(/\/+$/, "");
  if (explicit) {
    return explicit;
  }
  const apiBase = env("NEXT_PUBLIC_API_URL").replace(/\/+$/, "");
  if (apiBase) {
    return `${apiBase}/billing/checkout`;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8000/api/billing/checkout";
  }

  return DEFAULT_PRODUCTION_CHECKOUT_BASE;
}

/**
 * Build GET URL for Laravel billing redirect (Stripe Checkout). See {@link billingCheckoutBase}.
 */
export function getTierCheckoutHref(
  tierId: TierColumnId,
  annual: boolean,
): string | null {
  if (tierId === "enterprise") {
    return null;
  }

  const base = billingCheckoutBase();
  if (!base) {
    return null;
  }

  const interval = annual ? "year" : "month";
  const params = new URLSearchParams({
    tier: tierId,
    interval,
  });

  return `${base}?${params.toString()}`;
}
