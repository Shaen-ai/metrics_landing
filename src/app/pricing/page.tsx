"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { PricingCard } from "@/components/PricingCard";
import { PricingToggle } from "@/components/PricingToggle";
import { tiers, features, TIER_COLUMN_IDS } from "@/lib/pricing-data";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useTranslation } from "@/hooks/useTranslation";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const { t, tp } = useTranslation();

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t("pricing.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {t("pricing.subtitle")}
        </p>
        <div className="mt-8">
          <PricingToggle annual={annual} onChange={setAnnual} />
        </div>
      </SectionWrapper>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              features={features}
              annual={annual}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Comparison table (desktop) */}
      <SectionWrapper className="border-t border-border/50 dark:border-border/40">
        <h2 className="mb-12 text-center text-2xl font-bold text-foreground sm:text-3xl">
          {t("pricing.comparePlans")}
        </h2>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 pr-6 font-medium text-muted-foreground">{t("pricing.feature")}</th>
                {tiers.map((tier) => (
                  <th
                    key={tier.id}
                    className={cn(
                      "pb-4 text-center font-semibold",
                      tier.popular ? "text-primary" : "text-foreground",
                    )}
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, fi) => (
                <motion.tr
                  key={f.label}
                  initial={false}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: fi * 0.03 }}
                  className="border-b border-border/60 dark:border-border/50"
                >
                  <td className="py-4 pr-6 text-secondary-foreground/90 dark:text-foreground/85">{tp(f.label)}</td>
                  {TIER_COLUMN_IDS.map((tid) => {
                      const val = f[tid];
                      return (
                        <td key={tid} className="py-4 text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check
                                size={16}
                                className="mx-auto text-primary"
                              />
                            ) : (
                              <X size={16} className="mx-auto text-zinc-300 dark:text-zinc-700" />
                            )
                          ) : (
                            <span className="text-foreground/90">{tp(val)}</span>
                          )}
                        </td>
                      );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground lg:hidden">
          {t("pricing.scrollHint")}
        </p>
      </SectionWrapper>
    </>
  );
}
