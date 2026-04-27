"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { useTranslation } from "@/hooks/useTranslation";
import type { PricingTier, PricingFeature } from "@/lib/pricing-data";

interface PricingCardProps {
  tier: PricingTier;
  features: PricingFeature[];
  annual: boolean;
  index: number;
}

export function PricingCard({ tier, features, annual, index }: PricingCardProps) {
  const price = annual ? tier.annualPrice : tier.monthlyPrice;
  const tierId = tier.id as "starter" | "growth" | "scale" | "enterprise";
  const { t, tp } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 lg:p-8",
        tier.popular
          ? "border-blue-500/50 bg-blue-50/50 shadow-lg shadow-blue-500/10 dark:bg-blue-500/5"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40",
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
          {t("pricing.mostPopular")}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{tp(tier.name)}</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t(`tier.${tier.id}Desc`)}</p>
      </div>

      <div className="mb-6">
        {price !== null ? (
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">${price}</span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500">{t("pricing.perMonth")}</span>
          </div>
        ) : (
          <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{t("pricing.custom")}</div>
        )}
        {annual && price !== null && (
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            {t("pricing.billedAnnually")} (${price * 12}{t("pricing.perYear")})
          </p>
        )}
      </div>

      <Button
        variant={tier.popular ? "primary" : "secondary"}
        href={tier.ctaHref}
        className="mb-8 w-full"
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
                <Check size={16} className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400" />
              ) : (
                <X size={16} className="mt-0.5 shrink-0 text-zinc-300 dark:text-zinc-600" />
              )}
              <span className={cn(included ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-300 dark:text-zinc-600")}>
                {tp(f.label)}
                {!isBoolean && included && (
                  <span className="ml-1 font-medium text-zinc-900 dark:text-zinc-100">
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
