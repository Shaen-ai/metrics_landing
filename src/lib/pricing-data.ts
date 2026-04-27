export interface PricingFeature {
  label: string;
  starter: string | boolean;
  growth: string | boolean;
  scale: string | boolean;
  enterprise: string | boolean;
}

export interface PricingTier {
  id: string;
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

/** Annual display = monthly × 11/12 (1 month free when billed yearly). Keep in sync with backend config/plans.php */
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
    id: "growth",
    name: "Growth",
    monthlyPrice: 119,
    annualPrice: 109,
    description: "For growing brands that need more models and team collaboration.",
    cta: "Get Started",
    ctaHref: "#",
    popular: true,
    quotas: { imageTo3dMonth1: 200, imageTo3dOngoing: 55 },
  },
  {
    id: "scale",
    name: "Scale",
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
    ctaHref: "/about",
    quotas: { imageTo3dMonth1: null, imageTo3dOngoing: null },
  },
];

export const features: PricingFeature[] = [
  {
    label: "Image-to-3D (first month)",
    starter: "100",
    growth: "200",
    scale: "400",
    enterprise: "Custom",
  },
  {
    label: "Image-to-3D (ongoing / mo)",
    starter: "25",
    growth: "55",
    scale: "100",
    enterprise: "Custom",
  },
  {
    label: "Published storefronts",
    starter: "1",
    growth: "1",
    scale: "1",
    enterprise: "Unlimited",
  },
  {
    label: "Team seats",
    starter: "1",
    growth: "2",
    scale: "5",
    enterprise: "Unlimited",
  },
  {
    label: "AI Chat assistant",
    starter: "50 msgs/mo",
    growth: "200 msgs/mo",
    scale: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    label: "Room Photo Assist",
    starter: false,
    growth: true,
    scale: true,
    enterprise: true,
  },
  {
    label: "Priority processing",
    starter: false,
    growth: false,
    scale: true,
    enterprise: true,
  },
  {
    label: "Custom domain / white-label",
    starter: false,
    growth: true,
    scale: true,
    enterprise: true,
  },
  {
    label: "Support",
    starter: "Email (48h)",
    growth: "Email (24h)",
    scale: "Chat + Email",
    enterprise: "Dedicated CSM",
  },
  {
    label: "API access",
    starter: false,
    growth: false,
    scale: true,
    enterprise: true,
  },
];
