import { CONTACT_SUPPORT_EMAIL } from "./contact";

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
  description: string;
  cta: string;
  ctaHref: string;
  popular?: boolean;
  quotas: {
    imageTo3dMonth1: number | null;
    imageTo3dOngoing: number | null;
  };
}

/** Annual display = monthly × 11/12 (1 month free when billed yearly). Keep quotas in sync with backend config/plans.php */
export const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 59,
    annualPrice: 54,
    description: "For individual sellers launching their first 3D catalog.",
    cta: "Get Started",
    ctaHref: "#",
    quotas: { imageTo3dMonth1: 100, imageTo3dOngoing: 25 },
  },
  {
    id: "business",
    name: "Business",
    monthlyPrice: 119,
    annualPrice: 109,
    description: "For growing brands that need more models and team collaboration.",
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
    description: "For established businesses with large catalogs and advanced needs.",
    cta: "Get Started",
    ctaHref: "#",
    quotas: { imageTo3dMonth1: 400, imageTo3dOngoing: 100 },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: "Custom volume, integrations, SLA, and dedicated support for large organizations.",
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
    label: "Room Photo Assist",
    starter: false,
    business: true,
    "business-pro": true,
    enterprise: true,
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
