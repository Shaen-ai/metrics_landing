"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { useTranslation } from "@/hooks/useTranslation";
import type { PricingTier, PricingFeature, TierColumnId } from "@/lib/pricing-data";
import { getBillingStartHref } from "@/lib/checkout-urls";
import { track } from "@/lib/analytics";

interface PricingCardProps {
  tier: PricingTier;
  features: PricingFeature[];
  annual: boolean;
  index: number;
}

export function PricingCard({ tier, features, annual, index }: PricingCardProps) {
  const price = annual ? tier.annualPrice : tier.monthlyPrice;
  const tierId = tier.id as TierColumnId;
  const { t, tp } = useTranslation();
  const billingHref = getBillingStartHref(tierId, annual);
  const ctaHref =
    tierId === "enterprise"
      ? tier.ctaHref
      : billingHref ?? tier.ctaHref;

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "relative flex flex-col rounded-[20px] border p-5 sm:p-6 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:p-8",
        tier.popular
          ? "border-foreground/25 bg-muted/60 dark:bg-muted/40"
          : "border-border bg-card",
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/40 bg-muted px-4 py-1 text-xs font-semibold text-foreground">
          {t("pricing.mostPopular")}
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-serif italic text-lg font-semibold text-foreground">{tier.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t(`tier.${tier.id}Desc`)}</p>
      </div>

      <div className="mb-6">
        {price !== null ? (
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">${price}</span>
            <span className="text-sm text-muted-foreground">{t("pricing.perMonth")}</span>
          </div>
        ) : (
          <div
            className="min-h-[2.75rem] text-4xl font-bold leading-none text-foreground"
            aria-label={t("tier.contactSales")}
          />
        )}
        {annual && price !== null && (
          <p className="mt-1 text-xs text-muted-foreground">
            {t("pricing.billedAnnually")} (${price * 12}{t("pricing.perYear")})
          </p>
        )}
      </div>

      <Button
        variant={tier.popular ? "primary" : "secondary"}
        href={ctaHref}
        sameTab={Boolean(billingHref)}
        className="mb-8 w-full"
        onClick={() => track("pricing_plan_selected", { plan: tierId, annual })}
      >
        {tp(tier.cta)}
      </Button>

      <ul className="flex-1 space-y-3">
        {features.map((f) => {
          const value = f[tierId];
          const isBoolean = typeof value === "boolean";
          const included = isBoolean ? value : true;

          return (
            <li key={f.label} className="flex items-start gap-3 text-sm">
              {included ? (
                <Check size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
              ) : (
                <X size={16} className="mt-0.5 shrink-0 text-muted-foreground/40" />
              )}
              <span className={cn(included ? "text-secondary-foreground/90 dark:text-foreground/90" : "text-muted-foreground/60 dark:text-muted-foreground/50")}>
                {tp(f.label)}
                {!isBoolean && included && (
                  <span className="ml-1 font-medium text-foreground">
                    — {tp(value as string)}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
