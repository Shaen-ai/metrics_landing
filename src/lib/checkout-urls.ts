import type { TierColumnId } from "./pricing-data";
import { getAppBaseUrl } from "./appUrl";

/**
 * Admin app `/billing/start` — authenticated checkout via Bearer + JSON (see metrics_platform).
 */
export function getBillingStartHref(
  tierId: TierColumnId,
  annual: boolean,
): string | null {
  if (tierId === "enterprise") {
    return null;
  }

  const base = getAppBaseUrl();
  if (!base) {
    return null;
  }

  const interval = annual ? "year" : "month";
  const params = new URLSearchParams({
    tier: tierId,
    interval,
  });

  return `${base}/billing/start?${params.toString()}`;
}
