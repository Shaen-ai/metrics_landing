import type { TierColumnId } from "./pricing-data";

function env(key: string): string {
  return process.env[key]?.trim() ?? "";
}

/**
 * Laravel billing redirect — GET creates Stripe Checkout and 302s to Stripe.
 * Set NEXT_PUBLIC_BILLING_CHECKOUT_BASE_URL (see landing/.env.example).
 */
export function getTierCheckoutHref(
  tierId: TierColumnId,
  annual: boolean,
): string | null {
  if (tierId === "enterprise") {
    return null;
  }

  let base = env("NEXT_PUBLIC_BILLING_CHECKOUT_BASE_URL").replace(/\/+$/, "");
  if (!base && process.env.NODE_ENV === "development") {
    base = "http://localhost:8000/api/billing/checkout";
  }
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
