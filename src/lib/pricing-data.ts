import { CONTACT_SUPPORT_EMAIL } from "./contact";

/* ── Vista token pricing (aligned with vista/src/lib/vistaTokens.ts) ─────── */

export const vistaTokenPricing = {
  usdPerToken: 0.1,
  amdPerToken: 40,
  anonymousGrant: 20,
  costs: {
    generate: 10,
    regenerate: 5,
    edit: 3,
  },
} as const;

/* ── B2C consumer credit packages (legacy — not used on pricing page) ── */

export interface ConsumerCreditPackage {
  id: string;
  name: string;
  credits: number;
  priceUsd: number;
  perDesignCost: string;
  popular?: boolean;
}

export const consumerPackages: ConsumerCreditPackage[] = [
  { id: "starter-pack", name: "Starter", credits: 10, priceUsd: 5, perDesignCost: "$0.50" },
  { id: "popular-pack", name: "Designer", credits: 30, priceUsd: 10, perDesignCost: "$0.33", popular: true },
  { id: "pro-pack", name: "Pro", credits: 100, priceUsd: 29, perDesignCost: "$0.29" },
];

/* ── B2B subscription tiers ───────────────────────────────────────────── */

/** Column order for the pricing table and feature matrix (matches tier ids). */
export const TIER_COLUMN_IDS = ["starter", "business", "business-pro", "enterprise"] as const;
export type TierColumnId = (typeof TIER_COLUMN_IDS)[number];

export interface PricingFeature {
  label: string;
  starter: string | boolean;
  business: string | boolean;
  "business-pro": string | boolean;
  enterprise: string | boolean;
}

export interface PricingTier {
  id: TierColumnId;
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  cta: string;
  ctaHref: string;
  popular?: boolean;
  quotas: {
    imageTo3dMonth1: number | null;
    imageTo3dOngoing: number | null;
  };
}

/** Annual display = monthly × 11/12. Keep quotas in sync with backend config/plans.php */
export const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 59,
    annualPrice: 54,
    cta: "Get Started",
    ctaHref: "#",
    quotas: { imageTo3dMonth1: 100, imageTo3dOngoing: 25 },
  },
  {
    id: "business",
    name: "Business",
    monthlyPrice: 119,
    annualPrice: 109,
    cta: "Get Started",
    ctaHref: "#",
    popular: true,
    quotas: { imageTo3dMonth1: 200, imageTo3dOngoing: 55 },
  },
  {
    id: "business-pro",
    name: "Business Pro",
    monthlyPrice: 219,
    annualPrice: 201,
    cta: "Get Started",
    ctaHref: "#",
    quotas: { imageTo3dMonth1: 400, imageTo3dOngoing: 100 },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    cta: "Contact Sales",
    ctaHref: `mailto:${CONTACT_SUPPORT_EMAIL}?subject=Enterprise%20plan%20inquiry`,
    quotas: { imageTo3dMonth1: null, imageTo3dOngoing: null },
  },
];

export const features: PricingFeature[] = [
  {
    label: "Image-to-3D (first month)",
    starter: "100",
    business: "200",
    "business-pro": "400",
    enterprise: "Custom",
  },
  {
    label: "Image-to-3D (ongoing / mo)",
    starter: "25",
    business: "55",
    "business-pro": "100",
    enterprise: "Custom",
  },
  {
    label: "AI Chat assistant",
    starter: "50 msgs/mo",
    business: "200 msgs/mo",
    "business-pro": "Unlimited",
    enterprise: "Unlimited",
  },
  {
    label: "AI Interior Design (generations / mo)",
    starter: "100",
    business: "200",
    "business-pro": "500",
    enterprise: "Custom",
  },
  {
    label: "Priority processing",
    starter: false,
    business: false,
    "business-pro": true,
    enterprise: true,
  },
  {
    label: "Custom domain / white-label",
    starter: false,
    business: true,
    "business-pro": true,
    enterprise: true,
  },
  {
    label: "Customize brand to your needs",
    starter: false,
    business: false,
    "business-pro": true,
    enterprise: true,
  },
  {
    label: "Support",
    starter: "Email (48h)",
    business: "Email (24h)",
    "business-pro": "Chat + Email",
    enterprise: "Dedicated CSM",
  },
];
