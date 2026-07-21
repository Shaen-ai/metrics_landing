import type { Metadata } from "next";
import { TUNZONE_SITE_URL } from "@/lib/siteUrl";

const CANONICAL = `${TUNZONE_SITE_URL}/pricing`;
const title = "Tunzone Pricing — Vista Tokens & Studio Plans";
const description =
  "Vista is pay-as-you-go with token packs from $5 and no subscription. Studio subscriptions for furniture brands start at $59/month. Compare plans and features.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: { type: "website", url: CANONICAL, siteName: "Tunzone", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
