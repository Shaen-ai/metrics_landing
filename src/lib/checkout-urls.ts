import type { TierColumnId } from "./pricing-data";

function env(key: string): string {
  return process.env[key]?.trim() ?? "";
}

/**
 * Stripe Payment Links (or any HTTPS checkout URL) per tier and billing interval.
 * Set matching NEXT_PUBLIC_* vars in .env — see landing/.env.example.
 */
export function getTierCheckoutHref(tierId: TierColumnId, annual: boolean): string | null {
  if (tierId === "enterprise") return null;

  const suffix = annual ? "ANNUAL" : "MONTHLY";
  const keyByTier: Record<Exclude<TierColumnId, "enterprise">, string> = {
    starter: `NEXT_PUBLIC_CHECKOUT_STARTER_${suffix}`,
    business: `NEXT_PUBLIC_CHECKOUT_BUSINESS_${suffix}`,
    "business-pro": `NEXT_PUBLIC_CHECKOUT_BUSINESS_PRO_${suffix}`,
  };

  const url = env(keyByTier[tierId]);
  return url || null;
}
